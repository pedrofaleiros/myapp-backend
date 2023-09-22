-- CreateTable
CREATE TABLE "goals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kcal" DOUBLE PRECISION NOT NULL,
    "carb" DOUBLE PRECISION NOT NULL,
    "prot" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "goals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
