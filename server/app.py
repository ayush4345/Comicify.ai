import os
import base64
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


os.environ['STABILITY_HOST'] = 'grpc.stability.ai:443'

os.environ[
  'STABILITY_KEY'] = 'sk-C2YwwIh4S0Wbj7hcvdByvRtYVkDR1pFVFMjJajrqrMZCHPjr'

stability_api = client.StabilityInference(
  key=os.environ['STABILITY_KEY'],
  verbose=True,
  engine="stable-diffusion-xl-beta-v2-2-2",
)

app = Flask(__name__)
CORS(app)


def askGPT(text):
  openai.api_key = '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'
  response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[{
      "role": "system",
      "content": "You are a fun yet knowledgable assistant."
    }, {
      "role": "user",
      "content": text
    }],
    temperature=0.6,
    max_tokens=150)
  speech, person = generate_map_from_text(response.choices[0].message.content)
  return (speech, person)


def generate_map_from_text(text):
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


def stable_diff(person, speech, name):
  answer = stability_api.generate(prompt=f"""
        Create a comic-style image where {person} says, "{speech}". Capture the expressions of the user from the dialogue.
        """,
                                  seed=992446758,
                                  steps=30,
                                  cfg_scale=8.0,
                                  width=512,
                                  height=512,
                                  samples=1,
                                  sampler=generation.SAMPLER_K_DPMPP_2M)
  # Check if the folder exists, create it if necessary
  folder_path = "./images"
  # if not os.path.exists(folder_path):
  #   os.makedirs(folder_path)

  print(answer)
  for resp in answer:
    for artifact in resp.artifacts:
      if artifact.finish_reason == generation.FILTER:
        warnings.warn(
          "Your request activated the API's safety filters and could not be processed."
          "Please modify the prompt and try again.")
      if artifact.type == generation.ARTIFACT_IMAGE:
        image_path = os.path.join(folder_path, f"{name}.png")
        img_binary = io.BytesIO(artifact.binary)
        img = Image.open(img_binary)
        img.save(image_path)
        print("hii")
        return image_path


def convert_images_to_pdf(images):
  convertapi.api_secret = 'YFqhabOJQEcuyc5Z'
  convertapi.convert('pdf', {
    'Files': images
  }, from_format='images').file.save('./file.pdf')



def add_line_breaks(text):
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


def add_text_to_image(image_path,text_from_prompt, file_number):
  #input should be an image and corresponding text needs to be added after padding
  #text= text
  #can probably ask for colour of padding, colour of font for each.
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
  #result.save('output.jpg')
  #img=Image.open('output.jpg')
  draw = ImageDraw.Draw(result)
  draw.text((10, 0), text_from_prompt, fill='black', font=font_type)
  result.save(f"./images/{file_number}.png")
  border_img = cv2.imread(f"./images/{file_number}.png")
  borderoutput = cv2.copyMakeBorder(border_img, 10, 10, 10, 10, cv2.BORDER_CONSTANT, value=[0, 0, 0])
  cv2.imwrite(f"./images/{file_number}.png", borderoutput)



@app.route('/', methods=['POST'])
# def upload_file():

#     ask_gpt()
#     # Send the file as a response
def ask_gpt():
  prompt = "Convert the following boring text into a comic style conversation between characters while retaining information. Try to keep the characters as people from the story. Keep a line break after each dialogue and don't include words like Scene 1, narration context and scenes etc. Keep the name of he character and not character number: \n\n\n"

#   prompt = "only use name for the following prompt: Convert the following boring text into a comic style conversation between characters while retaining information. Try to keep the characters as people from the story. Keep a line break after each dialogue and don't include words like Scene 1, narration context and scenes etc. paragraph: \n\n\n"

  user_input = request.get_json()['userInput']
  print(user_input)

  input = prompt + user_input
  response = askGPT(input)
  print(response)
  generated_images_paths = []
  for i in range(len(response[0])):
    image_path = stable_diff(response[1][i], response[0][i], i)
    print(image_path)
    generated_images_paths.append(image_path)

    text = add_line_breaks(response[0][i])
    add_text_to_image(f"./images/{i}.png",text, i)
    print(generated_images_paths)

  convert_images_to_pdf(generated_images_paths)

  return send_file('./file.pdf', as_attachment=True)
  # return jsonify({"person": response[1], "speech": response[0]})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)