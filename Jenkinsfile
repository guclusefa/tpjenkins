pipeline {
    agent any
    stages {
        stage('Install Node') {
            steps {
                sh 'curl -sL https://deb.nodesource.com/setup_16.x | bash -'
                sh 'apt-get install -y nodejs'
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
