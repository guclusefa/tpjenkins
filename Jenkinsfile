pipeline {
    agent any
    stages {
        stage('Install Node') {
            steps {
                sh 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash'
                sh '. ~/.nvm/nvm.sh && nvm install 16 && nvm use 16'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh '. ~/.nvm/nvm.sh && npm install'
            }
        }
        stage('Test') {
            steps {
                sh '. ~/.nvm/nvm.sh && npm test'
            }
        }
    }
}
