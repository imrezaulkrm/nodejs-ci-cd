pipeline {
    agent any
    environment {
        GIT_CREDENTIALS_ID = 'github' // Replace with your Jenkins Git credentials ID
        FEATURE_BRANCH = 'feature/add-new-app' // Replace with your feature branch name
        MAIN_BRANCH = 'main' // Replace with your main branch name
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
        stage('Init and Install Dependencies') {
            steps {
                script {
                    // Initialize npm and install necessary dependencies
                    sh 'npm init -y'
                    sh 'npm install mocha --save-dev'
                    sh 'npm install express --save'
                    sh 'npm install supertest --save-dev'
                }
            }
        }
        stage('Install Other Dependencies') {
            steps {
                // Install any additional dependencies if required
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    echo 'Running tests...'
                    // Run Mocha with xunit reporter
                    sh 'npm test --reporter xunit > result.xml'
                    echo 'Tests completed.'
                }
            }
        }
        stage('Merge to Main Branch') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                script {
                    // Configure git user and perform merge
                    sh """
                    git config user.name "Md Rezaul Karim" // Replace with your name
                    git config user.email "sayem010ahmed@gmail.com" // Replace with your email
                    git checkout ${MAIN_BRANCH}
                    git pull origin ${MAIN_BRANCH} // Make sure we have the latest main branch
                    git merge ${FEATURE_BRANCH} // Merge feature branch into main
                    git push origin ${MAIN_BRANCH} // Push changes to remote
                    """
                }
            }
        }
    }
    post {
        success {
            // Publish test results after successful tests
            junit 'test-results/result.xml'
            echo 'Tests passed and branch merged successfully!'
        }
        failure {
            echo 'Tests failed. Merge not performed.'
        }
    }
}
