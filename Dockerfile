FROM node
VOLUME /src
WORKDIR /src
CMD ["npm", "start"]