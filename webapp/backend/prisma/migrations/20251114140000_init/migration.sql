-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "theme" TEXT NOT NULL DEFAULT 'bob',
    "onlineMode" BOOLEAN NOT NULL DEFAULT true,
    "customRangeDDFMin" INTEGER NOT NULL DEFAULT 1,
    "customRangeDDFMax" INTEGER NOT NULL DEFAULT 228,
    "customRangeDieDreiMin" INTEGER NOT NULL DEFAULT 1,
    "customRangeDieDreiMax" INTEGER NOT NULL DEFAULT 8,
    "customRangeKidsMin" INTEGER NOT NULL DEFAULT 1,
    "customRangeKidsMax" INTEGER NOT NULL DEFAULT 96,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilteredEpisode" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "episodeNummer" TEXT NOT NULL,
    "episodeType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FilteredEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FilteredEpisode_userId_episodeNummer_episodeType_key" ON "FilteredEpisode"("userId", "episodeNummer", "episodeType");

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilteredEpisode" ADD CONSTRAINT "FilteredEpisode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
