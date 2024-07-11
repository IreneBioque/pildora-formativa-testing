import { Book } from "../../domain/book.entity";
import { BookRepository } from "../../domain/book.repository";

export class FindBookByIdUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(bookId: string): Promise<Book> {
    const book = await this.bookRepository.findById(bookId);

    if (!book) throw new Error("Book not found");

    return book;
  }
}
