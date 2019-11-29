FROM oraclelinux:7-slim

RUN  yum -y install oracle-release-el7 oracle-nodejs-release-el7 && \
    yum-config-manager --disable ol7_developer_EPEL && \
    yum -y install oracle-instantclient19.3-basiclite nodejs && \
    rm -rf /var/cache/yum

# USER node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install    
COPY . .

# DB Connection


CMD [ "npm", "start" ]

EXPOSE 8080