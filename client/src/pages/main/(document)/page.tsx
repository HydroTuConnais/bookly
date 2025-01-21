import Layout from "./layout";
import React, { useEffect, useState } from "react";

import { Navigate, useNavigate, useParams } from "react-router-dom";

import { DocumentPageId } from "./[documents]/page";
import { DocumentsPageHome } from "./[home]/page";
import "../style/home.css";
import { useBoarding } from "@/hooks/use-boarding";
import { useAuth } from "@/components/context/useAuth";

const DocumentsPage = () => {
    const { documentId } = useParams<{ documentId: string }>();
    const { isOpen, onClose, onOpen } = useBoarding();
    const { getUser } = useAuth();

    const [hasShownPopup, setHasShownPopup] = useState(false);
    const { checkAuth } = useAuth();

    useEffect(() => {
        if (hasShownPopup) return;

        getUser().then((res) => {
            if (!res) return;

            if (!res.boardingStatus && !hasShownPopup) {
                onOpen();
                setHasShownPopup(true);
            }
            if (res.boardingStatus) {
                onClose();
                setHasShownPopup(true);
            }
        });
    }, [hasShownPopup]);

    if (!checkAuth) {
        return <Navigate to="/" />;
    }
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
