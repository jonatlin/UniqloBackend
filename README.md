# UniqloBackend
## Description
🚧 🚧 🚧 🚧 Work in progress, some parts may not be reproducible yet 🚧 🚧 🚧 🚧

This is a NodeJS backend for a Uniqlo concept app. It provides product information from an Oracle Autonomous Database.

Technology Used:\
Android\
NodeJS\
Oracle Cloud Infrastructure\
Oracle Object Storage\
Oracle Autonomous Transaction Processing

Frontend: https://github.com/jkailin/UniqloAndroidApp

Host (may be up): http://150.136.152.167:8000/

Endpoints:
- /
- /getAllProducts

## Installation Instructions

### Prerequisites
1. Environment running Docker (Docker Desktop works).
2. Oracle Autonomous Database Instance

Note: Oracle Cloud Free Tier includes always free OCI and ADB instances: https://www.oracle.com/cloud/free/

### Backend Setup:
1. Install docker on host (Ex: OCI): https://docs.docker.com/v17.09/engine/installation/#cloud
2. Clone project to host: `git clone https://github.com/jkailin/UniqloBackend.git`
3. Download the wallet for your Autonomous Database: https://docs.oracle.com/en/cloud/paas/autonomous-data-warehouse-cloud/user/connect-download-wallet.html#GUID-B06202D2-0597-41AA-9481-3B174F75D4B1
4. Move wallet to root of project directory in host environment. For example if using OCI: `scp -i <private_key> <wallet> opc@<public-ip-address>:/home/opc/UniqloBackend`
5. Unzip the wallet contents into a folder named "wallet" in the project root directory.
6. Open the sqlnet.ora file in the "wallet" folder, find variable for directory path, and change it to $TNS_ADMIN. It should look like: `DIRECTORY=$TNS_ADMIN`.
7. Create a file called ".env" in the project root directory and add database settings from [example.env](example.env).
8. Build image: `docker image build -t uniqlo .`
9. Run image: `docker container run --publish 8000:8080 --detach --rm --name uniqlo uniqlo`. Alternatively run [docker_setup.sh](setup/docker_setup.sh) in the "setup" folder.

Example folder structure:
```
UniqloBackend/
├── .env
├── .gitignore
├── Dockerfile
├── README.md
├── app.js
├── controllers
├── example.env
├── package-lock.json
├── package.json
├── services
├── setup
├── views
└── wallet
```

### DB Setup
1. Provision an Oracle Autonomous Database.
2. Use [uniqlo_db.sql](setup/uniqlo_db.sql) in the setup folder to import data to the database. A simple method to do this is to use SQL Developer to execute the file directly on the database.