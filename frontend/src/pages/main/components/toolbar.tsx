import React, { ElementRef, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Document, useDocuments } from "@/components/context/useDocuments";
import { useQueryClient } from "react-query";
import { useCoverImage } from "@/hooks/use-cover-image";
import { IconPicker } from "../../../components/icon-picker";
import { Button } from "../../../components/ui/button";
import { ImageIcon, Smile } from "lucide-react";

interface ToolbarProps {
  initialData: Document;
  preview?: boolean;
}

export const Toolbar = ({
  initialData,
  preview,
}: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const { updateDocument, removeEmoji } = useDocuments();
  const queryClient = useQueryClient();
  const coverImage = useCoverImage();

  const [title, setTitle] = useState(initialData.title || "Untitled");
  const [isEditing, setIsEditing] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const enableInput = () => {
    if (preview) return;
    setIsEditing(true);
    setTimeout(() => {
      setTitle(initialData.title || "Untitled");
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
    setTitle(title);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {
      handleUpdateDocument({ id: initialData.id, title: e.target.value });
    }, 150);
    setTimeoutId(newTimeoutId);
  };

  const handleUpdateDocument = async (params: { id: string, title?: string, content?: string, icon?: string }) => {
    await updateDocument(params);
    queryClient.invalidateQueries(["document", params.id]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      disableInput();
      setTitle(e.currentTarget.value);
    }
  };

  const onIconSelect = async (icon: string) => {
    await handleUpdateDocument({ id: initialData.id, icon });
  }

  const onRemoveIcon = async () => {
    await removeEmoji({ id: initialData.id });
    queryClient.invalidateQueries(["document", initialData.id]);
  }

  return (
    <div className="pl-[54px] group relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon"
          style={{ marginTop: "-40px" }}>
          <IconPicker onDelete={onRemoveIcon} onChange={onIconSelect}>
            <p className="transition text-7xl hover:opacity-75">
              {initialData.icon}
            </p>
          </IconPicker>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="pt-6 text-6xl">{initialData.icon}</p>
      )}
      <div className="flex items-center py-4 opacity-0 group-hover:opacity-100 gap-x-1">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs bg-white dark:bg-[#1F1F1F] hover:bg-neutral-200 hover:dark:bg-neutral-800 transition border-none"
              variant="outline"
              size="sm"
            >
              <Smile className="w-4 h-4 mr-2 bg-transparent rounded-full" />
              Ajouter une icône
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            onClick={() => coverImage.onOpen(initialData.id)}
            className="text-muted-foreground text-xs bg-white dark:bg-[#1F1F1F] hover:bg-neutral-200 hover:dark:bg-neutral-800 transition border-none"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Ajouter une image de couverture
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          value={title}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={disableInput}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
};
