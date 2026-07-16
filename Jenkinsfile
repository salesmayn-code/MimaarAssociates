pipeline {
    agent any
    tools {
        nodejs 'Node20'
    }

    environment {
        DATABASE_URL     = credentials('database-url')
        NEXTAUTH_SECRET  = credentials('nextauth-secret')
        DEPLOY_DIR       = '/var/www/mimaar'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install pnpm') {
            steps {
                sh 'npm install -g pnpm'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'pnpm install --frozen-lockfile'
            }
        }

        stage('Lint') {
            steps {
                sh 'pnpm lint || true'
            }
        }

        stage('Test') {
            steps {
                sh 'pnpm test'
            }
        }

        stage('Prisma Generate + Migrate') {
            steps {
                sh 'pnpm exec prisma generate'
                sh 'pnpm exec prisma migrate deploy'
            }
        }

        stage('Build') {
            steps {
                sh 'pnpm build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                cat > $DEPLOY_DIR/.env << ENVEOF
                    DATABASE_URL=${DATABASE_URL}
                    NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
                ENVEOF
                    rsync -a --delete --exclude=".git" --exclude="node_modules" ./ $DEPLOY_DIR/
                    cd $DEPLOY_DIR
                    pnpm install --frozen-lockfile --prod
                    pm2 restart mimaar-app || pm2 start pnpm --name mimaar-app -- start
                    pm2 save
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployed successfully.'
        }
        failure {
            echo 'Pipeline failed — check the stage logs above.'
        }
    }
}