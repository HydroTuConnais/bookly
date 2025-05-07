import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DocumentService } from '@/services/documentsService';
import { useAuth } from './useAuth';

export interface Document {
    id: string;
    title?: string;
    userId?: string;

    isArchived?: boolean;
    archivedId?: string | null;

    isFavorite?: boolean;
    parendDocumentId?: string;

    content?: string | null;
    coverImage?: string | null;

    icon?: string | null;
    isPublished?: boolean;
    urlPublished?: string;

    createdAt?: string;
    updatedAt?: string;
}

interface DocumentContextProps {
    error: string | null;

    documents: Document[];
    setDocuments: any;

    favorites: Document[];
    setFavorites: any;

    createDocument: (params: { title: string, parentDocumentId: string | null }) => Promise<Document>;
    getDocument: (params: { id: string }) => Promise<Document>;
    getAllDocuments: () => Promise<Document[]>;
    updateDocument: (params: { id: string, title?: string, content?: string, icon?: string, coverImage?: string, isPublished?: boolean }) => Promise<Document>;
    deleteDocument: (params: { documentId: string }) => Promise<void>;

    getSidebarDocuments: (params: { parentDocumentId: string | null }) => Promise<any[]>;

    getArchivedDocuments: () => Promise<any[]>;
    archiveDocument: (params: { id: string }) => Promise<void>;
    restoreDocument: (params: { id: string }) => Promise<void>;

    getSidebarFavoriteDocuments: (params: { parentFavoriteId: string | null, isChild: boolean }) => Promise<any[]>;
    getSidebarCountFavoriteDocuments: () => Promise<number>;

    setfavoriteDocument: (params: { documentId: string }) => Promise<void>;
    unfavoriteDocument: (params: { documentId: string }) => Promise<void>;

    shareDocument: (params: { id: string, sharedEmail: string }) => Promise<void>;
    //getSharedDocuments: () => Promise<void>;
    searchDocuments: (searchTerm: string) => Promise<any[]>;

    removeEmoji: (params: { id: string }) => Promise<void>;

    getImageOffset: (params: { id: string }) => Promise<number>;
    setImageOffset: (params: { id: string, offset: number }) => Promise<void>;
}

const DocumentContext = createContext<DocumentContextProps | undefined>(undefined);

