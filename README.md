# kubify-task-fiverr
- [kubify-task-fiverr](#kubify-task-fiverr)
  - [install Dependencies](#install-dependencies)
    - [install NodeJS](#install-nodejs)
    - [install Docker](#install-docker)
    - [install npm packages](#install-npm-packages)
  - [Deployment](#deployment)
    - [Build](#build)
    - [Deploy](#deploy)

## install Dependencies
### install NodeJS
```bash
# for installing nodejs use Sode Source
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs

# Using Debian, as root
curl -sL https://deb.nodesource.com/setup_10.x | bash -
apt-get install -y nodejs
```
### install Docker
```bash
curl https://gist.githubusercontent.com/ghulamMustafaRaza/fb9020e7a773ac12cd23aec9aa205533/raw/setupDocker_dockerCompose.sh | bash
```
### install npm packages
for installing npm packages run this command in project directory.
```bash
npm install
```
## Deployment
Deployment is two step process includes building images and push. 
### Build
for building run this command in project directory.
```bash
npm run task build
```
### Deploy
for deploying run this command in project directory.
```bash
npm run task deploy
```