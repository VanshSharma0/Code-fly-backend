import { Permission } from 'appwrite';
import {db, voteCollection} from '../name';
import { databases} from './config';

export default async function createVoteCollection(){
    await databases.createCollection(db, voteCollection, voteCollection, [
        Permission.read("users"),
        Permission.read("any"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log(`Collection ${voteCollection} created`);    

    await Promise.all([
        databases.createEnumAttribute(db, voteCollection, "type", ["question", "answer"], true),
        databases.createStringAttribute(db, voteCollection, "typeId", 50, true),
        databases.createEnumAttribute(db, voteCollection, "voteStatus", ["upvoted", "downvoted"], true),
        databases.createStringAttribute(db, voteCollection, "votedById", 50, true),
    ])
    console.log(`Vote Attributes created for ${voteCollection}`)
}
