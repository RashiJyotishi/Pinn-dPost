# Pinn-dPost

Pinn-dPost is a project developed as part of the Smart India Hackathon (SIH) submission for Problem Statement 1758.

## Project Description
Pinn-dPost aims to simplify and enhance the efficiency for postage sevices in India and easing the delivery for both the customers and delivery staff. It leverages Python for its core functionalities, ensuring robust and efficient performance.

## Installation Instructions
To install and set up Pinn-dPost, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/RashiJyotishi/Pinn-dPost.git
   ```
2. Navigate to the project directory:
   ```sh
   cd Pinn-dPost
   ```
3. Install the required dependencies:
   ```sh
   pip install -r requirements.txt
   ```

## Usage Instructions
To use Pinn-dPost, follow these steps:

1. Run the main application:
   ```sh
   python main.py
   ```
2. Follow the on-screen instructions to post and manage your content efficiently.

## How does it work?
- CV operations will be performed on the delivery package(either Barcode Scanning or OCR to read written address)
- Separating the components of address(Landmark, Locality, City, State etc.) using Named Entity Recognition (NER)
- Determining the geographic coordinates (latitude, longitude) of the parsed address using Google Geocoding(Best solution we could find currently)
- Finding the Optimal Branch Post Office using the following steps:
    - K-Nearest Neighbors (KNN): Calculate the Euclidean distance(or on map distance using some API if possible) between the address coordinates and the coordinates of nearby post offices.
    - Post Office Database: Maintain a database(using pandas DataFrame for now) of post offices with their coordinates and other relevant information.
    - Optimization: Consider additional factors like post office capacity, delivery routes, traffic, and service areas for more optimal selection.
    - collection of the final output data to further improve and enhance the model creating more optimal and faster responses as the infrastructure is used over time.
