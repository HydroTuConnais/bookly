import Layout from "./layout";
import React, { useEffect } from "react";

import { useParams } from "react-router-dom";

import { DocumentPageId } from "./[documents]/page";
import { DocumentsPageHome } from "./[home]/page";
import "../style/home.css";
import { useBoarding } from "@/hooks/use-boarding";
import { useAuth } from "@/components/context/useAuth";

const DocumentsPage = () => {
    const { documentId } = useParams<{ documentId: string }>();
    const { isOpen, onClose, onOpen } = useBoarding();
    const { updateUser, getUser } = useAuth();

    useEffect(() => {
        getUser().then((res) => {
            if (!res) return;

            console.log("res", res.boardingStatus);
            if (!res.boardingStatus) {
                onOpen();
            }
            if (res.boardingStatus) {
                onClose();
            }
        });
    }, [isOpen]);

    return (
        <Layout>
            {!documentId ? (
                <DocumentsPageHome />
            ) : (
                <DocumentPageId documentId={documentId} />
            )}
        </Layout>
    );
}

export default DocumentsPage;
