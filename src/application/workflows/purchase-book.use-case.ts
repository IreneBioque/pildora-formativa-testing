import { FindBookByIdUseCase } from "../uses-cases/find-book-by-id.use-case";
import { FindUserByIdUseCase } from "../uses-cases/find-user.use-case";

export class PurchaseBook {
  constructor(
    private findBookUseCase: FindBookByIdUseCase,
    private findUserUseCase: FindUserByIdUseCase
  ) {}

  async execute(bookId: string, userId: string): Promise<string> {
    const book = await this.findBookUseCase.execute(bookId);
    const user = await this.findUserUseCase.execute(userId);

    return `User ${user.name} purchased book ${book.title}`;
  }
}
