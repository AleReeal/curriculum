FROM node
VOLUME /src
WORKDIR /src
CMD ["node", "index.js"]