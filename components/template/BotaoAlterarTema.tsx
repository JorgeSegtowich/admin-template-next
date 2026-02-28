import useAppData from "@/data/hook/useAppData";
import { IconeLua, IconeSol } from "../icons/Icones";

interface BotaoAlterarTemaProps {
    tema: string;
    alternarTema: () => void;
}

export default function BotaoAlterarTema(props: BotaoAlterarTemaProps) {

    const { alternarTema } = useAppData();

    return props.tema === 'dark' ? (
        <button onClick={() => alternarTema()} className={`cursor-pointer hidden sm:flex items-center w-14 lg:w-24 h-8 p-1 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-600`}>
            <span className={`flex items-center justify-center bg-white text-yellow-600 w-6 h-6 rounded-full`}>{<IconeSol />}</span> 
            <span className={`hidden sm:flex items-center ml-3 text-white`}>Claro</span>
        </button>
    ) : (
        <button onClick={() => alternarTema()} className={`cursor-pointer hidden sm:flex items-center justify-end w-14 lg:w-24 h-8 p-1 rounded-full bg-gradient-to-r from-gray-500 to-gray-900`}>
            <span className={`hidden sm:flex items-center mr-2 text-gray-300`}>Escuro</span>
            <span className={`flex items-center justify-center bg-black text-yellow-300 w-6 h-6 rounded-full`}>{<IconeLua />}</span> 
        </button>
    )
}