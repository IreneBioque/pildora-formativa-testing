import { faker } from "@faker-js/faker";
import { Collection, MongoClient } from "mongodb";
import { Book } from "../../../src/domain/book.entity";
import { MongoBookRepository } from "../../../src/infrastructure/mongodb/book.repository";

jest.mock("mongodb");

describe("MongoBookRepository", () => {
  let clientMock: jest.Mocked<MongoClient>;
  let collectionMock: jest.Mocked<Collection>;
  let bookRepository: MongoBookRepository;

  beforeEach(() => {
    clientMock = new MongoClient(
      "mongodb://localhost:27017"
    ) as jest.Mocked<MongoClient>;

    clientMock.db = jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        insertOne: jest.fn(),
        findOne: jest.fn(),
      }),
    }) as unknown as jest.Mocked<MongoClient>["db"];

    collectionMock = clientMock
      .db()
      .collection("books") as jest.Mocked<Collection>;

    bookRepository = new MongoBookRepository(clientMock);
  });

  describe("save book", () => {
    it("should save a book and return it", async () => {
      const book = new Book(
        faker.string.uuid(),
        faker.lorem.words(3),
        faker.person.firstName(),
        parseFloat(faker.commerce.price())
      );
      collectionMock.insertOne.mockResolvedValueOnce({
        acknowledged: true,
        insertedId: book.id as any,
      });

      const savedBook = await bookRepository.save(book);

      expect(savedBook).toEqual(book);
      expect(collectionMock.insertOne).toHaveBeenCalledWith(book);
    });
  });

  describe("find book", () => {
    it("should find a book by id", async () => {
      const book = new Book(
        faker.string.uuid(),
        faker.lorem.words(3),
        faker.person.firstName(),
        parseFloat(faker.commerce.price())
      );
      collectionMock.findOne.mockResolvedValueOnce(book);

      const foundBook = await bookRepository.findById(book.id);

      expect(foundBook).toEqual(book);
      expect(collectionMock.findOne).toHaveBeenCalledWith({ id: book.id });
    });

    it("should return null if book is not found", async () => {
      collectionMock.findOne.mockResolvedValueOnce(null);

      const foundBook = await bookRepository.findById(faker.datatype.uuid());

      expect(foundBook).toBeNull();
      expect(collectionMock.findOne).toHaveBeenCalled();
    });
  });
});
