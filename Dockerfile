FROM node:alpine

ADD ./package*.json /src/
WORKDIR /src
RUN npm ci

ADD ./src /src/src
RUN npm run build

RUN ls -al /src/dist/

FROM nginx:alpine
COPY --from=0 /src/dist/ /usr/share/nginx/html/
