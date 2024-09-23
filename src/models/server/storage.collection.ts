import { Permission } from 'appwrite';
import { questionAttachmentBucket} from '../name';
import { storage } from './config';

export default async function getOrCreateStorage(){
    try {
        await storage.getBucket(questionAttachmentBucket);
        console.log("Storage Connected");
    } catch (error) {
        try {
            await storage.createBucket(questionAttachmentBucket, questionAttachmentBucket, [
                Permission.read("users"),
                Permission.read("any"),
                Permission.create("users"),
                Permission.update("users"),
                Permission.delete("users"),
            ],
            false,
            undefined,
            undefined,
            ["jpg", "png", "gif", "jpeg", "svg", "webp", "heic"]
        );
        console.log("Storage Created");
        } catch (error) {
            console.error("Storage Creation Failed", error);
        }
    }
}
