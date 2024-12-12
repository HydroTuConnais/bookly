import Layout from "../../layout";
import React, { useState } from "react";
import { Button } from "@/ui/button";
import { PlusCircle } from "lucide-react";
import { CardDocument } from "../../components/card-document";
import { CardAdd } from "../../components/card-add";
import { useAuth } from "@/context/useAuth";

const DocumentsPage = () => {
    const { user } = useAuth();
    const [isDocument, setisDocument] = useState(false);

    return (
            <Layout>
                {
                    isDocument ? (
                        <div className="h-screen flex flex-col items-center justify-center space-y-4">
                            <img
                            src="/empty.png"
                            className="h-[300px] dark:hidden"
                            alt="Empty"
                            />
                            <img
                            src="/empty-dark.png"
                            className="h-[300px] hidden dark:block"
                            alt="Empty"
                            />
                            <h2 className="text-lg font-medium">
                                Bienvenue {user?.userName}&apos;s Notion Lite
                            </h2>
                            <Button>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Crée une note
                            </Button>
                        </div>
                    ) : 
                    (
                        <>
                        <div className="flex justify-center">
                            <div className="h-full min-w-80 max-w-[85rem] shadow-lg p-4 m-16 rounded-lg border bg-white dark:bg-neutral-800">
                                <div className="flex flex-row gap-2 pl-5 pt-2 items-center justify-start">
                                    <img
                                    src="/star.png"
                                    className="h-[20px] dark:hidden"
                                    alt="Empty"
                                    />
                                    <img
                                    src="/star-dark.png"
                                    className="h-[20px] hidden dark:block"
                                    alt="Empty"
                                    />
                                    <h4 className="text-xl font-medium"> Favorite </h4>
                                </div>
                        
                                <div className="w-[90px] h-[1px] dark:bg-white bg-gray-800 hidden rounded"></div>
                                <div className="flex flex-row flex-wrap p-5 pt-0 gap-5 mt-5 items-start justify-start">
                                    <CardDocument imageUrl="/mobile-app-b"/>
                                    <CardDocument imageUrl="/mobile-app-b"/>
                                    <CardDocument imageUrl="/mobile-app-b"/>  
                                    <CardDocument imageUrl="/mobile-app-b"/>  
                                    <CardAdd />  
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="h-full min-w-80 max-w-[85rem] shadow-lg p-4 m-16 rounded-lg border bg-white dark:bg-neutral-800">
                                <div className="flex flex-row gap-2 pl-5 pt-2 items-center justify-start">
                                    <h4 className="text-xl font-medium"> Lasted </h4>
                                </div>
                    
                                <div className="w-[90px] h-[1px] dark:bg-white bg-gray-800 hidden rounded"></div>
                                <div className="flex flex-row flex-wrap p-5 pt-0 gap-5 mt-5 items-start justify-start">
                                    <CardDocument imageUrl="/mobile-app-p"/>
                                    <CardDocument imageUrl="/mobile-app-p"/>
                                    <CardDocument imageUrl="/mobile-app-p"/> 
                                    <CardDocument imageUrl="/mobile-app-p"/>  
                                    <CardDocument imageUrl="/mobile-app-p"/>  
                                    <CardDocument imageUrl="/mobile-app-p"/>   
                                    <CardAdd />  
                                </div>
                            </div>
                        </div>
                    </>
                    )
                }           
            </Layout>
    );
}

export default DocumentsPage;