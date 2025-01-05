import React from "react"
import { useDocuments } from "@/components/context/useDocuments";
import { usePromise } from "@/hooks/usePromise";
import { Toolbar } from "@/components/toolbar";

interface DocumentPageIdProps {
    documentId: string;
}

export const DocumentPageId = ({
    documentId
}: DocumentPageIdProps) => {
    const { getDocument } = useDocuments();

    const { data: documents, loading, error } = usePromise(() => getDocument({ id: documentId }), [documentId]);

    if (loading) {
        return (
            <div>
                loading
            </div>
        )
    }

    if (documents === null) {
        return (
            <div>
                not found
            </div>
        )
    }

    return (
        <div className="pb-40">
            <div className="h-[35vh]"/>
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar initialData={documents} />
            </div>
        </div>
    )
}