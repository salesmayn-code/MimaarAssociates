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
                sh 'pnpm lint'
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
                sh 'printf "DATABASE_URL=%s\\nNEXTAUTH_SECRET=%s\\n" "$DATABASE_URL" "$NEXTAUTH_SECRET" > $DEPLOY_DIR/.env'
                sh 'rsync -a --delete --exclude=".git" --exclude="node_modules" --exclude=".env" ./ $DEPLOY_DIR/'
                sh '''
                    cd $DEPLOY_DIR
                    pnpm install --frozen-lockfile --prod
                    pm2 restart mimaar-app --cwd $DEPLOY_DIR || pm2 start pnpm --name mimaar-app --cwd $DEPLOY_DIR -- start
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