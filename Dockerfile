FROM node:20-alpine 
WORKDIR /app
COPY . .
ENV VITE_API_URL https://internshipapi.osman.tech
RUN npm i 
RUN npm run build
ENV NODE_ENV production
EXPOSE 4173
CMD ["npx", "vite", "preview", "--host"]
