from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import os
import google.generativeai as genai
from dotenv import load_dotenv



app = Flask(__name__)

CORS(app)

API_KEY = "AIzaSyBOoTj4hfk_1Z6hpzrUpsPus-FkUL_3ElU"

@app.route('/caption', methods=['POST'])
def caption_image():
    uploaded_file = request.files.get('image')
    
    if not uploaded_file:
        return jsonify({"error": "No image uploaded"}), 400

    temp_dir = "temp"
    if not os.path.exists(temp_dir):
        os.makedirs(temp_dir)

    file_path = os.path.join(temp_dir, uploaded_file.filename)
    uploaded_file.save(file_path)
    
    try:
        with Image.open(file_path) as img:
            genai.configure(api_key=API_KEY)
            model = genai.GenerativeModel('gemini-1.5-flash')
            caption = model.generate_content(["Describe the image in detail and determine if it contains a drug or medicine. If so, provide the following information in a single paragraph: the drug name, the type of drug (e.g., antibiotic, pain reliever, etc.), its use or therapeutic purpose, and the recommended age limit (e.g., children, adults, or specific age groups).",img])
            tags = model.generate_content(["Generate 5 relevant hashtags for a medicine-related image based on its name, type, use, and age limit.", img])
            
            
            result = {
                "caption": caption.text,
                "tags": tags.text
            }
        
        os.remove(file_path)

        return jsonify(result)

    except Exception as e:
        error_msg = str(e)
        if "API_KEY_INVALID" in error_msg:
            return jsonify({"error": "Invalid API Key. Please check the API Key in the .env file."}), 400
        else:
            return jsonify({"error": f"Failed to process image: {error_msg}"}), 500

if __name__ == '__main__':
    app.run(debug=True)