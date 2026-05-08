import { Request, Response } from "express";
import storyService from "../service/storyService";
import { AuthRequest } from "../Middleware/authMiddleware";

class StoryController {

    getStories(req: AuthRequest, res: Response) {
        return res.json(storyService.obterStories());
    }

    createStory(req: AuthRequest, res: Response) {
        const { imageUrl } = req.body;
        const userId = req.userId;

        if (!userId || !imageUrl) {
            return res.status(400).json({ mensagem: "Dados inválidos" });
        }

        const story = storyService.criarStory(userId, imageUrl);

        return res.status(201).json(story);
    }

    deleteStory(req: AuthRequest, res: Response) {
        const { id } = req.params;
        const userId = req.userId;

        const stories = storyService.obterStories();
        const story = stories.find(s => s.id === Number(id));

        if (!story) {
            return res.status(404).json({ mensagem: "Story não encontrado" });
        }

        if (story.userId !== userId) {
            return res.status(403).json({ mensagem: "Sem permissão" });
        }

        storyService.deletarStory(Number(id));

        return res.json({ mensagem: "Story deletado" });
    }
}

export default new StoryController();