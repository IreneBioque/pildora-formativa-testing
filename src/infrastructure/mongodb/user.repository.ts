import { Collection, MongoClient } from "mongodb";
import { User } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository";

const client = new MongoClient("mongodb://localhost:27017");
const db = client.db("bookstore");
const collection: Collection = db.collection("users");

export class MongoUserRepository implements UserRepository {
  async save(user: User): Promise<User> {
    await collection.insertOne(user);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return collection.findOne({ id }) as Promise<User | null>;
  }
}
