pipeline {
    agent any
    environment {
        DOCKERHUB_USERNAME = "imrezaulkrm"
        APP_NAME = "test-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
        IMAGE_NAME = "${DOCKERHUB_USERNAME}" + "/" + "${APP_NAME}"
        REGISTRY_CREDS = 'dockerhub'
        }
    stages {
        stage('Cleanup Workspace'){
            steps {
                script {
                    cleanWs()
                }
            }
        }
        stage('source code pull from github') {
            steps {
                git branch: 'main', url: 'https://github.com/imrezaulkrm/nodejs-ci-cd.git'
            }
        }
        stage('Build Docker Image'){
            steps {
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                sh "docker build -t ${IMAGE_NAME}:latest ."
            }
        }
        stage('Push Docker Image'){
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'dpass', usernameVariable: 'dockeruser')]) {
                    sh "docker login -u $dockeruser --password $dpass"
                    sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                    sh "docker push ${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Delete Docker Images'){
            steps {
                sh "docker rmi ${IMAGE_NAME}:${IMAGE_TAG}"
                sh "docker rmi ${IMAGE_NAME}:latest"
                sh "cd .."
            }
        }

        stage('source code pull from github') {
            steps {
                git branch: 'kubernetes', url: 'https://github.com/imrezaulkrm/nodejs-ci-cd.git'
            }
        }

        stage('Updating Kubernetes deployment file') {
            steps {
                sh "git checkout kubernetes"
                sh "cat deployment.yml"
                // Construct the sed command to change only line 17
                sh """sed -i '17s#image:.*#image: ${IMAGE_NAME}:${IMAGE_TAG}#' deployment.yml"""
                sh "cat deployment.yml"
            }
        }

        
        stage('Push the changed deployment file to Git') {
            steps {
                script {
                    sh 'git checkout kubernetes'
                    sh 'git config --global user.name "imrezaulkrm"'
                    sh 'git config --global user.email "sayem010ahmed@gmail.com"'
                    sh 'git add deployment.yml'
                    sh 'git commit -m "Updated the deployment file"'
                    withCredentials([usernamePassword(credentialsId: 'github', passwordVariable: 'gpass', usernameVariable: 'githubuser')]) {
                        sh "git push https://$githubuser:$gpass@github.com/imrezaulkrm/nodejs-ci-cd.git kubernetes"
                    }
                }
            }
        }
    }
}