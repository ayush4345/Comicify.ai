import os
import base64
from dotenv import load_dotenv
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import io
import warnings
from PIL import Image, ImageDraw, ImageFont, ImageColor
from stability_sdk import client
import stability_sdk.interfaces.gooseai.generation.generation_pb2 as generation
import openai
import convertapi
import cv2
import json
import re

load_dotenv()

os.environ['STABILITY_HOST'] = 'grpc.stability.ai:443'
os.environ['STABILITY_KEY'] = os.getenv('STABLE_DIFFUSION_API')
os.environ['OPENAI_API'] = os.getenv('OPEN_AI_API')
os.environ['CONVERT_API_KEY'] = os.getenv('CONVERT_API')

stability_api = client.StabilityInference(
    key=os.environ['STABILITY_KEY'],
    verbose=True,
    engine="stable-diffusion-xl-beta-v2-2-2",
)

app = Flask(__name__)

CORS(app, resources={r'/*': {'origins': '*'}})

# ==== Helper Functions ====

"""
This function interacts with the GPT-3.5-turbo language model through the OpenAI API.
It takes a user's query or message as input and returns the generated response.
 """

def convert_text_to_conversation(text):

    # Call the OpenAI API to generate a response
    try:
        openai.api_key = os.environ['OPENAI_API']

        response = openai.ChatCompletion.create(

            model="gpt-3.5-turbo",

            messages=[{
                "role": "system",
                "content": "You are a fun yet knowledgeable assistant."
            }, {
                "role": "user",
                "content": text
            }],

            temperature=0.6,
            max_tokens=150)

        # Process the response to extract speech and person information

        speech, person = generate_map_from_text(
            response.choices[0].message.content)

        # Return the generated speech and person information
        return (speech, person)

    except openai.error.APIError as e:
        raise Exception(f"OpenAI API returned an API Error: {e}")
    except openai.error.APIConnectionError as e:
        raise Exception(f"Failed to connect to OpenAI API: {e}")
    except openai.error.RateLimitError as e:
        raise Exception(f"OpenAI API request exceeded rate limit: {e}")


# Generate map in the format of {0: "speech", 1: "speech", ...} and {0: "person", 1: "person", ...}

def generate_map_from_text(text):

    try:
        d = {}
        who_spoke = {}
        dialogue = []
        speak = []

        l = text.split("\n")

        for word in l:
            i = 0
            if 'Scene' not in word and 'Act' not in word:
                if ':' in word:
                    dialogue.append((word.split(':')[1]))
                    speak.append((word.split(':')[0]))

            for i in range(len(dialogue)):
                d[i] = dialogue[i]
                who_spoke[i] = speak[i]

        return (d, who_spoke)
    except Exception as e:
        raise Exception(f"Error occurred during map generation: {e}")


# Create an image from the generated speech and person information using the Stable Diffusion API

def stable_diff(person, speech, name, features, cfg, step):
    try:
        answer = stability_api.generate(
            prompt=f"""

                Create a comic-style image where {person} says, "{speech}".
                Capture the expressions of the user from the dialogue.
                Add styles based on the following features {features}

                """,

                seed=992446758,
                steps=int(step),
                cfg_scale=int(cfg),
                width=512,
                height=512,
                samples=1,
                sampler=generation.SAMPLER_K_DPMPP_2M
            )

            # Check if the folder exists, create it if necessary

        folder_path = "./images"
            # Save the generated image to the folder

        for resp in answer:
            for artifact in resp.artifacts:
                if artifact.finish_reason == generation.FILTER:
                    raise Exception(
                        "Your request activated the API's safety filters and could not be processed. Please modify the prompt and try again")

                if artifact.type == generation.ARTIFACT_IMAGE:
                    image_path = os.path.join(folder_path, f"{name}.png")
                    img_binary = io.BytesIO(artifact.binary)
                    img = Image.open(img_binary)
                    img.save(image_path)
                    return image_path
    except Exception as e:
        error_message = str(e)
        details_match = re.search('details = "(.*?)"', error_message)
        if details_match:
            details = details_match.group(1)
            error_message = f"Error occurred as: {details}"
        else:
            error_message = f"Error occurred: {error_message}"
        print(error_message)
        raise Exception(error_message)


