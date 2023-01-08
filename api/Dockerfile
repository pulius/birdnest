FROM denoland/deno:alpine-1.26.2

EXPOSE 7777

WORKDIR /app

COPY . .

CMD [ "run", "--watch", "--allow-net", "--allow-read", "--allow-env", "app.ts" ]