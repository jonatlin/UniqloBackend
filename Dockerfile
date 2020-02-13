FROM oraclelinux:7-slim

# install node and instant client
RUN  yum -y install oracle-release-el7 oracle-nodejs-release-el7 && \
    yum-config-manager --disable ol7_developer_EPEL && \
    yum -y install oracle-instantclient19.3-basiclite nodejs && \
    rm -rf /var/cache/yum

# Instant client path
ENV PATH=$PATH:/usr/lib/oracle/19.3/client64/bin

# Get node app files
WORKDIR /app
COPY package*.json /app/
COPY .npmrc /app/
RUN npm install    
COPY . /app/

# # Set wallet path
ENV TNS_ADMIN=/app/wallet

EXPOSE 8080

CMD [ "npm", "start" ]

