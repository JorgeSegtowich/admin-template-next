"use client";

import AuthInput from "@/components/auth/AuthInput";
import { IconeAtencao } from "@/components/icons/Icones";
import { useState } from "react";
import useAuth from "@/data/hook/useAppAuth";

export default function Autenticacao() {

    const { usuario, loginGoogle } = useAuth();

    const [modo, setModo] = useState<'login' | 'cadastro'>('login');
    const [erro, setErro] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    function submeter() {
        if (modo === 'login') {
            console.log('Tentando logar com:');
            exibirErro('Ops... Algo deu errado no login. Tente novamente mais tarde.');
        } else {
            console.log('Tentando cadastrar com:');
            exibirErro('Ops... Algo deu errado no cadastro. Tente novamente mais tarde.');
        }
        console.log('Email:', email);
        console.log('Senha:', senha);
    }

    function exibirErro(msg: string, tempoEmSegundos: number = 5) {
        setErro(msg);
        setTimeout(() => setErro(''), tempoEmSegundos * 1000);
    }

    return (
        <div className={`flex h-screen w-full justify-center items-center`}>
            <div className={`hidden md:block md:w-1/2 lg:w-2/3 h-full`}>
                <img 
                    src="https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&q=80" 
                    alt="Imagem de autenticação" 
                    className={`w-full h-full object-cover`}
                    />
            </div>
            <div className={`w-full md:w-1/2 lg:w-1/3 m-10`}>
                <h1 className={`text-xl font-bold mb-5`}>
                    {modo === 'login' ? 'Entre com sua conta' : 'Cadastre-se na plataforma'}
                </h1>

                {erro && (
                    <div className={`bg-red-400 text-white border-2 border-red-700 py-3 px-5 rounded-lg my-2 flex`}>
                        {IconeAtencao()} <span className={`ml-2`}>{erro}</span>
                    </div>
                )}

                <AuthInput 
                    label="Email" 
                    type="email" 
                    valor={email}
                    valorMudou={setEmail}
                    />
                <AuthInput 
                    label="Senha" 
                    type="password" 
                    valor={senha}
                    valorMudou={setSenha}
                    />

                <button type="button" className={`w-full bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-lg px-4 py-3 mt-6 cursor-pointer`} onClick={submeter}>
                    {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>

                <hr className={`my-6 border-gray-300 w-full`} />

                <button type="button" className={`w-full bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg px-4 py-3 mb-6 cursor-pointer`} onClick={loginGoogle}>
                    Entrar com o Google
                </button>

                {modo === 'login' ? (
                    <p className={`mt-8`}>
                        Novo por aqui? <a onClick={() => setModo('cadastro')} className={`text-blue-500 hover:text-blue-700 font-semibold cursor-pointer`}> Crie uma conta gratuitamente!</a>
                    </p>
                ) : (
                    <p className={`mt-8`}>
                        ja faz parte da nossa comunidade? <a onClick={() => setModo('login')} className={`text-blue-500 hover:text-blue-700 font-semibold cursor-pointer`}> Entre com suas credenciais!</a>
                    </p>
                )}
            </div>
        </div>
    )
}