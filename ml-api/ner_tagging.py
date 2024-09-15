import transformers
import torch
import pathlib
import re
from collections import Counter
import warnings
warnings.filterwarnings("ignore") 

device = 'cuda' if torch.cuda.is_available() else 'cpu'

model_name = "distilbert-base-uncased"
model_url = 'https://drive.usercontent.google.com/download?id=1GrFJUBnQY2Rqcqz6bgNvMT-oSCE-brdD&export=download&authuser=0&confirm=t&uuid=e45ba311-3eb6-4328-b794-f35d6ae8b1bd&at=AO7h07eRgotOvYM1JSGZYt6a6XsI%3A1726403818073'

tokenizer = transformers.AutoTokenizer.from_pretrained(model_name)

class DistilbertNER(torch.nn.Module):
    def __init__(self, tokens_dim):
        super(DistilbertNER,self).__init__()
        
        if type(tokens_dim) != int:
                raise TypeError('Please tokens_dim should be an integer')
        if tokens_dim <= 0:
            raise ValueError('Classification layer dimension should be at least 1')

        self.pretrained = transformers.DistilBertForTokenClassification.from_pretrained("distilbert-base-uncased", num_labels = tokens_dim) #set the output of each token classifier = unique_lables

    def forward(self, input_ids, attention_mask, labels = None): #labels are needed in order to compute the loss
        #inference time no labels
        if labels == None:
            out = self.pretrained(input_ids = input_ids, attention_mask = attention_mask )
            return out

        out = self.pretrained(input_ids = input_ids, attention_mask = attention_mask , labels = labels)
        return out
  
# Load the model data
model_data = torch.hub.load_state_dict_from_url(model_url, map_location=torch.device(device))

# Extract the model's state dictionary and metadata
model_state_dict = model_data["model_state_dict"]
metadata = model_data["metadata"]
idx2tag = metadata["idx2tag"]
tag2idx = metadata["tag2idx"]

# Load the model class
model = DistilbertNER(len(metadata["unique_tags"])) 

# Load the model's state dictionary
model.load_state_dict(model_state_dict)

class Predictor:
    def __init__(self, model, tokenizer):
        self.model = model
        self.tokenizer = tokenizer
        self.state_list = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
    'Jharkhand', 'Karnataka', 'Kerala', 'Maharashtra', 'Madhya Pradesh', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
    'Sikkim', 'Tamil Nadu', 'Tripura', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman & Nicobar', 'Chandigarh', 'Dadra & Nagar Haveli and Daman & Diu',
    'Jammu & Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry']

    def extract_pin_and_state(self, text: str):
        text = text.lower()
        # Extracting pincode
        pincode = re.findall(r'\b\d{6}\b', text)
        if len(pincode) > 0:
            pincode = pincode[0]

        # Extracting state
        regex='('
        for state in self.state_list:
            regex += state.lower()+'|'
        state = re.findall(regex[:-1]+')', text)
        if len(state)>0:
            state = state[0]
        else:
            state = None
            
        return pincode, state

    def preprocess_text(self, sentence: str) -> str:
        sentence = sentence.lower()
        sentence = re.sub(r'[.,-]', ' ', sentence) # Remove . and , -
        sentence = re.sub(r'\b\d{6}\b', '', sentence) # Remove PIN

        # Identify and remove state (Only removes last instance of state)
        regex='('
        for state in self.state_list:
            regex += state.lower()+'|'
        regex = regex[:-1]+')'
        matches = list(re.finditer(regex, sentence))
        if matches:
            last_match = matches[-1]
            sentence = sentence[:last_match.start()] + sentence[last_match.end():]
        
        sentence = ' '.join(sentence.split())
        return sentence

    def align_word_ids(self, tokenized_text, logits):
        word_ids = tokenized_text.word_ids()
    
        previous_word_idx = None
        label_ids = []
        temp_list = []
    
        for i, word_idx in enumerate(word_ids):
            if word_idx is None:
                continue
            elif word_idx != previous_word_idx:
                temp_list=[]
                try:
                    label_ids.append(logits[i])
                    temp_list.append(logits[i])
                except:
                    label_ids.append(-100)
            else:
                temp_list.append(logits[i])
                c = Counter(temp_list)
                tag = c.most_common()[0][0]
                try:
                    label_ids[word_idx] = tag
                except:
                    label_ids.append(-100)
            previous_word_idx = word_idx
    
        return label_ids

    def create_result_dict(self, split_text, prediction_labels, state, pin):
        fin_dict = {key: [] for key in tag2idx.keys()}
        for (i, word), label in zip(enumerate(split_text), prediction_labels):
            fin_dict[label].append((word, i))
        fin_dict['state'] = state
        fin_dict['pin'] = pin
        return fin_dict
    
    def predict(self, sentence: str):
        if device == 'cuda':
            self.model = self.model.cuda()
        pincode, state = self.extract_pin_and_state(sentence)
        sentence = self.preprocess_text(sentence)
        text = self.tokenizer(sentence, padding='max_length', max_length=512, truncation=True, return_tensors="pt")
        mask = text['attention_mask'].to(device)
        input_id = text['input_ids'].to(device)
    
        logits = self.model(input_id, mask, None)
        logits = logits[0]
        logits_clean = logits.argmax(dim=2).squeeze(0).tolist()
        label_ids = self.align_word_ids(text, logits_clean)
    
        prediction_label = [idx2tag[i] for i in label_ids]
        result_dict = self.create_result_dict(sentence.split(), prediction_label, state, pincode)
    
    
        return result_dict
    

