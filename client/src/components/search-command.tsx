import { useEffect, useState } from 'react';
import { File, Sidebar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/context/useAuth';
import { useDocuments } from '@/components/context/useDocuments';
import { useSearch } from '@/hooks/use-search';

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command';

import React from 'react';

export const SearchCommand = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { searchDocuments } = useDocuments();
    const [isMounted, setIsMounted] = useState(false);
    const [documents, setDocuments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { isOpen, onClose, toggle, onOpen} = useSearch();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            searchDocuments("")
            .then((data) => { setDocuments(data); setIsLoading(false)})
            .catch(console.error);
        }
    }, [isOpen]);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
          if (e.key === "c" && (e.metaKey || e.ctrlKey)) {
            console.log("TOGGLED");
            toggle();
          }
        }
    
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [toggle]);

    const onSelect = (id: string) => {
        navigate(`/documents/${id}`);
        onClose();
    };

    const handleSidebarOpen = (event: React.MouseEvent, id: string) => {
        event.stopPropagation();
        console.log("clicked");
        onOpen();
    };

    if (!isMounted) {
        return null;
    }

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
          <CommandInput
            placeholder={`Searching ${user?.name}'s Bookly...`}
          />
          <CommandList>
            <CommandEmpty>
            <h4>
                Aucun résultat trouvé 😕
            </h4>
            </CommandEmpty>
            <CommandGroup heading="Documents">
              {documents?.map((document) => (
                <CommandItem
                  key={document.id}
                  value={`${document.id}-${document.title}`}
                  title={document.title}
                  onSelect={() => onSelect(document.id)}
                  className='flex justify-between items-center'
                >
                    <div className='flex items-center'>
                        {document.icon ? (
                            <p className="mr-2 text-[18px]">
                            {document.icon}
                            </p>
                        ) : (
                            <File className="mr-2 h-4 w-4" />
                        )}
                        <span>{document.title}</span>
                    </div>
                    <button onClick={(event) => handleSidebarOpen(event, document.id)}>
                        <Sidebar className="ml-2 h-4 w-4" />
                    </button>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
    );
};

export default SearchCommand;