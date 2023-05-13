import convertapi

def convert_images_to_pdf(images):
  convertapi.api_secret = 'YFqhabOJQEcuyc5Z'
  convertapi.convert('pdf', {
      'Files': images  
  }, from_format = 'images').file.save('./file.pdf')