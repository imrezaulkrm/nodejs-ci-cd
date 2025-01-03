pipeline {
    agent any
    environment {
        GIT_CREDENTIALS_ID = 'github' // Replace with your Jenkins Git credentials ID
        FEATURE_BRANCH = 'feature/add-new-app' // Replace with your feature branch name
        MAIN_BRANCH = 'main'       // Replace with your main branch name
    }
    stages {
        stage('Checkout Code') {
            steps {
                script {
                    checkout([$class: 'GitSCM', 
                            branches: [[name: "*/${FEATURE_BRANCH}"]],
                            doGenerateSubmoduleConfigurations: false,
                            extensions: [[$class: 'CleanBeforeCheckout']], // Ensures a clean workspace
                            userRemoteConfigs: [[
                                url: 'https://github.com/imrezaulkrm/nodejs-ci-cd.git',
                                credentialsId: "${GIT_CREDENTIALS_ID}"
                            ]]
                    ])
                }
            }
        }
        stage('Init application') {
            steps {
                sh 'npm init -y'
                sh 'npm install express --save'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Merge to Main Branch') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                script {
                    sh """
                    git config user.name "Md Rezaul Karim" // Replace with your name
                    git config user.email "sayem010ahmed@gmail.com" // Replace with your email
                    git checkout ${MAIN_BRANCH}
                    git merge ${FEATURE_BRANCH}
                    git push origin ${MAIN_BRANCH}
                    """
                }
            }
        }
    }
    post {
        success {
            echo 'Tests passed and branch merged successfully!'
        }
        failure {
            echo 'Tests failed. Merge not performed.'
        }
    }
}
