FROM node:17-alpine

ARG NODE_ENV=development
ARG WORKDIR=/opt/react

ENV NODE_ENV=${NODE_ENV}

WORKDIR ${WORKDIR}

COPY . .

RUN set -eux \
 && yarn install

EXPOSE 3000
CMD ["yarn", "dev"]
