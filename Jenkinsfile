pipeline {
    agent any
    environment {
        NVM_DIR = "${env.HOME}/.nvm"
    }
    stages {
        stage('Install Node') {
            steps {
                sh 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash'
                sh '. ~/.nvm/nvm.sh && nvm install 16 && nvm alias default 16 && nvm use 16'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh '. ~/.nvm/nvm.sh && npm install'
            }
        }
        stage('Lint and Test') {
            steps {
                sh '. ~/.nvm/nvm.sh && npm run lint'
                sh '. ~/.nvm/nvm.sh && npm test -- --coverage'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                sh 'sonar-scanner'
            }
        }
    }
    post {
        always {
            junit '**/reports/junit/*.xml'
            archiveArtifacts allowEmptyArchive: true, artifacts: '**/coverage/**'
        }
    }
}
