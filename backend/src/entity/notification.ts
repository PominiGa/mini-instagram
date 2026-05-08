export default interface Notification {
    id: number;
    userId: number;
    type: "like" | "comment" | "follow";
    message: string;
    read: boolean;
    createdAt: Date;
}