# UniqloBackend
🚧 🚧 🚧 🚧 Work in progress, not reproducable on other machines 🚧 🚧 🚧 🚧
This is a Nodejs backend for a Uniqlo concept app. It provides product information from an Oracle database.

## Installation Instructions
### Backend Setup:
1. Install docker: https://docs.docker.com/v17.09/engine/installation/#cloud
2. pull code: `git clone https://github.com/jkailin/UniqloBackend.git`
3. Copy Autonomous Database wallet to folder: https://docs.oracle.com/en/cloud/paas/autonomous-data-warehouse-cloud/user/connect-download-wallet.html#GUID-B06202D2-0597-41AA-9481-3B174F75D4B1
3. for DB credentials, create .env file and add credentials. See example.env
4. Build image: `docker image build -t uniqlo .`
5. Run image: `docker container run --publish 8000:8080 --detach --name uniqlo uniqlo`

### DB Setup
TBD