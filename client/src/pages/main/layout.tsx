import React from "react";
import { UserProvider } from '@/context/useAuth';
import { useAuth } from "@/context/useAuth";
import { Navigate } from "react-router-dom";
import { Navigation } from "./components/navigation";

const Layout = ({ 
    children 
  } : {
    children: React.ReactNode;
  }) => {
    
    const {checkAuth , isAuthenticated, isLoading} = useAuth();
    checkAuth();
    console.log(isAuthenticated);
    console.log(isLoading);
    if (isLoading) {
        return (
        <div className="h-full flex items-center justify-center">
            Loading...  
        </div>
        )
    }
    
    if(!isAuthenticated) {
        return <Navigate to="/"/>;
    }
    return (
        <div className="h-full flex dark:bg-[#1F1F1F]">
            <Navigation />
            <main className="flex-1 h-full overflow-y-auto">
                {children}   
            </main>
        </div>
    );
}

const LayoutWithProvider = ({ children }: { children: React.ReactNode }) => (
    <UserProvider>
        <Layout>{children}</Layout>
    </UserProvider>
);

export default LayoutWithProvider;