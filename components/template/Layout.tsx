import ForcarAutenticacao from "../auth/ForcarAutenticacao";
import Cabecalho from "./Cabecalho";
import Conteudo from "./Conteudo";
import MenuLateral from "./MenuLateral";

interface LayoutProps {  
    titulo: string;
    subtitulo: string;
    children?: React.ReactNode;
}

export default function Layout({ titulo, subtitulo, children }: LayoutProps) {
  return (
    <ForcarAutenticacao>
        <div className={`flex h-screen w-screen`}>
            <MenuLateral />
            <div className="flex flex-col w-full p-7 bg-gray-300 dark:bg-gray-800">
                <Cabecalho titulo={titulo} subtitulo={subtitulo} />
                <Conteudo>
                    {children}
                </Conteudo>
            </div>
        </div>
    </ForcarAutenticacao>
  );
}