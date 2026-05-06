import User from "../entity/user";

class UserService {
    private users: User[] = [];
    private nextId: number = 1;

    // ✅ Criar usuário
    criarUser(nome: string, email?: string, senha?: string): User {
        const novoUser: User = {
            id: this.nextId++,
            nome,
            email,
            senha,
            seguindo: [],
            seguidores: [],
        };

        this.users.push(novoUser);
        return novoUser;
    }

    // ✅ Listar usuários
    obterUsers(): User[] {
        return this.users;
    }

    // ✅ Buscar por ID
    obterUserPorId(id: number): User | null {
        return this.users.find((u) => u.id === id) || null;
    }

    // ✅ Deletar usuário
    deletarUser(id: number): boolean {
        const index = this.users.findIndex((u) => u.id === id);

        if (index !== -1) {
            this.users.splice(index, 1);
            return true;
        }

        return false;
    }

    // ✅ Seguir usuário
    seguirUsuario(userId: number, targetId: number): boolean {
        if (userId === targetId) return false;

        const user = this.obterUserPorId(userId);
        const target = this.obterUserPorId(targetId);

        if (!user || !target) return false;

        if (!user.seguindo!.includes(targetId)) {
            user.seguindo!.push(targetId);
            target.seguidores!.push(userId);
        }

        return true;
    }

    // ✅ Parar de seguir
    deixarDeSeguir(userId: number, targetId: number): boolean {
        const user = this.obterUserPorId(userId);
        const target = this.obterUserPorId(targetId);

        if (!user || !target) return false;

        user.seguindo = user.seguindo?.filter(id => id !== targetId);
        target.seguidores = target.seguidores?.filter(id => id !== userId);

        return true;
    }
}

export default new UserService();