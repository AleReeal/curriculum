FROM ubuntu
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install nodejs -y
RUN apt-get install npm -y
RUN apt-get install curl -y
ENV NVM_DIR /usr/local/nvm
RUN mkdir -p $NVM_DIR
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
ENV NODE_VERSION v20.9.0
RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION"
ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH
VOLUME /src
WORKDIR /src
CMD ["npm", "start"]