export type DocumentsProfileToken = {
    header: { 
        token: string; 
        userid?: string; 
    },
    body: {
        title?: string;
        parentdocumentid?: string;
        content?: string;
        sharedemail?: string;
    },
    params: {
        id: string;
    }
};