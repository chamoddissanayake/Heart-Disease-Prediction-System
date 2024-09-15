from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Step 1: Load and prepare data
heart_data = pd.read_csv('heart.csv')

# Separate features (X) and target (Y)
X = heart_data.drop(columns='target', axis=1)
Y = heart_data['target']

# Split data into training and testing sets
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, stratify=Y, random_state=42)

# Step 2: Train the Random Forest model
model = RandomForestClassifier()
model.fit(X_train, Y_train)

# Step 3: Create the Flask app
app = Flask(__name__)
CORS(app) 

# Step 4: Define the prediction endpoint
@app.route('/predict', methods=['POST'])
def predict_heart_disease():
    # Step 5: Get input data from the request
    input_data = request.json.get('input_data')
    
    # Check if input_data is provided
    if not input_data:
        return jsonify({'error': 'Input data is required'}), 400

    try:
        # Convert input data to NumPy array
        input_data_as_numpy_array = np.asarray(input_data)

        # Reshape the input data as we are predicting for one instance
        input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)

        # Step 6: Make prediction using the model
        prediction = model.predict(input_data_reshaped)

        # Step 7: Prepare the response
        if prediction[0] == 0:
            result = 'The person does not have heart disease'
        else:
            result = 'The person has heart disease'

        # Return prediction result as JSON
        return jsonify({'prediction': result})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Step 8: Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=5001)
