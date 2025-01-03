# CI/CD Pipeline for Node.js Application

This README explains the structure and approach used to create a CI/CD pipeline for a Node.js application. The pipeline ensures code quality, automates testing, builds Docker images, and deploys the application to a Kubernetes cluster. Additionally, it includes notifications for deployment success or failure.

## Features

### Pull Request Workflow

1. **Feature Branch Merge Check**:
    - When a pull request (PR) is created for merging into the `main` branch, automated tests are triggered.
    - If the tests pass, the merge is completed. If the tests fail, the merge is blocked.

### Main Branch Pipeline

1. **Continuous Integration**:
    - After a successful merge, the CI pipeline pulls the updated code from the `main` branch.
2. **Dockerization**:
    - The application is containerized by building a Docker image.
3. **Docker Hub Push**:
    - The Docker image is pushed to Docker Hub for storage and deployment.
4. **Kubernetes Deployment**:
    - A separate repository contains the Kubernetes configuration files.
    - These files are updated in the pipeline and pushed back to the repository.
    - Kubernetes configuration repository: [Kubernetes Configuration Repository](https://github.com/imrezaulkrm/nodejs-ci-cd-kubernetes.git).
5. **ArgoCD Deployment**:
    - ArgoCD fetches the updated configuration files and deploys the application to the Kubernetes cluster.

## Repository Structure

-   **Node.js Application Repository**:
    -   Contains the Node.js application source code and CI/CD pipeline configuration.
-   **Kubernetes Configuration Repository**:
    -   Contains Kubernetes YAML files required for deployment.

## Steps to Execute

### 1. Setting Up CI/CD

-   **Pull Request Workflow**:
    -   Configured in the `feature-branch.yml` file to trigger tests on PR creation.
    -   Ensures only validated code is merged into the `main` branch.
-   **Main Branch Workflow**:
    -   Configured in the `main-branch.yml` file to perform the following tasks:
        1. Pull the latest code from the `main` branch.
        2. Build and push the Docker image to Docker Hub.
        3. Update Kubernetes YAML files in the separate repository.
        4. Push updated files back to the Kubernetes configuration repository.
        5. Notify ArgoCD to sync and deploy the application.

### 2. Dockerization

-   A `Dockerfile` is used to containerize the Node.js application.
-   The image is tagged and pushed to Docker Hub.

### 3. Kubernetes Deployment

-   YAML files in the [Kubernetes Configuration Repository](https://github.com/imrezaulkrm/nodejs-ci-cd-kubernetes.git) define the deployment specifications.
-   Files are updated programmatically during the CI/CD pipeline execution.
-   ArgoCD syncs the changes and deploys the updated application to the Kubernetes cluster.

## Notifications

-   Notifications are configured to alert the team about deployment success or failure.

## How to Access

-   **GitHub Repository**: [Node.js Application Repository](https://github.com/imrezaulkrm/nodejs-ci-cd.git).
-   **Docker Hub**: Ensure you have access to the Docker Hub repository where images are pushed.
-   **Kubernetes Configuration Repository**: [Kubernetes Configuration Repository](https://github.com/imrezaulkrm/nodejs-ci-cd-kubernetes.git).

## Evaluation Criteria

1. **Correctness**: The pipeline should handle all the described tasks effectively.
2. **Code Quality**: Code should be clean, maintainable, and follow best practices.
