import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader
} from "@/components/ui/dialog"
import { useCoverImage } from "@/hooks/use-cover-image";
import { useImage } from "@/components/context/useImage";
import { SingleImageDropzone } from "@/components/single-image-dropzone";

export const CoverImageModal = () => {
    const [file, setFile] = useState<File | undefined>(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const coverImage = useCoverImage();
    const image = useImage();

    const onChange = async (file?: File) => {
        if (file) {
            setIsSubmitting(true);
            setFile(file);

            const res = await image.upload({ 
                file
             });
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