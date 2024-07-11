import { Collection, MongoClient } from "mongodb";
import { Book } from "../../domain/book.entity";
import { BookRepository } from "../../domain/book.repository";

export class MongoBookRepository implements BookRepository {
  private collection: Collection;

  constructor(client: MongoClient) {
    const db = client.db("bookstore");
    this.collection = db.collection("books");
  }

  async save(book: Book): Promise<Book> {
    await this.collection.insertOne(book);
    return book;
  }

  async findById(id: string): Promise<Book | null> {
    return this.collection.findOne({ id }) as Promise<Book | null>;
  }
}
