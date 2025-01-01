import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DocumentService } from '@/services/documentsService';
import { useAuth } from './useAuth';

interface Document {
    id: string;
    title: string;
    parentDocumentId: string | null;
    archived: boolean;
    icon: string;
}

interface DocumentContextProps {
    loading: boolean;
    error: string | null;
    
    documents: any[];
    setDocuments: any;
    
    favorites: any[];
    setFavorites: any;
    
    getDocuments: (params: { documentId: string }) => Promise<void>;
    createDocument: (params: { title: string, parentDocumentId: string | null }) => Promise<void>;
    getDocument: (params: { id: string }) => Promise<void>;
    updateDocument: (params: { id: string, title: string, content: string }) => Promise<void>;
    deleteDocument: (params: { documentId: string }) => Promise<void>;

    getSidebarDocuments: (params: { parentDocumentId: string | null }) => Promise<any[]>;

    getArchivedDocuments: () => Promise<any[]>;
    archiveDocument: (params: { id: string }) => Promise<void>;
    restoreDocument: (params: { id: string }) => Promise<void>;

    getSidebarFavoriteDocuments: (params: { parentFavoriteId: string | null, isChild: boolean }) => Promise<any[]>;
    getSidebarCountFavoriteDocuments : () => Promise<number>;

    favoriteDocument: (params: { documentId: string }) => Promise<void>;
    unfavoriteDocument: (params: { documentId: string }) => Promise<void>;

    shareDocument: (params: { id: string, sharedEmail: string }) => Promise<void>;
    //getSharedDocuments: () => Promise<void>;
    searchDocuments: (searchTerm: string) => Promise<any[]>;
}

const DocumentContext = createContext<DocumentContextProps | undefined>(undefined);

