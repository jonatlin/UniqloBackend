FROM oraclelinux:7-slim

# RUN  yum -y install oracle-release-el7 oracle-nodejs-release-el7 && \
#     yum-config-manager --disable ol7_developer_EPEL && \
#     yum -y install oracle-instantclient19.3-basiclite nodejs && \
#     rm -rf /var/cache/yum

# Instant client path
# ENV PATH=$PATH:/usr/lib/oracle/19.3/client64/bin

RUN  curl -o /etc/yum.repos.d/public-yum-ol7.repo https://yum.oracle.com/public-yum-ol7.repo && \
    yum-config-manager --enable ol7_oracle_instantclient && \
    yum -y install oracle-instantclient18.3-basic oracle-instantclient18.3-devel oracle-instantclient18.3-sqlplus && \
    rm -rf /var/cache/yum && \
    echo /usr/lib/oracle/18.3/client64/lib > /etc/ld.so.conf.d/oracle-instantclient18.3.conf && \
    ldconfig
RUN yum -y install gcc-c++ make
RUN curl -sL https://rpm.nodesource.com/setup_8.x | bash -
RUN yum install -y nodejs

ENV PATH=$PATH:/usr/lib/oracle/18.3/client64/bin

WORKDIR /app
COPY . /app/
ENV TNS_ADMIN=/app/wallet
EXPOSE 8080
RUN npm install

# Get node app files
# WORKDIR /app
# COPY package*.json /app/
# RUN npm install    
# COPY . /app/

# # Set wallet path
# ENV TNS_ADMIN=/app/wallet

# EXPOSE 8080

CMD [ "npm", "start" ]

