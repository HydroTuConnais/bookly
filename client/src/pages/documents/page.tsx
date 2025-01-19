import Layout from "./layout";
import React, { useEffect } from "react";

import { useLocation, useParams } from "react-router-dom";

import { DocumentPageId } from "./[documents]/page";
import { DocumentsPageHome } from "./[home]/page";
import { PreviewPageId } from "./[preview]/page";
import "./style/home.css";



const DocumentsPage = () => {
    const { documentId } = useParams<{ documentId: string }>(); 
    const location = useLocation();

    useEffect(() => {
        console.log("Location changed:", location.pathname);
        console.log("Location documents changed:", location.pathname.startsWith('/documents'));
        console.log("Location preview changed:", location.pathname.startsWith('/preview'));
    }, []);

    return (
    <>
        {location.pathname.includes('/preview') && documentId ? (
            <PreviewPageId documentId={documentId} />
        ) : location.pathname.includes('/documents') ? (
            <Layout>
                {!documentId ? (
                    <DocumentsPageHome />
                ) : (
                    <DocumentPageId documentId={documentId} />
                )}
            </Layout>
        ) : null}
    </>
    
    );
}

export default DocumentsPage;
