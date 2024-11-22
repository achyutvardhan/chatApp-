

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import warnings
from sklearn.exceptions import InconsistentVersionWarning
import nltk
from nltk.stem.porter import PorterStemmer
from nltk.corpus import stopwords
import string
# Suppress warnings
warnings.filterwarnings("ignore", category=InconsistentVersionWarning)
# Load the trained model
ps = PorterStemmer()
vectorizer = joblib.load('./vectorizer.pkl')
model = joblib.load('./model.pkl')
def transform_text(text):
    text = text.lower()
    text = nltk.word_tokenize(text)
    y = []
    for i in text:
        if i.isalnum():
            y.append(i)
    text = y[:]
    y.clear()
    for i in text:
        if i not in stopwords.words('english') and i not in string.punctuation:
            y.append(i)
    text = y[:]
    y.clear()
    for i in text:
        y.append(ps.stem(i))
    return " ".join(y)
app = Flask(__name__)
CORS(app,origin='*')
@app.route('/predict', methods=['POST', 'GET'])
def predictAns():
        data = request.get_json()
        print(data['data'])
        message = data.get('data')
        print(message)
        transformed_message = transform_text(message)
        vectorized_message = vectorizer.transform([transformed_message])
        prediction = model.predict(vectorized_message)[0]
        print(prediction)
        result = {"prediction": int(prediction)}
        return jsonify(result), 200

if __name__ == '__main__':
    app.run(debug=True, port=5120)
