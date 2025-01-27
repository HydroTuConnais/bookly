import React, { useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { Toolbar } from "@/pages/main/components/toolbar";
import { Document, useDocuments } from "@/components/context/useDocuments";
import { useQuery } from "react-query";
import { Cover } from "../../components/cover";
import { usePromise } from "@/hooks/usePromise";
import { Editor } from "../../components/editor";
import { toast } from "sonner"
import { useTheme } from "@/components/context/useTheme";
import { File } from "lucide-react";

export const DocumentPageId = ({ documentId }: { documentId: string }) => {
  const { getDocument, updateDocument, getImageOffset, documents, archiveDocument, restoreDocument } = useDocuments();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    console.log("DocumentPageId");
  }, []);

  const { data: document, isLoading, isError, refetch } = useQuery<Document | null>(
    ["document", documentId, archiveDocument, restoreDocument],
    () => getDocument({ id: documentId }),
    {
      refetchOnWindowFocus: true,
    }
  );


  const { data: offsetValue, loading, error } = usePromise(() => getImageOffset({ id: documentId }), []);

  useEffect(() => {
    refetch();
  }, [updateDocument, refetch]);

  let timeoutId: NodeJS.Timeout;

  const onChange = (value: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const promise = updateDocument({ id: documentId, content: value });

      toast.promise(promise, {
        loading: "Sauvegarde...",
        success: <> {document?.icon ? document?.icon : <File className="w-4 h-4 mr-2" />} <strong>"{document?.title}"</strong> à été sauvé </>,
        error: "Erreur lors de la sauvegarde",
        style: {
          background: resolvedTheme === "dark" ? "#333" : "#fff",
          color: resolvedTheme === "dark" ? "#fff" : "#000",
        }
      });
    }, 5000);
  }

  if (isLoading || loading) {
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between gap-x-4 animate-pulse">
        <div className="h-6 w-[200px] rounded bg-gray-200 dark:bg-neutral-700"></div>
        <div className="flex items-center gap-x-2">
          <div className="w-10 h-8 bg-gray-200 rounded dark:bg-neutral-700"></div>
        </div>
      </nav>
    );
  }

  if (document === undefined || document === null) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} id={document.id} offset={offsetValue} />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar initialData={document} />
        <Editor
          onChange={onChange}
          initialContent={document.content}
        />
      </div>
    </div>
  );
};
