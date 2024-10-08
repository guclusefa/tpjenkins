pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/guclusefa/tpjenkins'
            }
        }
        stage('Build') {
            steps {
                sh 'echo "Build script here"'
            }
        }
        stage('Test') {
            steps {
                sh 'echo "Test script here"'
            }
        }
        stage('Deploy') {
            steps {
                sh 'echo "Deploy script here"'
            }
        }
    }
}
