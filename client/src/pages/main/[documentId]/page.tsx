import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Toolbar } from "@/pages/main/components/toolbar";
import { Document, useDocuments } from "@/components/context/useDocuments";
import { useQuery } from "react-query";
import { Cover } from "../components/cover";

export const DocumentPageId = ({ documentId }: { documentId: string }) => {
  const { getDocument, updateDocument} = useDocuments();

  const { data: document, isLoading, isError, refetch } = useQuery<Document | null>(
    ["document", documentId],
    () => getDocument({ id: documentId }),
    {
      refetchOnWindowFocus: true,
    }
  );

  useEffect(() => {
    refetch();
    console.log("refetching");
  }, [updateDocument, refetch]);

  if (isLoading) {
    return (
        <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between gap-x-4 animate-pulse">
            <div className="h-6 w-[200px] rounded bg-gray-200 dark:bg-neutral-700"></div>
            <div className="flex items-center gap-x-2">
                <div className="h-8 w-10 rounded bg-gray-200 dark:bg-neutral-700"></div>
            </div>
        </nav>
    );
  }

  if(document === undefined || document === null) {
    return <Navigate to="/404" />;
}

  return (
    <div className="pb-40">
        <Cover url={document.coverImage}/>
        <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
            <Toolbar initialData={document} />
        </div>
    </div>
  );
};
