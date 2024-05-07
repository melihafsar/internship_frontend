FROM node:20-alpine 
WORKDIR /app
COPY . .
RUN npm i 
RUN npm run build
ENV NODE_ENV production
EXPOSE 4173
CMD ["npm", "preview"]