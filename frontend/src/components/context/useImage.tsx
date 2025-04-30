import React, { createContext, useContext, useState } from 'react';
import { ImageService } from '@/services/imageService';
import { useAuth } from './useAuth';

export interface Image {
    id: string;
    filename: string;
    filepath: string;
    uploadedAt: Date;
}

interface ImageContextProps {
    upload: (params: { file: File }) => Promise<void>;
    remove: (params: { url: string, documentId: string}) => Promise<void>;
}

const ImageContext = createContext<ImageContextProps | undefined>(undefined);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
    const { token, user } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const upload = async ({ file }: { file: File }) => {
        if (token && user) {
            setError(null);
            try {
                const imageUrl = await ImageService.upload({ token, userid: user.id, file });
                return imageUrl;
            } catch (err: any) {
                setError('Failed to upload image');
            }
        }
    };

    const remove = async ({ url, documentId} : { url: string, documentId: string | null}) => {
        if (token && user) {
            setError(null);

            if(!documentId) return setError('Image ID is required');

            try {
                const response = await ImageService.remove({ token, userid: user.id, url,documentId});
                return response;
            } catch (err: any) {
                setError('Failed to remove image');
            }
        };
    };


    return (
        <ImageContext.Provider
            value={{
                upload,
                remove
            }}
        >
            {children}
        </ImageContext.Provider>
    );
};

export const useImage = () => {
    const context = useContext(ImageContext);
    if (context === undefined) {
        throw new Error('useImage must be used within a ImageProvider');
    }
    return context;
};