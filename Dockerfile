FROM oven/bun:latest
WORKDIR /app
COPY . .
ENV VITE_API_URL https://internshipapi.osman.tech
RUN bun install
RUN bun run build
ENV NODE_ENV production
EXPOSE 4173
CMD ["bunx", "vite", "preview", "--host"]
