import { faker } from "@faker-js/faker";
import { CreateBookUseCase } from "../../../src/application/uses-cases/create-book.use-case";
import { Book } from "../../../src/domain/book.entity";
import { BookRepository } from "../../../src/domain/book.repository";

describe("CreateBookUseCase", () => {
  let bookRepositoryMock: jest.Mocked<BookRepository>;
  let createBookUseCase: CreateBookUseCase;

  beforeEach(() => {
    bookRepositoryMock = {
      save: jest.fn(),
      findById: jest.fn(),
    };

    createBookUseCase = new CreateBookUseCase(bookRepositoryMock);
  });

  it("should create a book and save it using the repository", async () => {
    const id = faker.string.uuid();
    const title = faker.lorem.words(3);
    const author = faker.person.firstName();
    const price = parseFloat(faker.commerce.price());

    const expectedBook = new Book(id, title, author, price);

    bookRepositoryMock.save.mockResolvedValueOnce(expectedBook);

    const result = await createBookUseCase.execute(id, title, author, price);

    expect(result).toEqual(expectedBook);

    expect(bookRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(bookRepositoryMock.save).toHaveBeenCalledWith(expectedBook);
  });
});
