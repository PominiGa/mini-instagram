import { Request, Response } from "express";
import notificationService from "../service/notificationService";
import { AuthRequest } from "../Middleware/authMiddleware";

class NotificationController {

    getNotifications(req: AuthRequest, res: Response) {
        const userId = req.userId;

        const notifications = notificationService.obterNotificacoes(userId!);

        return res.json(notifications);
    }

    markAsRead(req: AuthRequest, res: Response) {
        const { id } = req.params;
        const userId = req.userId;

        const notification = notificationService.marcarComoLida(Number(id));

        if (!notification || notification.userId !== userId) {
            return res.status(403).json({ mensagem: "Sem permissão" });
        }

        return res.json(notification);
    }
}

export default new NotificationController();