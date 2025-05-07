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

export const PreviewPageId = ({ documentId }: { documentId: string }) => {
  const { getDocument, updateDocument, getImageOffset, archiveDocument, restoreDocument } = useDocuments();
  const { resolvedTheme } = useTheme();

  const { data: documents, isLoading, isError, refetch } = useQuery<Document | null>(
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

  if (!documents?.isPublished || documents === undefined || documents === null) {
    return <Navigate to="/not-publish" />;
  }

  return (
    <div className="pb-40">
      <Cover preview url={documents.coverImage} id={documents.id} offset={offsetValue} />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar preview initialData={documents} />
        <Editor
          editable={false}
          initialContent={documents.content}
          onChange={() => { }}
        />
      </div>
    </div>
  );
};
