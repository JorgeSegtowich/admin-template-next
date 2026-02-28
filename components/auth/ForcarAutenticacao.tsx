"use client";
import { useEffect } from "react";
import Image from "next/image";
import loading from "@/public/loading.svg";
import useAuth from "@/data/hook/useAppAuth";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function ForcarAutenticacao(props: any) {
    const router = useRouter();
    const { usuario, carregando } = useAuth();

    useEffect(() => {
        if (!carregando && !usuario?.email) {
            router.push('/autenticacao');
        }
    }, [carregando, usuario?.email, router]);

    function renderezarConteudo() {
        return (
            <>
                <Head>
                    <title>Admin Template - {props.title}</title>
                    <script dangerouslySetInnerHTML={{
                        __html: `
                            if (!document.cookie?.includes('admin-template-logado=true')) {
                                window.location.href = '/autenticacao';
                            }
                        `
                    }}/>
                </Head>
                {props.children}
            </>
        );
    }

    function renderezarCarregando() {
        return (
            <>
                <div className={`flex justify-center items-center h-screen`}>
                    <Image src={loading} loading="eager" alt="Carregando..." />
                </div>
            </>
        );
    }

    if(!carregando && usuario?.email) {
        return renderezarConteudo();
    } else if(carregando) {
        return renderezarCarregando();
    } else {
        return null;
    }

}