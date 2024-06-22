FROM node
VOLUME /src
WORKDIR /src
CMD ["node", "index.js"]

#docker run -d -it --name sito -p 80:80 -v .:/src curriculum