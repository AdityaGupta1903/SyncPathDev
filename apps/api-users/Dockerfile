FROM node
WORKDIR /app
COPY package.json /app
Run npm install
COPY . /app
CMD ["node","dist/src/main.js"]