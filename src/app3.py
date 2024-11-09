from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import google.generativeai as genai
from dotenv import load_dotenv



app = Flask(__name__)
CORS(app)

API_KEY ="AIzaSyBOoTj4hfk_1Z6hpzrUpsPus-FkUL_3ElU"

@app.route('/check_interaction', methods=['POST'])
def check_interaction():
    drugs = request.json.get('drugs')

    if not drugs:
        return jsonify({"error": "No drugs provided"}), 400

    try:
        
        genai.configure(api_key=API_KEY)
        model = genai.GenerativeModel('gemini-1.5-flash')

        
        prompt = (
            f"Provide drug interaction information for the following drugs: {', '.join(drugs)}.\n"
            "Format the information like this:\n"
            "Drug Name: [Name]\n"
            "Category: [Serious/Monitor Closely/Minor]\n"
            "Drug Pair: [drug1 + drug2]\n"
            "Description: [Brief description]\n"
            "At the end, include a summary of the combined reaction for all listed drugs if taken together.\n"
            "Return the output in plain text without any Markdown formatting."
        )

        interaction_info = model.generate_content([prompt])

        
        response_text = interaction_info.text.replace('', '').replace('*', '')

        return jsonify({"interaction_info": response_text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)