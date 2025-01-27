#!/bin/sh

# Exécuter la migration Prisma
npx prisma migrate deploy --name init
