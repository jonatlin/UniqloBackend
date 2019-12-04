# UniqloBackend
🚧 🚧 🚧 🚧 Work in progress, not reproducable on other machines 🚧 🚧 🚧 🚧
This is a NodeJS backend for a Uniqlo concept app. It provides product information from an Oracle Autonomous Database.

## Prerequisites
1. Environment to run Docker (Docker Desktop works).
2. Oracle Autonomous Database Instance

Note: Oracle Cloud Free Tier includes always free OCI and ADB instances: https://www.oracle.com/cloud/free/

## Installation Instructions
### Backend Setup:
1. Install docker on host environment: https://docs.docker.com/v17.09/engine/installation/#cloud
2. pull code: `git clone https://github.com/jkailin/UniqloBackend.git`
3. Download the Autonomous Database wallet: https://docs.oracle.com/en/cloud/paas/autonomous-data-warehouse-cloud/user/connect-download-wallet.html#GUID-B06202D2-0597-41AA-9481-3B174F75D4B1
4. Copy wallet to root of project folder in host environment. For example if using OCI: `scp -i <private_key> <wallet> opc@<public-ip-address>:/home/opc/UniqloBackend`
4. Open the sqlnet.ora file in the wallet and change directory path to TNS_ADMIN. It should look like: DIRECTORY=$TNS_ADMIN.
5. For DB credentials, create .env file at project root and add credentials. See .env.example
6. Build image: `docker image build -t uniqlo .`
7. Run image: `docker container run --publish 8000:8080 --detach --rm --name uniqlo uniqlo`

### DB Setup
TBD. Will add SQL files later.