export const DocumentProvider = ({ children }: { children: React.ReactNode }) => {
    const { token, user } = useAuth();
    const [documents, setDocuments] = useState<any[]>([]);
    const [favorites, setFavorites] = useState<any[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getDocuments = async ({ documentId }: { documentId: string }) => {
        if (token && user) {
            setLoading(true);
            setError(null);
            try {
                const fetchedDocuments = await DocumentService.getDocument({ token, id: documentId });
                return fetchedDocuments;
            } catch (err: any) {
                setError('Failed to fetch documents');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    };

    const createDocument = async ({ title, parentDocumentId }: { title: string, parentDocumentId: string | null }) => {
        if (token && user) {
            setError(null);
            try {
                const document = await DocumentService.createDocument({ token, userid: user.id, title, parentDocumentId });
                console.log(document);
                setDocuments(prevDocs => [...prevDocs, document]);
                return document;
            } catch (err: any) {
                setError('Failed to create document');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    };

    const getDocument = async ({ id }: { id: string }) => {
        if (token && user) {
            setLoading(true);
            setError(null);
            try {
                const document = await DocumentService.getDocument({ token: token, id: id });
            } catch (err: any) {
                setError('Failed to fetch document');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    };

    const updateDocument = async ({ id, title, content }: { id: string, title: string, content: string }) => {
        if (token && user) {
            setLoading(true);
            setError(null); // Reset error state
            try {
                await DocumentService.updateDocument({ token: token, id: id, title: title, content: content });
            } catch (err: any) {
                setError('Failed to update document');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    };

    const deleteDocument = async ({ documentId }: { documentId: string }) => {
        if (token && user) {
            setError(null); // Reset error state
            try {
                const documents = await DocumentService.deleteDocument({ token, userid: user.id, id: documentId });
                return documents;
            } catch (err: any) {
                setError('Failed to delete document');
                console.error(err);
            }
        }
    };

    /*--------------------------------------------------------------*/

    const getSidebarDocuments = async ({ parentDocumentId }: { parentDocumentId: string | null }) => {
        if (token && user) {
            setError(null); // Reset error state
            try {
                const sidebarDocuments = await DocumentService.getSidebarDocuments({ token, userid: user.id, parentDocumentId });
                return sidebarDocuments;
            } catch (err: any) {
                setError('Failed to fetch sidebar documents');
                console.error(err);
                return [];
            }
        }
        return [];
    };

    /*--------------------------------------------------------------*/

    const getArchivedDocuments = async () => {
        if (token && user) {
            setError(null); // Reset error state
            try {
                const archivedDocuments = await DocumentService.getArchivedDocuments({ token: token });

                return archivedDocuments;
            } catch (err: any) {
                setError('Failed to fetch archived documents');
                console.error(err);
            }
        }
    };

    const archiveDocument = async ({ id }: { id: string }) => {
        if (token && user) {
            setError(null); // Reset error state
            try {
                const document = await DocumentService.archiveDocument({ token: token, userid: user.id, id: id });
                setDocuments(prevDocs => prevDocs.map(doc => doc.id === id ? { ...doc, archived: true } : doc));
                return document;
            } catch (err: any) {
                setError('Failed to archive document');
                console.error(err);
            }
        }
    };

    const restoreDocument = async ({ id }: { id: string }) => {
        if (token && user) {
            setError(null); // Reset error state
            try {
                const document = await DocumentService.restoreDocument({ token: token, userid: user.id, id: id });
                setDocuments(prevDocs => prevDocs.map(doc => doc.id === id ? { ...doc, archived: false } : doc));
                return document;
            } catch (err: any) {
                setError('Failed to restore document');
                console.error(err);
            }
        }
    };

    /*--------------------------------------------------------------*/

    const getSidebarFavoriteDocuments = async ({ parentFavoriteId, isChild}: { parentFavoriteId: string | null, isChild: boolean}) => {
        console.log("getSidebarFavoriteDocuments", parentFavoriteId);
        if (token && user) {
            setError(null); // Reset error state
            try {
                const favoriteDocuments = await DocumentService.getSidebarFavoriteDocuments({ token, userid: user.id, parentFavoriteId, isChild});
                return favoriteDocuments;
            } catch (err: any) {
                setError('Failed to fetch favorite documents');
                console.error(err);
            }
        }
    };

    const getSidebarCountFavoriteDocuments = async () => {
        if (token && user) {
            setError(null); // Reset error state
            try {
                const favoriteDocuments = await DocumentService.getSidebarCountFavoriteDocuments({ token, userid: user.id });
                return favoriteDocuments;
            } catch (err: any) {
                setError('Failed to fetch favorite documents');
                console.error(err);
            }
        }
    };

    const favoriteDocument = async ({ documentId }: { documentId: string }) => {
        if (token && user) {
            setError(null); // Reset error state
            try {
                const document = await DocumentService.favoriteDocument({ token, userid: user.id, id: documentId });
                setFavorites(prevDocs => prevDocs.map(doc => doc.id === documentId ? { ...doc, favorite: true } : doc));
                return document;
            } catch (err: any) {
                setError('Failed to favorite document');
                console.error(err);
            }
        }
    };

    const unfavoriteDocument = async ({ documentId }: { documentId: string }) => {
        if (token && user) {
            setError(null); // Reset error state
            try {
                const document = await DocumentService.unfavoriteDocument({ token, userid: user.id, id: documentId });
                setFavorites(prevDocs => prevDocs.map(doc => doc.id === documentId ? { ...doc, favorite: false } : doc));
                return document;
            } catch (err: any) {
                setError('Failed to unfavorite document');
                console.error(err);
            }
        }
    };

    /*--------------------------------------------------------------*/

    const shareDocument = async ({ id, sharedEmail }: { id: string, sharedEmail: string }) => {
        if (token && user) {
            setLoading(true);
            setError(null); // Reset error state
            try {
                const sharedDocument = await DocumentService.shareDocument({ token: token, id: id, sharedEmail: sharedEmail });
            } catch (err: any) {
                setError('Failed to share document');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    };

    /*--------------------------------------------------------------*/

    const searchDocuments = async (searchTerm: string) => {
        if (token && user) {
            setError(null); // Reset error state
            try {
                const documents = await DocumentService.searchDocuments({ token: token, userid: user.id, search: searchTerm });
                return documents;
            } catch (err: any) {
                setError('Failed to search documents');
                console.error(err);
            }
        }
    };

    return (
        <DocumentContext.Provider
            value={{
                documents,
                setDocuments,
                favorites,
                setFavorites,
                loading,
                error,
                getDocuments,
                createDocument,
                getDocument,
                updateDocument,
                deleteDocument,
                getSidebarDocuments,
                getArchivedDocuments,
                shareDocument,
                archiveDocument,
                restoreDocument,
                getSidebarFavoriteDocuments,
                getSidebarCountFavoriteDocuments,
                favoriteDocument,
                unfavoriteDocument,
                searchDocuments
            }}
        >
            {children}
        </DocumentContext.Provider>
    );
};

export const useDocuments = () => {
    const context = useContext(DocumentContext);
    if (context === undefined) {
        throw new Error('useDocuments must be used within a DocumentProvider');
    }
    return context;
};