import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader
} from "@/components/ui/dialog"
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useImage } from "@/components/context/useImage";
import { useDocuments } from "@/components/context/useDocuments";
import { useParams } from "react-router-dom";

export const CoverImageModal = () => {
    const params = useParams();
    const documentId = params.documentId;

    const coverImage = useCoverImage();
    const image = useImage();

    const [file, setFile] = useState<File | undefined>(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
     
    const { updateDocument } = useDocuments();
    
    const onClose = () => {
        setFile(undefined);
        setIsSubmitting(false);
        coverImage.onClose();
    }

    const onChange = async (file?: File) => {
        if (file) {
            setIsSubmitting(true);
            setFile(file);

            const response = await image.upload({ 
                file
            });

            if (response !== undefined && response !== null && documentId) {
                updateDocument({ id: documentId, coverImage: response });
            };

            onClose();
        }
    };

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">
                        Cover Image
                    </h2>
                </DialogHeader>
                <SingleImageDropzone
                className="w-full outline-none"
                disabled={isSubmitting}
                value={file}
                onChange={onChange}
                />
            </DialogContent>
        </Dialog>
    );
};