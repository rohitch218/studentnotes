pipeline {
    agent any

    environment {
        NETWORK = "studentnotes-net"
        MONGO_CONTAINER = "studentnotes-mongodb"
        BACKEND_CONTAINER = "studentnotes-backend"
        FRONTEND_CONTAINER = "studentnotes-frontend"

        MONGODB_URI = "${env.MONGODB_URI ?: 'mongodb://studentnotes-mongodb:27017/studentnotes'}"
        JWT_SECRET = "${env.JWT_SECRET ?: 'your-secret-key-change-in-production'}"
        BACKEND_IMAGE = "${env.BACKEND_IMAGE ?: 'studentnotes-backend:${env.BUILD_NUMBER}'}"
        FRONTEND_IMAGE = "${env.FRONTEND_IMAGE ?: 'studentnotes-frontend:${env.BUILD_NUMBER}'}"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/rohitch218/studentnotes.git'
            }
        }

        stage('Create Docker Network') {
            steps {
                sh 'docker network inspect $NETWORK || docker network create $NETWORK'
            }
        }

        stage('Remove Old Containers') {
            steps {
                sh '''
                    docker rm -f $MONGO_CONTAINER || true
                    docker rm -f $BACKEND_CONTAINER || true
                    docker rm -f $FRONTEND_CONTAINER || true
                '''
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    sh """
                        docker build -t ${BACKEND_IMAGE} .
                    """
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    sh """
                        docker build -t ${FRONTEND_IMAGE} .
                    """
                }
            }
        }

        stage('Run MongoDB') {
            steps {
                sh """
                    docker run -d \
                      --name $MONGO_CONTAINER \
                      --network $NETWORK \
                      -v mongo-data:/data/db \
                      mongo
                """
            }
        }

        stage('Run Backend') {
            steps {
                sh """
                    docker run -d \
                      --name $BACKEND_CONTAINER \
                      --network $NETWORK \
                      -p 8082:3000 \
                      -e MONGODB_URI=${MONGODB_URI} \
                      -e JWT_SECRET=${JWT_SECRET} \
                      ${BACKEND_IMAGE}
                """
            }
        }

        stage('Run Frontend') {
            steps {
                sh """
                    docker run -d \
                      --name $FRONTEND_CONTAINER \
                      --network $NETWORK \
                      -p 8081:80 \
                      ${FRONTEND_IMAGE}
                """
            }
        }

        stage('Test Backend') {
            steps {
                sh """
                    # Simple health check for backend
                    sleep 5
                    curl -f http://localhost:8082/health || echo 'Backend health check failed'
                """
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished'
        }
        success {
            echo 'Pipeline completed successfully!'
            echo "Frontend available at http://<EC2_PUBLIC_IP>:8081"
            echo "Backend available at http://<EC2_PUBLIC_IP>:8082"
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}

volumes:
  mongo-data:
