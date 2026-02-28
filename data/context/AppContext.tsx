'use client';
import { createContext, useState } from "react";

type Tema = 'dark' | '';

interface AppContextProps {
    tema: Tema;
    alternarTema: () => void;
}

const AppContext = createContext<AppContextProps>({ tema: "", alternarTema: () => {} });

export function AppProvider(props: any) {

    const [tema, setTema] = useState<Tema>('');

    function alternarTema() {
        // Lógica para alternar o tema
        setTema(tema === '' ? 'dark' : '');
        console.log(`Alternando para o tema: ${tema === '' ? 'dark' : ''}`);
    }

    return (
        <AppContext.Provider value={{
            tema,
            alternarTema
        }}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContext;