import { Book } from "../../domain/book.entity";
import { BookRepository } from "../../domain/book.repository";
export class CreateBookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(
    id: string,
    title: string,
    author: string,
    price: number
  ): Promise<Book> {
    const book = new Book(id, title, author, price);
    await this.bookRepository.save(book);
    return book;
  }
}