export const DocumentProvider = ({ children }: { children: React.ReactNode }) => {
    const { token, user } = useAuth();
    const [documents, setDocuments] = useState<Document[]>([]);
    const [favorites, setFavorites] = useState<Document[]>([]);

    const [error, setError] = useState<string | null>(null);

    const logCall = (functionName: string) => {
        // console.log(`useDocuments: ${functionName} called`);
        console.trace();
    };

    const createDocument = async ({ title, parentDocumentId }: { title: string, parentDocumentId: string | null }) => {
        if (token && user) {
            setError(null);
            try {
                const document = await DocumentService.createDocument({ token, userid: user.id, title, parentDocumentId });
                setDocuments(prevDocs => [...prevDocs, document]);
                return document.id;
            } catch (err: any) {
                setError('Failed to create document');
                console.error(err);
            }
        }
    };

    const getDocument = async ({ id }: { id: string }) => {
        if (token && user) {
            setError(null);
            try {
                const document = await DocumentService.getDocument({ token: token, userid: user.id, id: id });
                return document;
            } catch (err: any) {
                setError('Failed to fetch document');
                console.error(err);
            }
        }
    };

    const getAllDocuments = async () => {
        if (token && user) {
            setError(null);
            try {
                const documents = await DocumentService.getAllDocuments({ token: token, userid: user.id });
                return documents;
            } catch (err: any) {
                setError('Failed to fetch documents');
                console.error(err);
            }
        }
    };

    const updateDocument = async ({ id, title, content, icon, coverImage, isPublished }: { id: string, title?: string, content?: string, icon?: string, coverImage?: string, isPublished?: boolean }) => {
        if (token && user) {
            setError(null);
            try {
                const documents = await DocumentService.updateDocument({ token: token, userid: user.id, id: id, title: title, icon: icon, content: content, coverImage: coverImage, isPublished: isPublished });

                setDocuments(prevDocs =>
                    prevDocs.map(doc => (doc.id === id ? { ...doc, title: title ?? doc.title, icon: icon ?? doc.icon, coverImage: coverImage } : doc))
                );

                setFavorites(prevDocs =>
                    prevDocs.map(doc => (doc.id === id ? { ...doc, title: title ?? doc.title, icon: icon ?? doc.icon, coverImage: coverImage } : doc))
                );

                return documents;
            } catch (err: any) {
                setError('Failed to update document');
                console.error(err);
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

    const getSidebarFavoriteDocuments = async ({ parentFavoriteId, isChild }: { parentFavoriteId: string | null, isChild: boolean }) => {
        //console.log("getSidebarFavoriteDocuments", parentFavoriteId);
        if (token && user) {
            setError(null); // Reset error state
            try {
                const favoriteDocuments = await DocumentService.getSidebarFavoriteDocuments({ token, userid: user.id, parentFavoriteId, isChild });
                return favoriteDocuments;
            } catch (err: any) {
                setError('Failed to fetch favorite documents');
                console.error(err);
                return [];
            }
        }
    };

    const getSidebarCountFavoriteDocuments = async () => {
        if (token && user) {
            setError(null); // Reset error state
            try {
                const favoriteDocuments = await DocumentService.getSidebarCountFavoriteDocuments({ token, userid: user.id });
                logCall('getSidebarCountFavoriteDocuments');
                return favoriteDocuments;
            } catch (err: any) {
                setError('Failed to fetch favorite documents');
                console.error(err);
                return 0;
            }
        }
    };

    const setfavoriteDocument = async ({ documentId }: { documentId: string }) => {
        if (token && user) {
            setError(null); // Reset error state
            try {
                const document = await DocumentService.favoriteDocument({ token, userid: user.id, id: documentId });
                logCall('setfavoriteDocument');
                setFavorites(prevDocs => prevDocs.map(doc => doc.id === documentId ? { ...doc, favorite: true } : doc));
                setDocuments(prevDocs => prevDocs.map(doc => doc.id === documentId ? { ...doc, favorite: true } : doc));
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
                logCall('unfavoriteDocument');
                setFavorites(prevDocs => prevDocs.map(doc => doc.id === documentId ? { ...doc, favorite: false } : doc));
                setDocuments(prevDocs => prevDocs.map(doc => doc.id === documentId ? { ...doc, favorite: false } : doc));
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
            setError(null); // Reset error state
            try {
                const sharedDocument = await DocumentService.shareDocument({ token: token, id: id, sharedEmail: sharedEmail });
            } catch (err: any) {
                setError('Failed to share document');
                console.error(err);
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

    /*--------------------------------------------------------------*/

    const removeEmoji = async ({ id }: { id: string }) => {
        if (token && user) {
            setError(null); // Reset error state
            try {
                const document = await DocumentService.removeicon({ token: token, userid: user.id, id: id });
                setDocuments(prevDocs => prevDocs.map(doc => doc.id === id ? { ...doc, icon: null } : doc));
                setFavorites(prevDocs => prevDocs.map(doc => doc.id === id ? { ...doc, icon: null } : doc));
                return document;
            } catch (err: any) {
                setError('Failed to remove emoji');
                console.error(err);
            }
        }
    }

    /*--------------------------------------------------------------*/

    const getImageOffset = async ({ id }: { id: string }) => {
        if (token && user) {
            setError(null);
            try {
                const offset = await DocumentService.getCoverOffset({ token: token, userid: user.id, id: id });
                return offset;
            } catch (err: any) {
                setError('Failed to get cover offset');
                console.error(err);
            }
        }
    }

    const setImageOffset = async ({ id, offset }: { id: string, offset: number }) => {
        if (token && user) {
            setError(null);
            try {
                const response = await DocumentService.setCoverOffset({ token: token, userid: user.id, id: id, coverOffset: offset });
                return response;
            } catch (err: any) {
                setError('Failed to set cover offset');
                console.error(err);
            }
        }
    }

    return (
        <DocumentContext.Provider
            value={{
                documents,
                setDocuments,
                favorites,
                setFavorites,
                error,
                createDocument,
                getDocument,
                getAllDocuments,
                updateDocument,
                deleteDocument,
                getSidebarDocuments,
                getArchivedDocuments,
                shareDocument,
                archiveDocument,
                restoreDocument,
                getSidebarFavoriteDocuments,
                getSidebarCountFavoriteDocuments,
                setfavoriteDocument,
                unfavoriteDocument,
                searchDocuments,
                removeEmoji,
                getImageOffset,
                setImageOffset
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