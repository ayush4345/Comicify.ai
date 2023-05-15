<div align="center">
<!--   <a href="https://github.com/ahmedfahim21/Notimiser">
    <img src="./client/public/blue-logo.png" alt="Logo" width="80">
  </a> -->
<a href="https://github.com/ayush4345/HMap.ai/blob/main/client/public/assets/comicify_ai.svg"><img src="client/public/assets/comicify_ai.svg" alt="comicify.ai" border="1" width="100"/></a>
<h1 align="center">Comicify.ai</h1>

  <p align="center">
    Transforming dull text into comic adventures! 
  </p>
</div>


![image](https://github.com/ayush4345/HMap.ai/assets/97223188/bb0e20f0-8e5c-4585-a7cc-7fce3c859230)
![image](https://github.com/ayush4345/HMap.ai/assets/97223188/f81e2a11-bcdb-405d-b0d2-bb40c608b920)

## Project Idea
* Comicify.ai is a web application that utilizes various generative machine learning models to transform mundane and ordinary texts into visually captivating comic strips. With Comicify.ai, you can bring your ideas, stories, or any text to life in a vibrant and engaging comic book format.

* Our goal is to provide a user-friendly platform where individuals, comic enthusiasts, or even professional comic creators can easily convert their texts into visually stunning comic narratives. Whether it's a funny anecdote, a thrilling adventure, or a heartfelt story, Comicify.ai empowers users to explore their creativity and share their narratives in an expressive and engaging manner.

* Using a combination of GPT-3.5-Turbo and Stable Diffusion, Comicify.ai analyzes the provided text, identifies key elements, and automatically generates comic panels, dialogues, and artwork. The resulting comic strips are thoughtfully designed, featuring dynamic characters, expressive illustrations, and carefully crafted layouts that truly capture the essence of the original text.

* The generated comic strips can be saved as PDFs, easily shared on social media, incorporated into presentations, or even printed as physical copies.

* Whether you're an aspiring comic artist, a writer looking to add an exciting visual element to your stories, or simply someone who wants to explore the fascinating world of comics, join us on this exciting journey of turning words into art, as we invite you to unleash your creativity and experience the magic of Comicify.ai!


## Our Approach

1. **Text Manipulation with GPT-3.5 Turbo**: When a user submits their text, and additional personalisation parameters, we cleverly manipulate the prompts. By leveraging GPT-3.5 Turbo language model's advanced natural langauge processing capabilities, we transform the text into an engaging dialogue prose. This step adds a dynamic and conversational element to the comic strips, enhancing the storytelling experience.

2. **Backend Processing with Flask**: After the text manipulation step, we pass the generated dialogues to the Flask backend. Here, we process the prose texts and extract various dictionaries consisting of speakers and their corresponding speeches. This helps us organise and create images corresponding to each speaker and dialogue.

3. **Stable Diffusion Model for Comic Strip Generation**: With the structured dictionaries of speakers and speeches, we input them into our stable diffusion model. This model incorporates innovative image generation techniques, producing high-quality and visually appealing comic strip images. The manipulation of prompts ensures that the generated images align seamlessly with the intended narrative and artistic style.

4. **Adding text on images using OpenCV**: Since, image generation models aren't particularly good at adding text onto images, we add the corresponding dialogue above the generated image. This is done using OpenCV (image manipulation) and Pillow (image processing) libraries.

5. **Combining Images into a PDF**: Once the comic strip images are generated, we seamlessly merge them into a single PDF file. This PDF file acts as a comprehensive comic book, allowing users to easily view, share, and print their personalized comic creation. The downloadable PDF format provides a convenient way for users to enjoy their comic strips across various devices and platforms.

Through our approach, we aim to empower users to transform their plain text into compelling visual narratives. By leveraging the capabilities of GPT-3.5 Turbo, incorporating advanced image generation techniques, and utilizing Flask for efficient processing, Comicify.ai delivers an immersive comic creation experience that sparks creativity and storytelling.


## Challenges We Faced
During the development of Comicify.ai, we encountered and overcame several challenges, including:

* Finding suitable free-to-use stable diffusion APIs.
* Developing a reliable image generation pipeline.
* Saving and organizing generated images, and generating a downloadable PDF file.

## Technologies We Used

* ![Nextjs](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
* ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
* ![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
* ![Replit](https://img.shields.io/badge/Replit-DD1200?style=for-the-badge&logo=Replit&logoColor=white)

## Network Diagram

![photo_2023-05-14_11-25-38](https://github.com/ayush4345/HMap.ai/assets/97223188/bb057ac4-db8e-4711-9401-17944f88677d)

## Installation and Setup Guide
To get started with Comicify.ai, follow these steps:

1. Clone the Comicify.ai repository from [GitHub](https://github.com/your-repo-link).

### For `client` folder
1. change directory to client `cd client`
2. install npm packages by running `npm i`
3. start dev server by running `npm run dev`

## members 

[Parth Mittal](https://devfolio.co/@parthmittal)

[Hriday Mehta](https://devfolio.co/@outkast)

[Ayush Kumar](https://devfolio.co/@ayush4345)

[Mardav Chirag Gandhi](https://devfolio.co/@MCG)
