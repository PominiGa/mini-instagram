import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userService from "./userService";
import User from "../entity/user";

const SECRET = "segredo_super_secreto";

class AuthService {

    async register(nome: string, email: string, senha: string): Promise<User | null> {
        const users = userService.obterUsers();

        const exists = users.find(u => u.email === email);
        if (exists) return null;

        const senhaHash = await bcrypt.hash(senha, 8);

        const user = userService.criarUser(nome, email, senhaHash);

        return user;
    }

    async login(email: string, senha: string): Promise<string | null> {
        const users = userService.obterUsers();

        const user = users.find(u => u.email === email);
        if (!user || !user.senha) return null;

        const valid = await bcrypt.compare(senha, user.senha);
        if (!valid) return null;

        const token = jwt.sign(
            { id: user.id },
            SECRET,
            { expiresIn: "1d" }
        );

        return token;
    }

    verifyToken(token: string): any {
        try {
            return jwt.verify(token, SECRET);
        } catch {
            return null;
        }
    }
}

export default new AuthService();