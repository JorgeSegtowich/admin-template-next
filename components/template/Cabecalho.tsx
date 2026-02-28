"use client";
import useAppData from "@/data/hook/useAppData";
import BotaoAlterarTema from "./BotaoAlterarTema";
import Titulo from "./Titulo";
import AvatarUsuario from "./AvatarUsuario";

interface CabecalhoProps {
    titulo: string;
    subtitulo: string;
}

export default function Cabecalho({ titulo, subtitulo }: CabecalhoProps) {
  const { tema, alternarTema } = useAppData();

  return (
    <div>
        <Titulo titulo={titulo} subtitulo={subtitulo} />
        <div className={`flex flex-grow justify-end items-center`}>
            <BotaoAlterarTema tema={tema} alternarTema={alternarTema} />
            <AvatarUsuario className="ml-3"/>
        </div>
    </div>
  );
}