export default interface User {
    id: number;
    nome: string;
    email?: string;
    senha?: string;
    seguindo?: number[];
    seguidores?: number[];
}