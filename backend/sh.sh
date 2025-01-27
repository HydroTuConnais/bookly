#!/bin/sh

# Exécuter la migration Prisma
npx prisma migrate dev --name init
