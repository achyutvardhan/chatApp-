
FROM alpine:latest


RUN apk add --no-cache python3 py3-pip \
    && apk add --no-cache build-base \
    && apk add --no-cache gfortran \
    && apk add --no-cache py3-numpy py3-pandas py3-scikit-learn\
    && apk add --no-cache py3-flask\
    && apk add --no-cache py3-flask-cors\
    && apk add --no-cache py3-joblib\
    && apk add --no-cache py3-numpy



COPY ./flaskServer.py . 
COPY ./vectorizer.pkl .

# Expose the required port
EXPOSE 88

# Set the command to run the Flask server
CMD ["python3", "flaskServer.py"]
