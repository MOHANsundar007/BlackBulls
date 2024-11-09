from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
from sklearn.metrics.pairwise import cosine_similarity


with open(r'C:\Users\ajith\Downloads\healthcare_document_retrieval_model.pkl', 'rb') as model_file:
    saved_data = pickle.load(model_file)
    vectorizer = saved_data['vectorizer']
    document_titles = saved_data['document_titles']
    document_texts = saved_data['document_texts']

app = Flask(__name__)
CORS(app)  

@app.route('/api/retrieve-documents', methods=['POST'])
def retrieve_documents():
    data = request.get_json()
    query = data.get('query')
    if not query:
        return jsonify({'error': 'No query provided'}), 400

   
    query_vector = vectorizer.transform([query])
    tfidf_matrix = vectorizer.transform(document_texts)
    cosine_sim = cosine_similarity(query_vector, tfidf_matrix)
    most_relevant_doc_index = cosine_sim.argmax()

    results = {
        'most_relevant_title': document_titles[most_relevant_doc_index],
        'most_relevant_content': document_texts[most_relevant_doc_index],
        'similarity_scores': [
            {'title': title, 'score': f"{cosine_sim[0, idx]:.4f}"}
            for idx, title in enumerate(document_titles)
        ]
    }
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)