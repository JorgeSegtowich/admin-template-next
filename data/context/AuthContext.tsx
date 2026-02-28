'use client';
import { createContext, useEffect, useState } from "react";
import firebase, { firebaseConfigError } from "../../firebase/config";
import Usuario from "@/models/Usuario";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { run } from "node:test";

interface AuthContextProps {
    usuario?: Usuario | null;
    carregando?: boolean;
    loginGoogle?: () => Promise<void>;
    logout?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
    usuario: null,
    loginGoogle: () => Promise.resolve(),
    logout: () => Promise.resolve(),
});

async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken();
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName ?? '',
        email: usuarioFirebase.email ?? '',
        token,
        provedor: usuarioFirebase.providerData[0]?.providerId ?? '',
        imagemUrl: usuarioFirebase.photoURL ?? undefined,
    };
}

function gerenciarCookie(logado: boolean) {
    if(logado) {
        // document.cookie = `admin-template-logado=true; path=/; max-age=${60 * 60 * 24 * 7}`;
        Cookies.set('admin-template-logado', 'true', { expires: 7});
    } else {
        // document.cookie = `admin-template-logado=; path=/; max-age=0`;
        Cookies.remove('admin-template-logado');
    }
}

export function AuthProvider(props: any) {
    const [carregando, setCarregando] = useState(true);
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const router = useRouter();

    async function configurarSessao(usuarioFirebase: firebase.User | null) {
        if (usuarioFirebase?.email) {
            const usuario = await usuarioNormalizado(usuarioFirebase);
            setUsuario(usuario);
            gerenciarCookie(true);
            setCarregando(false);
        } else {
            setUsuario(null);
            gerenciarCookie(false);
            setCarregando(false);
        }
    }

    async function loginGoogle() {
        try {
            setCarregando(true);
            console.log('Iniciando login com Google...');
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            );
            // if (resp.user?.email) {
            //     console.log('Login bem-sucedido:', resp.user);
            //     const usuario = await usuarioNormalizado(resp.user);
            //     setUsuario(usuario);
            //     router.push('/');
            // }
            
            configurarSessao(resp.user);
            router.push('/');

        } finally {
            setCarregando(false);
        }
    }

    async function logout() {
        try {
            setCarregando(true);
            await firebase.auth().signOut();
            await configurarSessao(null);
            // router.push('/autenticacao');
        } catch (erro) {
            setCarregando(false);
            console.error('Erro ao fazer logout:', erro);
        }
    }

    useEffect(() => {
        if (Cookies.get('admin-template-logado')) {
            const cancelar = firebase.auth().onIdTokenChanged(configurarSessao);
            return () => cancelar();
        } else {
            setCarregando(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            usuario,
            carregando,
            loginGoogle,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;