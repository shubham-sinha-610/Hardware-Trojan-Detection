import flask
from flask import Flask, render_template, request
import pickle
import numpy as np  # Import NumPy
import joblib

# app = Flask(__name__)
app = Flask(__name__, static_url_path='/static', static_folder='static')

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


@app.route('/')
def home():
    result = ''  # Initialize result as an empty string
    return render_template('inddex.html', result=result)  # Use 'index.html' for clarity


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input values from the form
        input1 = float(request.form['input1'])
        input2 = float(request.form['input2'])
        input3 = float(request.form['input3'])
        input4 = float(request.form['input4'])
        input5 = float(request.form['input5'])
        input6 = float(request.form['input6'])

        # Prepare the input data
        input_data = prepare_input(input1, input2, input3, input4, input5, input6)

        # Make prediction using the model
        result = model.predict(input_data)

        # Get the predicted class (assuming it's a binary classification)
        predicted_class = result[0]
        if predicted_class == 1:
            result = "vulnerability is detected on your device"
        else:
            result = "Your harware is secure"

        return render_template('inddex.html', result=result)
    except:
        result = "Error: Please enter valid numerical values."
        return render_template('inddex.html', result=result)

if __name__ == '__main__':
    app.run(debug=True)
