"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronProsess = void 0;
const cron = require("node-cron");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.cronProsess = {
    startJobCron: () => {
        cron.schedule("* */10 * * *", async () => {
            console.log("Vérification des mail `Recover` démarrée à :", new Date());
            try {
                // Calculer la date limite (10 minutes avant l'heure actuelle)
                const tenMinutesAgo = new Date(new Date().getTime() - 10 * 60 * 1000);
                // Récupérer toutes les entrées
                const allRecords = await prisma.recover.findMany();
                // Récupérer les entrées à supprimer
                const recordsToDelete = await prisma.recover.findMany({
                    where: {
                        createdAt: {
                            lt: tenMinutesAgo,
                        },
                    },
                });
                // Supprimer les entrées
                const result = await prisma.recover.deleteMany({
                    where: {
                        createdAt: {
                            lt: tenMinutesAgo,
                        },
                    },
                });
                console.log(`Total: ${result.count} entrées supprimées.`);
            }
            catch (error) {
                console.error("Erreur dans le cron :", error);
            }
        });
    },
};
//# sourceMappingURL=cron.js.map