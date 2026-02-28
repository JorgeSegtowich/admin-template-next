"use client";

import Link from "next/link";

interface MenuItemProps {
    url?: string;
    className?: string;
    texto: string;
    icone: any;
    onClick?: (event:any) => void;
}

export default function MenuItem({ url, texto, icone, onClick, className }: MenuItemProps) {

  function renderizarLinkContent() {
    return <>
      <span className={`
        flex flex-col justify-center items-center w-20 h-20 
        text-gray-600 dark:text-gray-200
        ${className}`}>
        {icone} <span className={`text-xs font-light`}>{texto}</span>
      </span>
    </>;
  }

  return (
    <li className={`hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer`} onClick={onClick}>
      {url ? (
        <Link
        href={url}
        >
        {renderizarLinkContent()}
      </Link>
      ) : (
        renderizarLinkContent()
      )}
    </li>
  );
}