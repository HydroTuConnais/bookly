/*
const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SECRET_KEY = process.env.TOKEN_SECRET; 

app.use(express.json());

// Mise à jour du middleware d'authentification
const authenticate = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Non authentifié' });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const payload = jwt.verify(token, SECRET_KEY);
      req.userId = payload.userId;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Token invalide ou expiré' });
    }
};

// Endpoint pour s'inscrire
app.post('/auth/register', async (req: any, res: any) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ error: 'Utilisateur déjà existant' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const user = await prisma.user.create({
        data: { email, password: hashedPassword, },
    });

    res.status(201).json({ message: 'Inscription réussie', userId: user.id });
});

// Endpoint pour se connecter
app.post('/auth/login', async (req: any, res: any) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(404).json({ error: 'Utilisateur introuvable' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    // Générer un token JWT
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
});

// Route pour vérifier la validité du token
app.get('/auth/check', authenticate, (req: any, res: any) => {
    res.json({ isAuthenticated: true });
});

  
// Endpoint pour créer un document 🟢
app.put('/api/documents', async (req: any, res: any) => {
    const { title, parentDocumentId, userId } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Titre requis' });
    }

    if (!userId) {
        return res.status(401).json({ error: 'Utilisateur id pas définie' });
    }
    
    try {
        const document = await prisma.document.create({
            data: {
                title,
                parentDocumentId,
                userId,
                isArchived: false,
                isPublished: false,
            },
        });
        res.json(document);
    } catch (error) {
        console.log(error); 
        res.status(500).json({ error: 'Erreur lors de la création du document' });
    }
});

// Endpoint pour supprimer un document 🟢
app.delete('/documents/:id', async (req: any, res: any) => {
    const id = req.params.id;
    const userId = req.headers.userid;
    
    try {
        const document = await prisma.document.findUnique({ where: { id } });
  
        if (!document) {
        return res.status(404).json({ error: 'Not found' });
        }

        if (document.userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized' });
        }
    
        await prisma.document.delete({ where: { id } });
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erreur lors de la suppression du document' });
    }
});

// Endpoint pour archiver un document 🟢
app.post('/documents/:id/archive', async (req: any, res: any) => {
  const id = req.params.id;
  const userId = req.headers.userid;

  try {
    const document = await prisma.document.findUnique({ where: { id } });

    if (!document) {
        return res.status(404).json({ error: 'Not found' });
    }

    if (document.userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    const recursiveArchive = async (documentId: string) => {
        console.log(documentId);
        try {
            const children = await prisma.document.findMany({
                where: { userId, parentDocument: documentId },
                });
                
                if(children.length === 0) {
                    for (const child of children) {
                    await prisma.document.update({
                        where: { id: child.id },
                        data: { isArchived: true },
                    });
                    await recursiveArchive(child.id);
                    }
                }
        } catch (error) {
            console.log(error);
        }
    };

    await prisma.document.update({ where: { id }, data: { isArchived: true } });
    await recursiveArchive(id);

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erreur lors de l\'archivage du document' });
  }
});

// Endpoint pour obtenir les documents de la sidebar
app.get('/documents/sidebar', async (req: any, res: any) => {
  const parentDocument = req.query.parentDocument;
  const userId = req.headers.userid;

  try {
    const documents = await prisma.document.findMany({
        where: { userId, parentDocumentId: parentDocument || null, isArchived: false },
        orderBy: { createdAt: 'desc' },
      });
    
      res.json(documents);
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des documents' });
  }
});

// Endpoint pour obtenir les documents archivés
app.get('/documents/trash', async (req: any, res: any) => {
    const userId = req.headers.userid;
    try {
        const documents = await prisma.document.findMany({
            where: { userId, isArchived: true },
            orderBy: { createdAt: 'desc' },
          });
        
          res.json(documents);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des documents archivés' });
    }
  
});

// Endpoint pour restaurer un document
app.post('/documents/:id/restore', async (req: any, res: any) => {
  const id = req.params.id;
  const userId = req.headers.userid;

    try {
        const document = await prisma.document.findUnique({ where: { id } });

        if (!document) {
            return res.status(404).json({ error: 'Not found' });
        }

        console.log(document.userId)
        if (document.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const recursiveRestore = async (documentId: any) => {
            const children = await prisma.document.findMany({
            where: { userId, parentDocumentId: documentId },
            });

            for (const child of children) {
            await prisma.document.update({
                where: { id: child.id },
                data: { isArchived: false },
            });
            await recursiveRestore(child.id);
            }
        };

        const updatedData: { isArchived: boolean; parentDocumentId?: string | null } = { isArchived: false };
        if (document.parentDocumentId) {
            const parent = await prisma.document.findUnique({
            where: { id: document.parentDocumentId },
            });
            if (parent?.isArchived) {
            updatedData.parentDocumentId = null;
            }
        }

        await prisma.document.update({ where: { id }, data: updatedData });
        await recursiveRestore(id);

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erreur lors de la restauration du document' });
    }
});

// Serveur Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

*/
