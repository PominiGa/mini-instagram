import Notification from "../entity/notification";

class NotificationService {
    private notifications: Notification[] = [];
    private nextId: number = 1;

    criarNotificacao(
        userId: number,
        type: "like" | "comment" | "follow",
        message: string
    ): Notification {
        const novaNotificacao: Notification = {
            id: this.nextId++,
            userId,
            type,
            message,
            read: false,
            createdAt: new Date(),
        };

        this.notifications.push(novaNotificacao);
        return novaNotificacao;
    }

    obterNotificacoes(userId: number): Notification[] {
        return this.notifications
            .filter((n) => n.userId === userId)
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    marcarComoLida(id: number): Notification | null {
        const notificacao = this.notifications.find((n) => n.id === id);

        if (!notificacao) return null;

        notificacao.read = true;
        return notificacao;
    }

    marcarTodasComoLidas(userId: number): Notification[] {
        const userNotifications = this.notifications.filter(
            (n) => n.userId === userId
        );

        userNotifications.forEach((n) => (n.read = true));

        return userNotifications;
    }

    deletarNotificacao(id: number): boolean {
        const index = this.notifications.findIndex((n) => n.id === id);

        if (index !== -1) {
            this.notifications.splice(index, 1);
            return true;
        }

        return false;
    }
}

export default new NotificationService();