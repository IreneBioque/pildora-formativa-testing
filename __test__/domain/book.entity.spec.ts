import { faker } from "@faker-js/faker";
import { Book } from "../../src/domain/book.entity";

describe("Book Entity", () => {
  it("should create a Book instance with correct values", () => {
    const book = new Book(
      "1",
      "The Great Gatsby",
      "F. Scott Fitzgerald",
      10.99
    );

    expect(book.id).toBe("1");
    expect(book.title).toBe("The Great Gatsby");
    expect(book.author).toBe("F. Scott Fitzgerald");
    expect(book.price).toBe(10.99);
  });
  it("should create a Book instance with correct values", () => {
    const id = faker.string.uuid();
    const title = faker.lorem.words(3);
    const author = faker.person.firstName();
    const price = parseFloat(faker.commerce.price());

    const book = new Book(id, title, author, price);

    expect(book.id).toBe(id);
    expect(book.title).toBe(title);
    expect(book.author).toBe(author);
    expect(book.price).toBe(price);
  });
});
