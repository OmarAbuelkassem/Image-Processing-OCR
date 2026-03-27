FROM node:24-alpine
WORKDIR /app

COPY package*.json ./
RUN apk add --no-cache python3 make g++
RUN npm install
# Add this 2 lines below to install the missing depenedices we removed when we uploaded to HuggingFace
# IF not using HF, feel free to remove them.
# Replace the old apt-get lines with this:
RUN apk add --no-cache wget

# The wget command remains the same
RUN wget https://github.com/tesseract-ocr/tessdata/raw/main/eng.traineddata
COPY . .


EXPOSE 7860
CMD [ "npm", "run", "dev" ]