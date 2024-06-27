from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the model (assuming it's a scikit-learn model)
model = joblib.load("savedmodel2.sav")

# Function to prepare the input data for prediction
def prepare_input(p1, p2, p3, p4, p5, p6):
    """
    Reshape the input data into a format expected by the model.

    Args:
        p1 (float): Sepal p1 value
        p2 (float): Sepal p2 value
        p3 (float): Petal p3 value
        p4 (float): Petal p4 value
        p5 (float): Petal p5 value
        p6 (float): Petal p6 value

    Returns:
        numpy.ndarray: The reshaped input data
    """
    return np.array([[p1, p2, p3, p4, p5, p6]])  # Reshape to 2D array for prediction

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input values from the form
        data = request.json

        # Validate and convert input values
        input_values = []
        for key in ['ports', 'nets', 'cells', 'seq_cells', 'ref', 'power']:
            value = data.get(key)
            if value is None or value.strip() == '':
                return jsonify({'result': f"Error: Missing or invalid value for {key}"})
            input_values.append(float(value))

        # Prepare the input data
        input_data = prepare_input(*input_values)

        # Make prediction using the model
        result = model.predict(input_data)

        # Get the predicted class (assuming it's a binary classification)
        predicted_class = result[0]
        if predicted_class == 1:
            result = "Vulnerability is detected on your device"
        else:
            result = "Your hardware is secure"

        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'result': f"Error: {str(e)}"})

if __name__ == '__main__':
    app.run(debug=True)
