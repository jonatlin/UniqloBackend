# UniqloBackend
## Description
🚧 🚧 🚧 🚧 Work in progress, some parts may not be reproducible 🚧 🚧 🚧 🚧

This is a NodeJS backend for a Uniqlo concept app. It provides product information from an Oracle Autonomous Database.

Technology Used:\
Android\
NodeJS\
Oracle Cloud Infrastructure\
Oracle Object Storage\
Oracle Autonomous Transaction Processing

Frontend: https://github.com/jkailin/UniqloAndroidApp

Might be hosted here: http://150.136.152.167:8000/

Endpoints:
- /
- /getAllProducts

## Prerequisites
1. Environment running Docker (Docker Desktop works).
2. Oracle Autonomous Database Instance

Note: Oracle Cloud Free Tier includes always free OCI and ADB instances: https://www.oracle.com/cloud/free/

## Installation Instructions
### Backend Setup:
1. Install docker on host (Ex: OCI): https://docs.docker.com/v17.09/engine/installation/#cloud
2. Clone project to host: `git clone https://github.com/jkailin/UniqloBackend.git`
3. Download the wallet for your Autonomous Database: https://docs.oracle.com/en/cloud/paas/autonomous-data-warehouse-cloud/user/connect-download-wallet.html#GUID-B06202D2-0597-41AA-9481-3B174F75D4B1
4. Open the sqlnet.ora file in the wallet, find directory path, and change it to $TNS_ADMIN. It should look like: `DIRECTORY=$TNS_ADMIN`.
5. Move wallet to root of project folder in host environment. For example if using OCI: `scp -i <private_key> <wallet> opc@<public-ip-address>:/home/opc/UniqloBackend`
6. Create a .env file at project root and add database credentials. See .env.example for necessary additions.
7. Build image: `docker image build -t uniqlo .`
8. Run image: `docker container run --publish 8000:8080 --detach --rm --name uniqlo uniqlo`

### DB Setup
TBD. Will add SQL files later.