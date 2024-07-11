import { Book } from "./book.entity";

export interface BookRepository {
  save(book: Book): Promise<Book>;
  findById(id: string): Promise<Book | null>;
}
