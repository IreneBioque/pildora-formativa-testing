import { faker } from "@faker-js/faker";

import { FindBookByIdUseCase } from "../../../src/application/uses-cases/find-book-by-id.use-case";
import { FindUserByIdUseCase } from "../../../src/application/uses-cases/find-user.use-case";
import { PurchaseBook } from "../../../src/application/workflows/purchase-book.use-case";
import { Book } from "../../../src/domain/book.entity";
import { User } from "../../../src/domain/user.entity";

describe("PurchaseBook", () => {
  let findBookByIdUseCaseMock: jest.Mocked<FindBookByIdUseCase>;
  let findUserByIdUseCaseMock: jest.Mocked<FindUserByIdUseCase>;
  let purchaseBook: PurchaseBook;

  beforeEach(() => {
    findBookByIdUseCaseMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<FindBookByIdUseCase>;

    findUserByIdUseCaseMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<FindUserByIdUseCase>;

    purchaseBook = new PurchaseBook(
      findBookByIdUseCaseMock,
      findUserByIdUseCaseMock
    );
  });

  it("should return a success message when book and user are found", async () => {
    const bookId = faker.string.uuid();
    const userId = faker.string.uuid();

    const expectedBook = new Book(
      bookId,
      faker.lorem.words(3),
      faker.person.firstName(),
      parseFloat(faker.commerce.price())
    );
    const expectedUser = new User(
      userId,
      faker.person.firstName(),
      faker.internet.email()
    );

    findBookByIdUseCaseMock.execute.mockResolvedValueOnce(expectedBook);
    findUserByIdUseCaseMock.execute.mockResolvedValueOnce(expectedUser);

    const result = await purchaseBook.execute(bookId, userId);

    expect(result).toBe(
      `User ${expectedUser.name} purchased book ${expectedBook.title}`
    );
    expect(findBookByIdUseCaseMock.execute).toHaveBeenCalledTimes(1);
    expect(findBookByIdUseCaseMock.execute).toHaveBeenCalledWith(bookId);
    expect(findUserByIdUseCaseMock.execute).toHaveBeenCalledTimes(1);
    expect(findUserByIdUseCaseMock.execute).toHaveBeenCalledWith(userId);
  });
});
