import Layout from "./layout";
import React, { useEffect } from "react";

import { useParams } from "react-router-dom";

import { DocumentPageId } from "./[documents]/page";
import { DocumentsPageHome } from "./[home]/page";
import "../style/home.css";

const DocumentsPage = () => {
    const { documentId } = useParams<{ documentId: string }>();

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
