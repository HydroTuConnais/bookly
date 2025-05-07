import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useImage } from "@/components/context/useImage";
import { useDocuments } from "@/components/context/useDocuments";

export const CoverImageModal = () => {
    const coverImage = useCoverImage();
    const documentId = coverImage.documentId;
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
        // console.log("onChange");
        if (file) {
            // console.log(file)
            setIsSubmitting(true);
            setFile(file);

            const response = await image.upload({
                file
            });

            // console.log("response", response);

            if (response !== undefined && response !== null && documentId) {
                // console.log("updateDocument");
                updateDocument({ id: documentId, coverImage: response });
            };

            onClose();
        }
    };

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogTitle className="hidden">test</DialogTitle>
                <DialogHeader>
                    <h2 className="text-lg font-semibold text-center">
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