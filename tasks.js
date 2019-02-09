const services = new class Services {
    constructor() {
        this.readline = require('readline');
        this.fs = require('fs');
        this.os = require('os');
        this.path = require('path');
        this.exec = require('shelljs').exec;
        this.docker_compose_path = this.path.resolve(this.os.tmpdir(), 'kubify_docker_compose.yml')
    }
    prompt(question, defaultValue) {
        const rl = this.readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        return new Promise((res, rej) => rl.question(`${defaultValue ? `${question} (${defaultValue})` : question}: `, (answer) => {
            res(answer || defaultValue)
            rl.close()
        }));
    }
    async build() {
        let imagename = await this.prompt('what is image name?', 'kubify-task-fiverr')
        this.exec(`docker build -t ${imagename} .`)
        return imagename
    }
    async deploy() {
        let imagename = await this.build()
        let webPort = await this.prompt('in which port do you want to listen our web?', '80')
        // let dbPass = await this.prompt('DBpass? please enter if you want to set default, elesewere please type.', 'root')
        let dbPass = 'root';
        let addAdminer = await this.prompt('do you want to add phpMyAdmin (yes/no) ?', 'no')
        let adminerPort;
        if (addAdminer.toLowerCase() === 'yes') {
            adminerPort = await this.prompt('in which port do you want to listen phpMyAdmin ?', '8080')
        }
        let dockerComposeFileMettar = require('./templates/docker-compose')({ imagename, webPort, dbPass, addAdminer, adminerPort });
        this.fs.writeFileSync(this.docker_compose_path, dockerComposeFileMettar, 'utf8');
        this.exec(`docker-compose -f ${this.docker_compose_path} up -d`)
    }
    down() {
        this.exec(`docker-compose -f ${this.docker_compose_path} down`)
    }
    logs() {
        this.exec(`docker-compose -f ${this.docker_compose_path} logs`)
    }
    run(service) {
        this[service]()
    }
}
services.run(process.argv[2])