FROM node
VOLUME /src
WORKDIR /src
CMD ["npm", "start"]

#docker run -d -it --name sito -p 80:80 -v .:/src curriculum