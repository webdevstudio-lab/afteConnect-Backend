-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP NOT NULL,
    "isActivate" BOOLEAN NOT NULL DEFAULT false,
    "email" VARCHAR(255) NOT NULL,
    "fullname" VARCHAR(30) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "poste" VARCHAR(255) NOT NULL,
    "lastLogin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "passUpdateAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userAgent" VARCHAR(255),
    "expiresAt" TIMESTAMP NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
