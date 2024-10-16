from flask import Flask, request, jsonify
import os
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = './static/images/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load the pre-trained model
model = load_model('model_3.h5')
IMG_SIZE = (150, 150)

# Function to preprocess image
def load_and_preprocess_image(image_path, target_size=IMG_SIZE):
    img = load_img(image_path, target_size=target_size)
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array = img_array / 255.0  # Normalize
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    imagefile = request.files['file']
    if imagefile.filename == '':
        return jsonify({'error': 'No selected file'})

    filename = secure_filename(imagefile.filename)
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    imagefile.save(image_path)

    try:
        # Preprocess the image and make a prediction
        img_array = load_and_preprocess_image(image_path)
        prediction = model.predict(img_array)

        # Determine result (assuming binary classification: Pneumonia vs Normal)
        result = 'Pneumonia' if prediction[0][0] > 0.5 else 'Normal'
        prediction_prob = prediction[0][0]

        pneumonia_percentage = prediction_prob * 100
        normal_percentage = (1 - prediction_prob) * 100

        return jsonify({
            'result': result,
            'pneumonia_percentage': f"{pneumonia_percentage:.2f}%",
            'normal_percentage': f"{normal_percentage:.2f}%"
        })
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({'error': 'Error during prediction'})

if __name__ == '__main__':
    app.run(debug=True)
