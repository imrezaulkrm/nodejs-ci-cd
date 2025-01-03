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
                    // Stash any uncommitted changes (to avoid losing them)
                    sh 'git stash'

                    // Fetch all branches explicitly
                    sh 'git fetch --all'

                    // Check out the main branch and ensure it's tracking the remote main branch
                    sh 'git checkout ${MAIN_BRANCH}'

                    // Ensure we have the latest version of the feature branch from the remote
                    sh 'git fetch origin ${FEATURE_BRANCH}:${FEATURE_BRANCH}'

                    // Now try to merge the feature branch from remote
                    def mergeStatus = sh(script: 'git merge origin/${FEATURE_BRANCH}', returnStatus: true)

                    if (mergeStatus != 0) {
                        echo "Merge failed due to conflicts. Please resolve conflicts manually."
                        currentBuild.result = 'FAILURE'
                        return
                    }

                    // Push the merged changes to the remote main branch
                    sh 'git push origin ${MAIN_BRANCH}'

                    // Apply the stashed changes back, if needed
                    sh 'git stash pop'
                }
            }
        }
    }
    post {
        success {
            echo 'Tests passed and branch merged successfully!'
        }
        failure {
            echo 'Tests failed or merge conflicts occurred. Merge not performed.'
        }
    }
}
