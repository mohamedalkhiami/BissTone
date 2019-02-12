module.exports = ({ imagename, webPort, nextCloudPort, dbPass, addAdminer, adminerPort }) => {
  imagename = imagename || "kubify-task"
  nextCloudPort = nextCloudPort - 0 || 3000;
  webPort = webPort - 0 || 80;
  dbPass = dbPass || "root"
  addAdminer = addAdminer.toLowerCase() === 'yes'
  adminerPort = adminerPort - 0 || 8080;
  return `
version: '3.1'
volumes:
  nextcloud:
  db:
services:
  web:
    image: ${imagename}
    restart: always
    ports:
      - ${webPort}:80 
  db:
    image: mariadb
    restart: always
    volumes:
      - db:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: ${dbPass}
  app:
    image: nextcloud:latest
    ports:
      - ${nextCloudPort}:80
    depends_on:
      - db
    volumes:
      - nextcloud:/var/www/html
    environment:
      - NEXTCLOUD_ADMIN_USER=root
      - NEXTCLOUD_ADMIN_PASSWORD=root
      - MYSQL_USER=root
      - MYSQL_PASSWORD=root
      - MYSQL_HOST=db
    restart: unless-stopped
  ${addAdminer ? `adminer:
    image: adminer
    restart: always
    ports:
      - ${adminerPort}:8080` : ''}
`
}
