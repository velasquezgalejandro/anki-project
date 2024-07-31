FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# CMD ["npm", "run", "dev"]
CMD ["npm", "run", "preview"]
# CMD ["npm", "run", "preview", "dev"]
