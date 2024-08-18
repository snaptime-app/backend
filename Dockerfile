FROM node:22-alpine3.19@sha256:30c5be9215c0ab992925f025a388d41e9be66c159a6cefb8f132ba829874e7f7

WORKDIR /app
COPY package.json yarn.lock ./

RUN ["yarn", "install"]

COPY . .

RUN ["yarn", "build"]

EXPOSE 8080

ENTRYPOINT [ "./docker-entrypoint.sh" ]
