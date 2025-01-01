import Layout from "./layout";
import React, { useEffect, useState } from "react";

import { useAuth } from "@/components/context/useAuth";
import { useDocuments } from "@/components/context/useDocuments";
import { useParams } from "react-router-dom";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

import "./style/home.css";
import { DocumentPageId } from "./[documentId]/page";



const DocumentsPage = () => {
    const { user } = useAuth();
    const { documentId } = useParams<{ documentId: string }>();


    const {
        createDocument,
    } = useDocuments();

    const handleCreate = async () => {
        const promise = createDocument({
            title: "new become page Document",
            parentDocumentId: null
        }).then((data) => {
            // console.log(data);
        }).catch((error) => {
            console.error("Error creating document:", error);
        });

        toast.promise(promise, {
            loading: "Creating document...",
            success: "Document created",
            error: "Error creating document"
        });
    };

    console.log(documentId);
    return ( !documentId ? (
            <Layout>
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
            </Layout>
        ) : (   
            <Layout>
                <DocumentPageId />
            </Layout>
        )
    );
}

export default DocumentsPage;
