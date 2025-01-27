import React, { useState, useEffect, useMemo } from "react";
import { usePanel } from "@/hooks/use-panel";
import { useAuth, UserProfile } from "../context/useAuth";
import { useQuery, useQueryClient } from "react-query";
import { useDocuments, Document } from "../context/useDocuments";

import { Search, ArrowUpDown, Loader2, X, UserCog, FileText, RefreshCw, FileSymlink, Trash2, Brackets, LucideShieldEllipsis } from "lucide-react";
import { cn } from "@/lib/utils";

import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { InputEmail } from "./input-modal/input-email";
import { InputName } from "./input-modal/input-name";
import { InputTitle } from "./input-modal/input-title";
import { ActionDocument } from "./input-modal/action-document";
import { Button } from "../ui/button";
import { useAdminEditDocument } from "../../hooks/use-document-admin";

interface SortConfig<T> {
    key: keyof T;
    direction: 'asc' | 'desc';
}

export const AdminPanelModal = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [activeTab, setActiveTab] = useState<'users' | 'documents'>('users');
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [userSortConfig, setUserSortConfig] = useState<SortConfig<UserProfile>>({ key: 'createdAt', direction: 'desc' });
    const [documentSortConfig, setDocumentSortConfig] = useState<SortConfig<Document>>({ key: 'createdAt', direction: 'desc' });


    const queryClient = useQueryClient();
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    const { getAllUsers, updateUser } = useAuth();
    const { isOpen, onClose } = usePanel();
    const { getAllDocuments, updateDocument } = useDocuments();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const usersQuery = useQuery<UserProfile[]>(
        ["users", isOpen, updateUser],
        () => getAllUsers(),
        {
            refetchOnWindowFocus: false,
            enabled: isOpen && activeTab === 'users',
        }
    );

    useEffect(() => {
        usersQuery.refetch()
    }, [updateUser]);

    useEffect(() => {
        documentsQuery.refetch()
    }, [updateDocument]);

    const documentsQuery = useQuery<Document[]>(
        ["documents", isOpen],
        () => getAllDocuments(),
        {
            refetchOnWindowFocus: false,
            enabled: isOpen && activeTab === 'documents',
        }
    );

    const getRoleSymbol = (role?: string) => {
        switch (role) {
            case 'ADMIN':
                return '🛠️';
            case 'OWNER':
                return '👑';
            default:
                return '👤';
        }
    };

    const getSymbolRole = (symbol?: string) => {
        switch (symbol) {
            case '🛠️':
                return 'ADMIN';
            case '👑':
                return 'OWNER';
            default:
                return 'USER';
        }
    };

    const roleSymbole = ["🛠️", "👑", "👤"];

    useEffect(() => {
        if (usersQuery.data) {
            setUsers(usersQuery.data);
        }
    }, [usersQuery.data]);

    useEffect(() => {
        if (documentsQuery.data) {
            setDocuments(documentsQuery.data);
        }
    }, [documentsQuery.data]);

    const handleUserSort = (key: keyof UserProfile) => {
        setUserSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleDocumentSort = (key: keyof Document) => {
        setDocumentSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const filteredAndSortedUsers = useMemo(() => {
        let result = [...users];

        if (searchTerm) {
            result = result.filter(user =>
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.id.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        result.sort((a, b) => {
            const aValue = a[userSortConfig.key];
            const bValue = b[userSortConfig.key];

            if (!aValue && !bValue) return 0;
            if (!aValue) return 1;
            if (!bValue) return -1;

            const comparison = String(aValue).localeCompare(String(bValue));
            return userSortConfig.direction === 'asc' ? comparison : -comparison;
        });

        return result;
    }, [users, searchTerm, userSortConfig]);

    const filteredAndSortedDocuments = useMemo(() => {
        let result = [...documents];

        if (searchTerm) {
            result = result.filter(doc =>
                (doc.title ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.userId?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        result.sort((a, b) => {
            const aValue = a[documentSortConfig.key];
            const bValue = b[documentSortConfig.key];

            if (!aValue && !bValue) return 0;
            if (!aValue) return 1;
            if (!bValue) return -1;

            const comparison = String(aValue).localeCompare(String(bValue));
            return documentSortConfig.direction === 'asc' ? comparison : -comparison;
        });

        return result;
    }, [documents, searchTerm, documentSortConfig]);

    const SortIcon = ({
        columnKey,
        type
    }: {
        columnKey: keyof UserProfile | keyof Document,
        type: 'users' | 'documents'
    }) => (
        <ArrowUpDown
            className={`inline-block w-4 h-4 ml-1 transition-colors cursor-pointer
        ${type === 'users'
                    ? userSortConfig.key === columnKey
                        ? 'text-blue-500'
                        : 'text-gray-400'
                    : documentSortConfig.key === columnKey
                        ? 'text-blue-500'
                        : 'text-gray-400'}`}
            onClick={() => type === 'users'
                ? handleUserSort(columnKey as keyof UserProfile)
                : handleDocumentSort(columnKey as keyof Document)
            }
        />
    );

    const handleDocumentView = (fileUrl: string) => {
        window.open(fileUrl, '_blank');
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleUserRowClick = (userId: string) => {
        setActiveTab('documents');
        setSearchTerm(userId);
    };

    const documentAdmin = useAdminEditDocument();
    const handleDocumentRowClick = (doc: Document) => {
        documentAdmin.onOpen(doc.id);
    };

    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const onChangeEmoji = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        setSelectedRole(e.target.value);
        const role = getSymbolRole(e.target.value);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            handleUpdateUser({ id, role });

        }, 500);
        setTimeoutId(newTimeoutId);
    };

    const handleUpdateUser = async (params: { id: string, role?: string }) => {
        await updateUser(params);
        usersQuery.refetch()
        queryClient.invalidateQueries(["users", params.id]);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <>
            {isOpen && (
                <div className="fixed z-[99999] inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    onClick={handleOverlayClick}>
                    <div className="relative w-[1500px] h-[760px] max-h-[90vh] bg-white shadow-xl rounded-2xl dark:bg-neutral-800  flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    {activeTab === 'users' ? (
                                        <UserCog className="w-6 h-6 text-blue-500" />
                                    ) : (
                                        <FileText className="w-6 h-6 text-blue-500" />
                                    )}
                                    <h1 className="text-2xl font-bold dark:text-white">
                                        {activeTab === 'users' ? 'User Management' : 'Document Management'}
                                    </h1>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setActiveTab('users')}
                                        className={`px-3 py-1 rounded-lg text-sm transition-colors ${activeTab === 'users'
                                            ? 'bg-blue-500 text-white'
                                            : 'text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-700'
                                            }`}
                                    >
                                        Users
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('documents')}
                                        className={`px-3 py-1 rounded-lg text-sm transition-colors ${activeTab === 'documents'
                                            ? 'bg-blue-500 text-white'
                                            : 'text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-700'
                                            }`}
                                    >
                                        Documents
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => activeTab === 'users' ? usersQuery.refetch() : documentsQuery.refetch()}
                                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-500 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                    disabled={activeTab === 'users' ? usersQuery.isFetching : documentsQuery.isFetching}
                                >
                                    <RefreshCw className={`w-4 h-4 ${activeTab === 'users'
                                        ? (usersQuery.isFetching ? 'animate-spin' : '')
                                        : (documentsQuery.isFetching ? 'animate-spin' : '')
                                        }`} />
                                    Refresh
                                </button>
                                <button
                                    onClick={onClose}
                                    className="transition-colors duration-200 text-neutral-500 hover:text-red-500 dark:text-neutral-300"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
                            <div className="relative">
                                <Search className="absolute w-5 h-5 text-gray-400 left-3 top-2.5" />
                                <input
                                    type="text"
                                    placeholder={`Search ${activeTab === 'users' ? 'users' : 'documents'}...`}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 overflow-auto">
                            {activeTab === 'users' ? (
                                // Users Table
                                usersQuery.isLoading ? (
                                    <div className="flex items-center justify-center h-64">
                                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                                    </div>
                                ) : usersQuery.isError ? (
                                    <div className="flex flex-col items-center justify-center h-64 gap-2 text-red-500">
                                        <span className="text-lg font-semibold">Error loading users</span>
                                        <button
                                            onClick={() => usersQuery.refetch()}
                                            className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-white rounded-lg shadow-md dark:bg-neutral-800">
                                            <thead>
                                                <tr className="bg-neutral-100 dark:bg-neutral-700">
                                                    <th className="px-4 py-1 text-sm font-semibold text-left text-neutral-600 dark:text-neutral-200">
                                                        ID <SortIcon columnKey="id" type="users" />
                                                    </th>
                                                    <th className="px-4 py-1 text-sm font-semibold text-left text-neutral-600 dark:text-neutral-200">
                                                        Email <SortIcon columnKey="email" type="users" />
                                                    </th>
                                                    <th className="px-4 py-1 text-sm font-semibold text-left text-neutral-600 dark:text-neutral-200">
                                                        Name <SortIcon columnKey="name" type="users" />
                                                    </th>
                                                    <th className="px-4 py-1 text-sm font-semibold text-left text-neutral-600 dark:text-neutral-200">
                                                        Role <SortIcon columnKey="role" type="users" />
                                                    </th>
                                                    <th className="px-4 py-1 text-sm font-semibold text-center text-neutral-600 dark:text-neutral-200">
                                                        Profile Image
                                                    </th>
                                                    <th className="px-4 py-1 text-sm font-semibold text-left text-neutral-600 dark:text-neutral-200">
                                                        Created At <SortIcon columnKey="createdAt" type="users" />
                                                    </th>
                                                    <th className="px-4 py-1 text-sm font-semibold text-left text-neutral-600 dark:text-neutral-200">
                                                        Updated At <SortIcon columnKey="updatedAt" type="users" />
                                                    </th>
                                                    <th className="flex items-center justify-center px-4 py-1 text-sm font-semibold text-left text-neutral-600 dark:text-neutral-200">
                                                        Document <Brackets className="w-4 h-4 ml-1" />
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredAndSortedUsers.map((user: UserProfile) => (
                                                    <tr
                                                        key={user.id}
                                                        className="transition-colors border-b border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
                                                    >
                                                        <td className="px-4 py-3 font-mono text-sm text-neutral-600 dark:text-neutral-300">
                                                            {user.id}
                                                        </td>
                                                        <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                                                            <div
                                                                className="flex items-center justify-center w-auto rounded-md cursor-pointer"
                                                            >
                                                                <InputEmail initialData={user} />
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                                                            <div
                                                                className="flex items-center justify-center h-8 px-2 rounded-md cursor-pointer max-w-16"
                                                            >
                                                                <InputName initialData={user} />
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                                                            <div
                                                                className="flex items-center justify-center w-8 h-8 rounded-md cursor-pointer hover:bg-neutral-300 hover:dark:bg-neutral-600"
                                                            >
                                                                <Popover >
                                                                    <PopoverTrigger
                                                                        className="w-full mt-[0.25rem] mb-4"
                                                                    >
                                                                        {getRoleSymbol(user.role)}
                                                                    </PopoverTrigger>
                                                                    <PopoverContent
                                                                        className="p-2 w-15"
                                                                        style={{ boxShadow: "rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 3px 6px, rgba(15, 15, 15, 0.4) 0px 9px 24px" }}
                                                                        align="center"
                                                                    >
                                                                        <div className="flex flex-col gap-2">
                                                                            {roleSymbole.map((role) => (
                                                                                <label
                                                                                    key={role}
                                                                                    className={cn("flex items-center p-2 cursor-pointer rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700",
                                                                                        selectedRole === role ? 'border border-sky-500/60 bg-blue-500/20' : ''
                                                                                    )}
                                                                                >
                                                                                    <input
                                                                                        type="radio"
                                                                                        name="role"
                                                                                        value={role}
                                                                                        checked={selectedRole === role}
                                                                                        onChange={(e) => {
                                                                                            onChangeEmoji(e, user.id);
                                                                                        }}
                                                                                        className="hidden"
                                                                                    />
                                                                                    <span className="text-blue-500">{role}</span>
                                                                                </label>
                                                                            ))}
                                                                        </div>
                                                                    </PopoverContent>
                                                                </Popover>
                                                            </div>
                                                        </td>

                                                        <td className="flex items-center justify-center px-4 py-3">
                                                            <div className="relative flex justify-center ">
                                                                {user.imageUrl && (
                                                                    <ConfirmModal onConfirm={() => { }}>
                                                                        <div className="absolute inset-0 flex items-center justify-center w-full h-full round ">
                                                                            <div className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer group/delete ring-2 hover:bg-red-500/50 hover:dark:ring-red-500/50">
                                                                                <Trash2 className="w-5 h-5 text-red-200 opacity-0 group-hover/delete:opacity-100" />
                                                                            </div>
                                                                        </div>
                                                                    </ConfirmModal>
                                                                )}

                                                                {user.imageUrl ? (
                                                                    <img
                                                                        src={user.imageUrl}
                                                                        alt={`${user.name}'s profile`}
                                                                        className="object-cover w-10 h-10 rounded-full ring-2 ring-white dark:ring-neutral-600"
                                                                    />
                                                                ) : (
                                                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-600 hover:bg-red-500">
                                                                        <span className="text-lg font-medium text-neutral-500 dark:text-neutral-400">
                                                                            {user.email?.[0]?.toUpperCase() || 'N/A'}
                                                                        </span>
                                                                    </div>
                                                                )}

                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                                                            {user.createdAt ? (
                                                                <time dateTime={user.createdAt}>
                                                                    {new Date(user.createdAt).toLocaleString()}
                                                                </time>
                                                            ) : (
                                                                <span className="text-neutral-400">N/A</span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                                                            {user.updatedAt ? (
                                                                <time dateTime={user.updatedAt}>
                                                                    {new Date(user.updatedAt).toLocaleString()}
                                                                </time>
                                                            ) : (
                                                                <span className="text-neutral-400">N/A</span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                                                            <div
                                                                className="flex items-center justify-center w-8 h-8 rounded-md cursor-pointer hover:bg-neutral-300 hover:dark:bg-neutral-600"
                                                                onClick={() => handleUserRowClick(user.id)}
                                                            >
                                                                <FileSymlink className="w-5 h-5" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        {filteredAndSortedUsers.length === 0 && (
                                            <div className="flex flex-col items-center justify-center h-32 gap-2 text-neutral-500 dark:text-neutral-400">
                                                <span className="text-lg">No users found</span>
                                                {searchTerm && (
                                                    <button
                                                        onClick={() => setSearchTerm("")}
                                                        className="text-sm text-blue-500 hover:text-blue-600"
                                                    >
                                                        Clear search
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )
                            ) : (
                                // Documents Table
                                documentsQuery.isLoading ? (
                                    <div className="flex items-center justify-center h-64">
                                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                                    </div>
                                ) : documentsQuery.isError ? (
                                    <div className="flex flex-col items-center justify-center h-64 gap-2 text-red-500">
                                        <span className="text-lg font-semibold">Error loading documents</span>
                                        <button
                                            onClick={() => documentsQuery.refetch()}
                                            className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-white rounded-lg shadow-md dark:bg-neutral-800">
                                            <thead>
                                                <tr className="bg-neutral-100 dark:bg-neutral-700">
                                                    <th className="px-4 py-1 text-sm font-semibold text-left text-neutral-600 dark:text-neutral-200">
                                                        ID <SortIcon columnKey="id" type="documents" />
                                                    </th>
                                                    <th className="px-4 py-1 text-sm font-semibold text-left text-neutral-600 dark:text-neutral-200">
                                                        Title <SortIcon columnKey="title" type="documents" />
                                                    </th>
                                                    <th className="px-4 py-1 text-sm font-semibold text-left text-neutral-600 dark:text-neutral-200">
                                                        User ID <SortIcon columnKey="userId" type="documents" />
                                                    </th>
                                                    <th className="px-4 py-1 text-sm font-semibold text-center text-neutral-600 dark:text-neutral-200">
                                                        Cover Image
                                                    </th>
                                                    <th className="px-4 py-1 text-sm font-semibold text-left text-neutral-600 dark:text-neutral-200">
                                                        Status
                                                    </th>
                                                    <th className="px-4 py-1 text-sm font-semibold text-left text-neutral-600 dark:text-neutral-200">
                                                        Created At <SortIcon columnKey="createdAt" type="documents" />
                                                    </th>
                                                    <th className="px-4 py-1 text-sm font-semibold text-left text-neutral-600 dark:text-neutral-200">
                                                        Updated At <SortIcon columnKey="updatedAt" type="documents" />
                                                    </th>
                                                    <th className="flex items-center justify-center px-4 py-1 text-sm font-semibold text-left text-neutral-600 dark:text-neutral-200">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredAndSortedDocuments.map((doc) => (
                                                    <tr
                                                        key={doc.id}
                                                        className="transition-colors border-b border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
                                                    >
                                                        <td className="px-4 py-3 font-mono text-sm text-neutral-600 dark:text-neutral-300">
                                                            <div className="rounded-md hover:bg-neutral-300 hover:dark:bg-neutral-600">
                                                                {/* <a href={`${origin}/documents/${doc.id}`} target="_blank" rel="noopener noreferrer">
                                                                    {doc.id}
                                                                </a> */}
                                                                <button className="text-blue-500"
                                                                    onClick={() => handleDocumentRowClick(doc)}>
                                                                    {doc.id}
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                                                            <InputTitle initialData={doc} />
                                                        </td>
                                                        <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                                                            {doc.userId}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className={cn("flex relative justify-center w-32 border-2 opacity-75 rounded-sm bg-neutral-200 dark:bg-neutral-600 border-x-slate-100 h-14 border-neutral-50 dark:border-neutral-700",
                                                                documentsQuery.isLoading ? 'animate-pulse' : '',
                                                                doc.coverImage ? 'cursor-pointer' : 'cursor-not-allowed',
                                                            )}>
                                                                {doc.coverImage && (
                                                                    <button
                                                                        onClick={() => doc.coverImage && handleDocumentView(doc.coverImage)}
                                                                    >
                                                                        <img
                                                                            src={doc.coverImage}
                                                                            alt={doc.title}
                                                                            className="object-cover w-full h-full rounded-sm"
                                                                        />
                                                                    </button>
                                                                )}
                                                                <p className="absolute flex items-center justify-center w-8 h-8 text-2xl font-semibold -bottom-2 -left-2">{doc.icon}</p>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                                                            {doc.isPublished ? (
                                                                <a href={`${origin}/preview/${doc.id}`} target="_blank" rel="noopener noreferrer">

                                                                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${doc.isPublished ? 'bg-green-100 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                                                        {doc.isPublished ? 'Published' : 'Unpublished'}

                                                                    </span>
                                                                </a>
                                                            ) : (
                                                                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${doc.isPublished ? 'bg-green-100 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                                                    {doc.isPublished ? 'Published' : 'Unpublished'}

                                                                </span>
                                                            )
                                                            }
                                                            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ml-1 ${doc.isArchived ? 'bg-gray-100 text-gray-800' : 'bg-sky-200 text-sky-800'}`}>
                                                                {doc.isArchived ? 'Archived' : 'Active'}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                                                            {doc.createdAt ? (
                                                                <time dateTime={doc.createdAt}>
                                                                    {new Date(doc.createdAt).toLocaleString()}
                                                                </time>
                                                            ) : (
                                                                <span className="text-neutral-400">N/A</span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                                                            {doc.updatedAt ? (
                                                                <time dateTime={doc.updatedAt}>
                                                                    {new Date(doc.updatedAt).toLocaleString()}
                                                                </time>
                                                            ) : (
                                                                <span className="text-neutral-400">N/A</span>
                                                            )}
                                                        </td>
                                                        <td className="flex items-center justify-center px-4 py-6 text-neutral-700 dark:text-neutral-300">
                                                            <ActionDocument initialData={doc} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        {filteredAndSortedDocuments.length === 0 && (
                                            <div className="flex flex-col items-center justify-center h-32 gap-2 text-neutral-500 dark:text-neutral-400">
                                                <span className="text-lg">No documents found</span>
                                                {searchTerm && (
                                                    <button
                                                        onClick={() => setSearchTerm("")}
                                                        className="text-sm text-blue-500 hover:text-blue-600"
                                                    >
                                                        Clear search
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )
                            )}
                        </div>

                        {/* Footer with stats */}
                        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
                            <div className="text-sm text-neutral-500 dark:text-neutral-400">
                                {activeTab === 'users'
                                    ? `${filteredAndSortedUsers.length} users ${searchTerm && `(filtered from ${users.length})`}`
                                    : `${filteredAndSortedDocuments.length} documents ${searchTerm && `(filtered from ${documents.length})`}`
                                }
                            </div>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 font-semibold text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}
