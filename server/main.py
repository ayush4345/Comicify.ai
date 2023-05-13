import os

from flask import Flask, request, jsonify
from flask_cors import CORS
# from langchain import OpenAI, PromptTemplate, LLMChain
# from langchain.text_splitter import CharacterTextSplitter
# from langchain.chains.mapreduce import MapReduceChain
# from langchain.prompts import PromptTemplate
# from langchain.docstore.document import Document
# from langchain.chains.summarize import load_summarize_chain
import openai

import os
os.environ["OPENAI_API_KEY"] = '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'

app = Flask(__name__) 
CORS(app) 



# @app.route('/summariser', methods=['POST'])
# def upload():
#     user_input=request.get_json()['userInput']
#     llm = OpenAI(temperature=0)
#     text_splitter = CharacterTextSplitter()
#     state_of_the_union = user_input
#     texts = text_splitter.split_text(state_of_the_union)
#     docs = [Document(page_content=t) for t in texts]
#     chain = load_summarize_chain(llm, chain_type="stuff")
#     result = chain.run(docs)
#     print(result)
#     return jsonify({"output":result})


@app.route('/askgpt', methods=['POST'])
def ask_gpt():
    user_input = request.get_json()['question']
    response = askGPT(user_input)
    print(response)
    return jsonify({"output": response})

def askGPT(text):
    openai.api_key = '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'
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=text,
        temperature=0.6,
        max_tokens=150
    )
    return response.choices[0].text






if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)