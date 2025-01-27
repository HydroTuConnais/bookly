import Layout from "./layout";
import React, { useEffect } from "react";

import { useParams } from "react-router-dom";

import { PreviewPageId } from "./[preview]/page";
import "../style/home.css";

const PreviewPage = () => {
    const { documentId } = useParams<{ documentId: string }>();

    return (
        <Layout>
            {documentId && <PreviewPageId documentId={documentId} />}
        </Layout>
    );
}

export default PreviewPage;
