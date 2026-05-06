import Story from "../entity/story";

class StoryService {
    private stories: Story[] = [];
    private nextId: number = 1;

    criarStory(userId: number, imageUrl: string): Story {
        const novoStory: Story = {
            id: this.nextId++,
            userId,
            imageUrl,
            createdAt: new Date(),
        };

        this.stories.push(novoStory);
        return novoStory;
    }

    obterStories(): Story[] {
        const agora = new Date();

        return this.stories.filter((story) => {
            const diff = agora.getTime() - story.createdAt.getTime();
            return diff <= 24 * 60 * 60 * 1000;
        });
    }

    obterStoriesPorUser(userId: number): Story[] {
        return this.obterStories().filter((s) => s.userId === userId);
    }

    deletarStory(id: number): boolean {
        const index = this.stories.findIndex((s) => s.id === id);

        if (index !== -1) {
            this.stories.splice(index, 1);
            return true;
        }

        return false;
    }

    limparStoriesAntigos(): void {
        const agora = new Date();

        this.stories = this.stories.filter((story) => {
            const diff = agora.getTime() - story.createdAt.getTime();
            return diff <= 24 * 60 * 60 * 1000;
        });
    }
}

export default new StoryService();