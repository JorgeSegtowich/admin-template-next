interface AuthInputProps {
    label: string;
    valor: any;
    placeholder?: string;
    type: 'text' | 'email' | 'password';
    obrigatorio?: boolean;
    valorMudou?: (novoValor: any) => void;
}

export default function AuthInput({ label, valor, placeholder, type = "text", obrigatorio = false, valorMudou }: AuthInputProps) {
    return (
        <div className={`flex flex-col mt-4`}>
            <label>{label}</label>
            <input 
                className={`px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none`}
                type={type} 
                placeholder={placeholder} 
                value={valor} 
                onChange={(e) => valorMudou?.(e.target.value)} 
                suppressHydrationWarning
                required={obrigatorio}/>
        </div>
    );
}