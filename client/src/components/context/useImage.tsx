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

}

const ImageContext = createContext<ImageContextProps | undefined>(undefined);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
    const { token, user } = useAuth();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const upload = async ({ file }: { file: File }) => {
        if (token && user) {
            setError(null);
            try {
                const image = await ImageService.upload({ token, userid: user.id, file });
                console.log("Image uploaded successfully", image);
                return image;
            } catch (err: any) {
                setError('Failed to upload image');
            } finally {
                setLoading(false);
            }
        }
    };


    return (
        <ImageContext.Provider
            value={{
                upload,
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