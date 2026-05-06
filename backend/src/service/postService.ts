import User from "../entity/user";
import Post from "../entity/post";
import Comment from "../entity/comment";

class PostService {
    private posts: Post[] = [];
    private nextId: number = 1;

    criarPost(usuario: User, imagem: string): Post {
        const novoPost: Post = {
            id: this.nextId++,
            usuarioId: usuario.id,
            imagem,
            likes: [],
            comentarios: [],
            criadoEm: new Date(),
        };

        this.posts.push(novoPost);
        return novoPost;
    }

    obterPosts(): Post[] {
        return this.posts;
    }

    curtirPost(userId: number, postId: number): Post | null {
        const post = this.posts.find((p) => p.id === postId);

        if (!post) return null;

        if (!post.likes.includes(userId)) {
            post.likes.push(userId);
        }

        return post;
    }

    descurtirPost(userId: number, postId: number): Post | null {
        const post = this.posts.find((p) => p.id === postId);

        if (!post) return null;

        post.likes = post.likes.filter((id) => id !== userId);

        return post;
    }

    deletarPost(postId: number): boolean {
        const index = this.posts.findIndex((p) => p.id === postId);

        if (index !== -1) {
            this.posts.splice(index, 1);
            return true;
        }

        return false;
    }

    comentarPost(userId: number, postId: number, texto: string): Post | null {
    const post = this.posts.find((p) => p.id === postId);

    if (!post) return null;

    if (!texto || texto.trim() === "") return null;

    const novoComentario: Comment = {
        usuarioId: userId,
        texto,
        data: new Date(),
    };

    post.comentarios.push(novoComentario);

    return post;
}
}

export default new PostService();