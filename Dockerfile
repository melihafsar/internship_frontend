FROM node:20-alpine 
WORKDIR /app
COPY . .
RUN npm i 
RUN npm run build
ENV NODE_ENV production
ENV VITE_API_URL https://internshipapi.osman.tech
EXPOSE 4173
CMD ["npx", "vite", "preview", "--host"]