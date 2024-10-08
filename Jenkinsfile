pipeline {
    agent any
    stages {
        stage('Install Node') {
            steps {
                sh 'nvm install 16'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}
