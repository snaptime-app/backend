#!/bin/sh
npx prisma migrate deploy
npx prisma generate
node ./build/server.js
