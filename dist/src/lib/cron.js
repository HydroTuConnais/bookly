"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronProsess = void 0;
const cron = require("node-cron");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.cronProsess = {
    startJobCron: () => {
        cron.schedule("* */10 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("Vérification des mail `Recover` démarrée à :", new Date());
            try {
                // Calculer la date limite (10 minutes avant l'heure actuelle)
                const tenMinutesAgo = new Date(new Date().getTime() - 10 * 60 * 1000);
                // Récupérer toutes les entrées
                const allRecords = yield prisma.recover.findMany();
                // Récupérer les entrées à supprimer
                const recordsToDelete = yield prisma.recover.findMany({
                    where: {
                        createdAt: {
                            lt: tenMinutesAgo,
                        },
                    },
                });
                // Supprimer les entrées
                const result = yield prisma.recover.deleteMany({
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
        }));
    },
};
//# sourceMappingURL=cron.js.map