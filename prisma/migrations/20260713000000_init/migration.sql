-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUPER_ADMIN');
CREATE TYPE "ContactStatus" AS ENUM ('NEW', 'READ', 'RESPONDED', 'ARCHIVED');

CREATE TABLE "User" ("id" TEXT NOT NULL, "name" TEXT NOT NULL, "email" TEXT NOT NULL, "passwordHash" TEXT NOT NULL, "role" "Role" NOT NULL DEFAULT 'ADMIN', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "User_pkey" PRIMARY KEY ("id"));
CREATE TABLE "Service" ("id" TEXT NOT NULL, "title" TEXT NOT NULL, "slug" TEXT NOT NULL, "description" TEXT NOT NULL, "icon" TEXT NOT NULL, "order" INTEGER NOT NULL DEFAULT 0, "isActive" BOOLEAN NOT NULL DEFAULT true, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "Service_pkey" PRIMARY KEY ("id"));
CREATE TABLE "Project" ("id" TEXT NOT NULL, "title" TEXT NOT NULL, "slug" TEXT NOT NULL, "category" TEXT NOT NULL, "description" TEXT NOT NULL, "content" TEXT, "isFeatured" BOOLEAN NOT NULL DEFAULT false, "isActive" BOOLEAN NOT NULL DEFAULT true, "completedAt" TIMESTAMP(3), "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "Project_pkey" PRIMARY KEY ("id"));
CREATE TABLE "ProjectImage" ("id" TEXT NOT NULL, "url" TEXT NOT NULL, "alt" TEXT, "order" INTEGER NOT NULL DEFAULT 0, "projectId" TEXT NOT NULL, CONSTRAINT "ProjectImage_pkey" PRIMARY KEY ("id"));
CREATE TABLE "Testimonial" ("id" TEXT NOT NULL, "name" TEXT NOT NULL, "role" TEXT, "content" TEXT NOT NULL, "rating" INTEGER NOT NULL DEFAULT 5, "avatar" TEXT, "isActive" BOOLEAN NOT NULL DEFAULT true, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id"));
CREATE TABLE "ContactSubmission" ("id" TEXT NOT NULL, "name" TEXT NOT NULL, "email" TEXT NOT NULL, "phone" TEXT, "service" TEXT, "message" TEXT NOT NULL, "status" "ContactStatus" NOT NULL DEFAULT 'NEW', "notes" TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id"));
CREATE TABLE "Subscriber" ("id" TEXT NOT NULL, "email" TEXT NOT NULL, "isActive" BOOLEAN NOT NULL DEFAULT true, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id"));
CREATE TABLE "SiteSetting" ("id" TEXT NOT NULL, "key" TEXT NOT NULL, "value" TEXT NOT NULL, CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id"));
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
CREATE UNIQUE INDEX "Subscriber_email_key" ON "Subscriber"("email");
CREATE UNIQUE INDEX "SiteSetting_key_key" ON "SiteSetting"("key");
ALTER TABLE "ProjectImage" ADD CONSTRAINT "ProjectImage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
