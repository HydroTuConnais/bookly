import React, { createContext, useContext, useState, useEffect } from 'react';
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
    documents: any[];
    setDocuments: any;
    loading: boolean;
    error: string | null;
    getDocuments: (params: { documentId: string }) => Promise<void>;
    createDocument: (params: { title: string, parentDocumentId: string | null }) => Promise<void>;
    getDocument: (params: { id: string }) => Promise<void>;
    updateDocument: (params: { id: string, title: string, content: string }) => Promise<void>;
    deleteDocument: (params: { documentId: string }) => Promise<void>;
    getSidebarDocuments: (params: { parentDocumentId: string | null }) => Promise<any[]>;
    getArchivedDocuments: () => Promise<any[]>;
    shareDocument: (params: { id: string, sharedEmail: string }) => Promise<void>;
    archiveDocument: (params: { id: string }) => Promise<void>;
    restoreDocument: (params: { id: string }) => Promise<void>;
    //getSharedDocuments: () => Promise<void>;
}

const DocumentContext = createContext<DocumentContextProps | undefined>(undefined);

export const DocumentProvider = ({ children }: { children: React.ReactNode }) => {
    const { token, user } = useAuth();
    const [documents, setDocuments] = React.useState<any[]>([]);
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
                console.log('Fetched document:', document);
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

    const getArchivedDocuments = async () => {
        if (token && user) {
            setError(null); // Reset error state
            try {
                const archivedDocuments = await DocumentService.getArchivedDocuments({ token: token});
                
                return archivedDocuments;
            } catch (err: any) {
                setError('Failed to fetch archived documents');
                console.error(err);
            }
        }
    };

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

    useEffect(() => {
    }, [token]);

    return (
        <DocumentContext.Provider
            value={{
                documents,
                setDocuments,
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