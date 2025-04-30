import React from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import "./editor/style.css";

import { useTheme } from "@/components/context/useTheme";


interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string | null;
    editable?: boolean;
}
 
export const Editor = ({ 
    onChange, 
    initialContent, 
    editable 
}: EditorProps) => {
    const { resolvedTheme } = useTheme();
    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: 
            initialContent 
            ? JSON.parse(initialContent) as PartialBlock[] 
            : undefined
    });
    
    return (
        <div> 
            <BlockNoteView
                editor={editor}
                editable={editable}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                onChange={() =>  {
                    onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
                }}                
            />
        </div>
    );

};