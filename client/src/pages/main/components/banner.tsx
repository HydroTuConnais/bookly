import React from "react";

import { useDocuments } from "@/components/context/useDocuments";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface BannerProps {
    documentId: string;
};


export const Banner = ({
    documentId
}: BannerProps) => {
    const { restoreDocument, deleteDocument } = useDocuments();
    const navigate = useNavigate();

    const onRemove = () => {
        const promise = deleteDocument({
            documentId: documentId
        }).then((data) => {
            navigate(`/documents`);
            // console.log(data);
        }).catch((error) => {
            console.error("Error creating document:", error);
        });

        toast.promise(promise, {
            loading: "Deleting document...",
            success: "Document delete",
            error: "Error deleting document"
        });
    };


    const onRestore = () => {
        const promise = restoreDocument({
            id: documentId
        }).then((data) => {
            // console.log(data);
        }).catch((error) => {
            console.error("Error creating document:", error);
        });

        toast.promise(promise, {
            loading: "Restoring document...",
            success: "Document restored",
            error: "Error restoring document"
        });
    };
    
    return (
        <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
            <p>
                Ce document est dans la corbeille.
            </p>
            <Button 
            size="sm"
            onClick={onRestore} 
            variant="outline"
            className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
            >
                Restaurer
            </Button>
            <ConfirmModal onConfirm={onRemove}>
                <Button 
                size="sm"
                variant="outline"
                className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
                >
                    Supprimer définitivement
                </Button>
            </ConfirmModal>
        </div>
    );
}