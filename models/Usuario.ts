export default interface Usuario {
    uid: string;
    nome: string;
    email: string;
    token: string;
    provedor: string;
    imagemUrl?: string;
}