# import os
# import sys

# import pandas as pd

# from keras.models import Sequential
# from keras.layers import Dense, Dropout
# from tensorflow.keras.optimizers import SGD, Adam
# from keras.utils.np_utils import to_categorical
# Flask
from flask import Flask, url_for, request, render_template,redirect


# TensorFlow and tf.keras
import tensorflow as tf
from tensorflow import keras

# from tensorflow.keras.applications.imagenet_utils import preprocess_input, decode_predictions
from tensorflow.keras.models import load_model

from tensorflow.keras.utils import load_img,img_to_array
# Some utilites
import numpy as np
import sys
from PIL import Image
sys.modules['Image'] = Image 
# import Image
# from sklearn.metrics import classification_report, confusion_matrix


# Declare a flask app
app = Flask(__name__)

# model=pickle.load(open('model.pkl','rb'))
print('Model loaded. Check http://127.0.0.1:5000/')


# Model saved with Keras model.save()
MODEL_PATH = 'model/model.h5'
model=load_model(MODEL_PATH)
        # Necessary
print('Model loaded. Start serving...')



@app.route('/predict',methods=['POST','GET'])
def predict():
    pred = "model didnt work"
    if request.method == "GET":
        # image = request.args.get('image')
        path="http://localhost:5001/image/ded29c4591897c968c0bdfe6d37e258b.png"
        img=load_img(path,target_size=(160,160))
        print(img)
        i=img_to_array(img)/255
        print(i)
        input_arr=np.array([i])
        print(input_arr)
        pred = np.argmax(model.predict(input_arr), axis=1)
        pred = pred.reshape((1, 1))[0][0]
        if(pred==0):
            return "battery"
        elif(pred==1):
            return "biological"
        elif(pred == 2):
            return "brown-glass"
        elif(pred == 3):
            return "cardboard"
        elif(pred==4):
            return "clothes"
        elif(pred==5):
            return "green-glass"
        elif(pred==6):
            return "metal"
        elif(pred==7):
            return "paper"
        elif(pred==8):
            return "plastic"
        elif(pred==9):
            return "shoes"
        elif(pred==10):
            return "trash"
        elif(pred==11):
            return "white-glass"
    return pred


if __name__ == '__main__':
    app.run(debug=True)