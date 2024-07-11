import { faker } from "@faker-js/faker";
import { FindBookByIdUseCase } from "../../../src/application/uses-cases/find-book-by-id.use-case";
import { Book } from "../../../src/domain/book.entity";
import { BookRepository } from "../../../src/domain/book.repository";

describe("FindBookByIdUseCase", () => {
  let bookRepositoryMock: jest.Mocked<BookRepository>;
  let findBookByIdUseCase: FindBookByIdUseCase;

  beforeEach(() => {
    bookRepositoryMock = {
      save: jest.fn(),
      findById: jest.fn(),
    };

    findBookByIdUseCase = new FindBookByIdUseCase(bookRepositoryMock);
  });

  it("should return a book when it exists", async () => {
    const bookId = faker.string.uuid();
    const expectedBook = new Book(
      bookId,
      faker.lorem.words(3),
      faker.person.firstName(),
      parseFloat(faker.commerce.price())
    );

    bookRepositoryMock.findById.mockResolvedValueOnce(expectedBook);

    const result = await findBookByIdUseCase.execute(bookId);

    expect(result).toEqual(expectedBook);
    expect(bookRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(bookRepositoryMock.findById).toHaveBeenCalledWith(bookId);
  });

  it("should throw an error when the book does not exist", async () => {
    const bookId = faker.string.uuid();

    bookRepositoryMock.findById.mockResolvedValueOnce(null);

    await expect(findBookByIdUseCase.execute(bookId)).rejects.toThrow(
      "Book not found"
    );
    expect(bookRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(bookRepositoryMock.findById).toHaveBeenCalledWith(bookId);
  });
});
