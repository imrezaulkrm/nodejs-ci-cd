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
                            extensions: [
                                [$class: 'CleanBeforeCheckout'], // Ensures a clean workspace
                                [$class: 'CloneOption', shallow: false] // Ensures fetching all branches
                            ],
                            userRemoteConfigs: [[
                                url: 'https://github.com/imrezaulkrm/nodejs-ci-cd.git',
                                credentialsId: "${GIT_CREDENTIALS_ID}"
                            ]]
                    ])
                    // Ensure all branches are fetched
                    sh 'git fetch --all'
                }
            }
        }
        stage('Init application') {
            steps {
                sh 'npm init -y'
                sh 'npm install mocha --save-dev'
                sh 'npm install express --save'
                sh 'npm install supertest --save-dev'
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
                    // Fetch all branches explicitly
                    sh 'git fetch origin'

                    // Check out the main branch and ensure it's tracking the remote main branch
                    sh 'git checkout -b ${MAIN_BRANCH} origin/${MAIN_BRANCH}'
                    
                    // Merge the feature branch into the main branch
                    sh 'git merge ${FEATURE_BRANCH}'
                    
                    // Push the merged changes to the remote main branch
                    sh 'git push origin ${MAIN_BRANCH}'
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
