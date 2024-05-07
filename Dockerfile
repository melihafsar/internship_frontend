FROM node:20-alpine 
WORKDIR /app
COPY . .
RUN pnpm i 
RUN pnpm run build
ENV NODE_ENV production
EXPOSE 4173
CMD ["pnpm", "preview"]