# Convert the generated images to a PDF file using the ConvertAPI

def convert_images_to_pdf(images):
    try:
        convertapi.api_secret = os.environ['CONVERT_API_KEY']

        convertapi.convert('pdf', {
            'Files': images
        }, from_format='images').file.save('./file.pdf')
    except convertapi.exceptions.ConvertApiError as e:
        raise Exception(f"Error occurred during image to PDF conversion: {e}")


# Add line breaks to the generated speech to make it easier to read in the comic

def add_line_breaks(text):
    try:
        # Split the text into a list of words
        words = text.split()
        new_text = ''
        for i, word in enumerate(words):
            new_text += word
            if (i+1) % 7 == 0:
                new_text += '\n'
            else:
                new_text += ' '

        return new_text
    except AttributeError as e:
        raise Exception(f"Error occurred during line break addition: {e}")



# Add text to the generated image using OpenCV and PIL

def add_text_to_image(image_path, text_from_prompt, file_number):

    try:
        image = Image.open(image_path)
        right_pad = 0
        left_pad = 0
        top_pad = 50
        bottom_pad = 0
        width, height = image.size

        new_width = width + right_pad + left_pad
        new_height = height + top_pad + bottom_pad

        result = Image.new(image.mode, (new_width, new_height), (255, 255, 255))
        result.paste(image, (left_pad, top_pad))

        font_type = ImageFont.truetype("font/animeace2_reg.ttf", 12)

        # result.save('output.jpg')

        # img=Image.open('output.jpg')

        draw = ImageDraw.Draw(result)
        draw.text((10, 0), text_from_prompt, fill='black', font=font_type)
        result.save(f"./images/{file_number}.png")
        border_img = cv2.imread(f"./images/{file_number}.png")

        borderoutput = cv2.copyMakeBorder(
            border_img, 10, 10, 10, 10, cv2.BORDER_CONSTANT, value=[0, 0, 0])

        cv2.imwrite(f"./images/{file_number}.png", borderoutput)
    except Exception as e:
        raise Exception(f"Error occurred during text addition: {e}")


# ==== Routes ====

@app.route('/', methods=['GET'])
def test():
    return 'The server is running!'


@app.route('/', methods=['POST'])
def generate_comic_from_text():

    try:
        prompt = "Convert the following boring text into a comic style conversation between characters while retaining information. Try to keep the characters as people from the story. Keep a line break after each dialogue and don't include words like Scene 1, narration context and scenes etc. Keep the name of the character and not character number: \n\n\n"

        user_input = request.get_json()['userInput']
        customisation = request.get_json()['customizations']
        cfg = request.get_json()['cfgValue']
        step = request.get_json()['steps']

        print(user_input)
        print(customisation)

        input = prompt + user_input
        response = convert_text_to_conversation(input)
        print(response)

        generated_images_paths = []
        print("ChatGPT worked")
        for i in range(len(response[0])):

            image_path = stable_diff(
                response[1][i], response[0][i], i, customisation, cfg, step)
            print(image_path)
            generated_images_paths.append(image_path)

            text = add_line_breaks(response[0][i])

            add_text_to_image(f"./images/{i}.png", text, i)
            print(generated_images_paths)

        convert_images_to_pdf(generated_images_paths)

        return send_file('./file.pdf', as_attachment=True)

    except Exception as e:
        error_message = str(e)
        return json.dumps({'error': error_message}), 500, {'Content-Type': 'application/json'}

if __name__ == "__main__":

    app.run(host='0.0.0.0')
