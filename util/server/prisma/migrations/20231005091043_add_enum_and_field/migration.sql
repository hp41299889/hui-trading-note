/*
  Warnings:

  - You are about to drop the column `stopLose` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `takeProfit` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Secret` table. All the data in the column will be lost.
  - Added the required column `orderSide` to the `HistoryOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exchange` to the `Secret` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Exchange" AS ENUM ('BINANCE');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('LIMIT', 'MARKET', 'STOP', 'STOP_MARKET', 'TAKE_PROFIT', 'TAKE_PROFIT_MARKET', 'TRAILING_STOP_MARKET');

-- CreateEnum
CREATE TYPE "OrderSide" AS ENUM ('BUY', 'SELL');

-- AlterTable
ALTER TABLE "HistoryOrder" ADD COLUMN     "orderSide" "OrderSide" NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "stopLose",
DROP COLUMN "takeProfit",
ADD COLUMN     "type" "OrderType" NOT NULL;

-- AlterTable
ALTER TABLE "Secret" DROP COLUMN "type",
ADD COLUMN     "exchange" "Exchange" NOT NULL;
