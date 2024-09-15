
# Heart Disease Prediction System




This heart disease prediction application utilizes a Random Forest classifier to assess the likelihood of heart disease based on user-provided input data. Built with Flask, the app features a RESTful API endpoint for predictions, allowing users to send data in JSON format. Upon receiving the input, the model processes it and returns a prediction indicating whether the individual is likely to have heart disease or not, making it a valuable tool for early detection and awareness.
## Run Locally

Install Python 3.10.0


  https://www.python.org/downloads/release/python-3100/

Install Node 21.6.2


  https://nodejs.org/en/blog/release/v21.6.2


Clone the project

```bash
  git clone https://github.com/chamoddissanayake/Heart-Disease-Prediction-System.git
```

Go to Frontend Folder

```bash
  Frontend > heart-disease-prediction
```

Install dependencies

```bash
  npm install
```

Start the Frontend

```bash
  npm start
```

Go to Backend Folder

```bash
  Backend >
```

Install dependencies

```bash
  pip install -r requirements.txt
```

Start the Backend

```bash
  python app.py
```
## Tech Stack


**Programming Language:** Python, React

**Web Framework:** Flask

**Machine Learning Library:** Scikit-learn

**Data Manipulation Library:** Pandas

**Numerical Computing Library:** NumPy

**Data Source:** CSV file (heart.csv)
## Usage/Examples


POST Method

```bash
http://127.0.0.1:5001/predict
```

Request
```javascript
No Patient:
{
    "input_data": [62, 0, 0, 140, 268, 0, 0, 160, 0, 3.6, 0, 2, 2]
}

Patient:
{
    "input_data": [71,0,0,112,149,0,1,125,0,1.6,1,0,2]
}
```
Response
```javascript
No Patient:
{
  "prediction": "The person does not have heart disease"
}

Patient:
{
  "prediction": "The person has heart disease"
}

```
