import useAuth from "@/data/hook/useAppAuth";
import Link from "next/link";

interface AvatarUsuarioProps {
    // Nenhuma propriedade necessária para este componente
    className?: string; // Permite passar uma classe CSS personalizada, se necessário
}

export default function AvatarUsuario({ className }: AvatarUsuarioProps) {

    const { usuario } = useAuth();

    return (
        <Link href="/perfil">
            <img src={usuario?.imagemUrl ?? '/images/avatar.png'} alt="Avatar do usuário" className={`h-10 w-10 rounded-full cursor-pointer ${className}`} />                
        </Link>
    );
}