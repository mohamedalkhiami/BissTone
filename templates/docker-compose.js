module.exports = ({ imagename, webPort, dbPass, addAdminer, adminerPort }) => {
  imagename = imagename || "kubify-task-fiverr"
  webPort = webPort - 0 || 80;
  dbPass = dbPass || "root"
  addAdminer = addAdminer.toLowerCase() === 'yes'
  adminerPort = adminerPort - 0 || 8080;
  return `
version: '3.1'

services:
  web:
    image: ${imagename}
    restart: always
    ports:
      - ${webPort}:80 
  db:
    image: mariadb
    restart: always
    ports:
      - 3306:3306 
    environment:
      MYSQL_ROOT_PASSWORD: ${dbPass}
  ${addAdminer ? `adminer:
    image: adminer
    restart: always
    ports:
      - ${adminerPort}:8080` : ''}
`
}