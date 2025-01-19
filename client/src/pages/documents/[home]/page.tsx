import React from "react";


import { useAuth } from "@/components/context/useAuth";
import { useTheme } from "@/components/context/useTheme";
import { useNavigate } from "react-router-dom";
import { useDocuments } from "@/components/context/useDocuments";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export const DocumentsPageHome = () => {
    const { user } = useAuth();
    const { resolvedTheme } = useTheme();
    const navigate = useNavigate();

    const { createDocument } = useDocuments();
    
    const handleCreate = async () => {
        const promise = createDocument({
            title: "Sans titre",
            parentDocumentId: null
        }).then((data) => {
            navigate(`/documents/${data.id}`);
        }).catch((error) => {
            console.error("Error creating document:", error);
        });

        toast.promise(promise, {
            loading: "Creating document...",
            success: "Document created",
            error: "Error creating document",
            style: {
                background: resolvedTheme === "dark" ? "#333" : "#fff",
                color: resolvedTheme === "dark" ? "#fff" : "#000",
              }
        });
    };
    
    return (
        <div className="h-screen flex flex-col items-center justify-center space-y-4">
            <img
                src="/empty.png"
                className="h-[300px] dark:hidden"
                alt="Empty"
            />
            <img
                src="/empty-dark.png"
                className="h-[300px] hidden dark:block"
                alt="Empty"
            />
            <h2 className="text-lg font-medium">
                Bienvenue {user?.name}&apos;s Bookly
            </h2>
            <Button onClick={handleCreate}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Crée une note
            </Button>
        </div>
    );
}