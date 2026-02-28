"use client";

import useAppData from "@/data/hook/useAppData";
import { IconeAjuste, IconeCasa, IconeSair, IconeSino } from "../icons/Icones";
import Logo from "./Logo";
import MenuItem from "./MenuItem";
import userAuth from "@/data/hook/useAppAuth";

export default function MenuLateral() {

  const {tema} = useAppData();
  const { logout } = userAuth();

  return (
    <aside className={`
        ${tema}
        flex flex-col 
        bg-gray-200 text-gray-700 
        dark:bg-gray-900 
        `}>
        {/* <h1>MenuLateral</h1> */}
        <div className={`flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-800 h-20 w-20`}>
            <Logo />
        </div>
        <ul className={`flex-grow`}>
            <MenuItem url="/" texto="Home" icone={<IconeCasa />} />
            <MenuItem url="/ajustes" texto="Ajustes" icone={<IconeAjuste />} />
            <MenuItem url="/notificacoes" texto="Notificações" icone={<IconeSino />} />
        </ul>
        <ul>
            <MenuItem 
              texto="Sair" 
              icone={<IconeSair />} 
              onClick={logout} 
              className={`text-red-600 dark:text-red-600 hover:bg-red-400 hover:text-white dark:hover:bg-red-600 dark:hover:text-white`} />
        </ul>
    </aside>
  );
}