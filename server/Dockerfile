FROM node:24-alpine

# 1. Set the working directory
WORKDIR /app

# 2. Install build tools AND wget using Alpine's package manager (apk)

RUN apk add --no-cache python3 make g++ wget

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Download the Tesseract data directly into the container 
# (This bypasses the Hugging Face binary file upload limit)
RUN wget https://github.com/tesseract-ocr/tessdata/raw/main/eng.traineddata

# 5. Copy the rest of your server code
COPY . .

# 6. Hugging Face REQUIRES port 7860
EXPOSE 7860

# 7. Use production start command instead of 'dev'
CMD ["node", "server.js"]