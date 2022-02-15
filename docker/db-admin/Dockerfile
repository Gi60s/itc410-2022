FROM node:16-alpine

RUN npm install -g dynamodb-admin

ENV DYNAMO_ENDPOINT=http://db:8000

ENTRYPOINT [ "dynamodb-admin" ]