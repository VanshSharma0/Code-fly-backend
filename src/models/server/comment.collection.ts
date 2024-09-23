import { Permission } from 'appwrite';
import {db, commentCollection} from '../name';
import { databases} from './config';

export default async function createCommentCollection(){
    await databases.createCollection(db, commentCollection, commentCollection, [
        Permission.read("users"),
        Permission.read("any"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log(`Collection ${commentCollection} created`);    

    await Promise.all([
        databases.createStringAttribute(db, commentCollection, "content", 10000, true),
        databases.createEnumAttribute(db, commentCollection, "type", ["answer", "question"], true),
        databases.createStringAttribute(db, commentCollection, "typeId", 50, false),
        databases.createStringAttribute(db, commentCollection, "authorId", 50, true),
    ])
    console.log(`Comment Attributes created for ${commentCollection}`)
}
