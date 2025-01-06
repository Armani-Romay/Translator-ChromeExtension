import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
# Create the model
generation_config = {
  "temperature": 0.3,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-2.0-flash-exp",
  generation_config=generation_config,
  system_instruction="You are a polyglot that can translate any language to a language specified by the user. Keep in mind slang terms, and only return the text that was translated with the most perceived accuracy. DO NOT EXPLAIN the translation at all,  just provide the translated text.",
)
app = Flask(__name__)
CORS(app)

@app.route("/api/translate", methods=["POST"])
def translate():
    data = request.json
    input_text = data.get("input_text")

    if not input_text:
        return jsonify({"error": "No input text provided"}), 400
    
    chat_session = model.start_chat(
        history=[]
      )
    response = chat_session.send_message(input_text)
    print(response.text)
    return jsonify({"translation": response.text}) 

if __name__ == "__main__":
    app.run(debug=True)

