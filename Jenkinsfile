pipeline {
    agent any
    
    environment {
        // Set these in Jenkins job configuration or use default values
        DOCKER_REGISTRY = "${env.DOCKER_REGISTRY ?: 'localhost:5000'}"
        MONGODB_URI = "${env.MONGODB_URI ?: 'mongodb://localhost:27017/student-notes'}"
        JWT_SECRET = "${env.JWT_SECRET ?: 'your-secret-key-change-in-production'}"
        BACKEND_IMAGE = "${env.DOCKER_REGISTRY ?: 'localhost:5000'}/student-notes-backend:${env.BUILD_NUMBER}"
        FRONTEND_IMAGE = "${env.DOCKER_REGISTRY ?: 'localhost:5000'}/student-notes-frontend:${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Backend Docker Image') {
            steps {
                script {
                    dir('backend') {
                        sh """
                            docker build -t ${BACKEND_IMAGE} .
                            docker tag ${BACKEND_IMAGE} ${DOCKER_REGISTRY}/student-notes-backend:latest
                        """
                    }
                }
            }
        }
        
        stage('Build Frontend Docker Image') {
            steps {
                script {
                    dir('frontend') {
                        sh """
                            docker build -t ${FRONTEND_IMAGE} .
                            docker tag ${FRONTEND_IMAGE} ${DOCKER_REGISTRY}/student-notes-frontend:latest
                        """
                    }
                }
            }
        }
        
        stage('Push Docker Images') {
            steps {
                script {
                    sh """
                        docker push ${BACKEND_IMAGE} || echo 'Docker registry not configured, skipping push'
                        docker push ${FRONTEND_IMAGE} || echo 'Docker registry not configured, skipping push'
                        docker push ${DOCKER_REGISTRY}/student-notes-backend:latest || echo 'Docker registry not configured, skipping push'
                        docker push ${DOCKER_REGISTRY}/student-notes-frontend:latest || echo 'Docker registry not configured, skipping push'
                    """
                }
            }
        }
        
        stage('Test Backend') {
            steps {
                script {
                    dir('backend') {
                        sh """
                            docker run --rm -d --name test-backend -p 3001:3000 \
                                -e MONGODB_URI=${MONGODB_URI} \
                                -e JWT_SECRET=${JWT_SECRET} \
                                ${BACKEND_IMAGE} || true
                            
                            sleep 5
                            
                            # Health check
                            curl -f http://localhost:3001/health || exit 1
                            
                            docker stop test-backend || true
                        """
                    }
                }
            }
        }
    }
    
    post {
        always {
            sh """
                docker stop test-backend || true
                docker rm test-backend || true
            """
        }
        success {
            echo 'Pipeline completed successfully!'
            echo "Backend image: ${BACKEND_IMAGE}"
            echo "Frontend image: ${FRONTEND_IMAGE}"
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}

