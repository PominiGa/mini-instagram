import Comment from "./comment";

export default interface Post {
    id: number;
    usuarioId: number;
    imagem: string;
    likes: number[];
    comentarios: Comment[];
    criadoEm: Date;
}