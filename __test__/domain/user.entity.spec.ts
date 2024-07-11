import { faker } from "@faker-js/faker";
import { User } from "../../src/domain/user.entity";

describe("User Entity", () => {
  it("should create a User instance with correct values", () => {
    const id = faker.string.uuid();
    const name = faker.person.firstName();
    const email = faker.internet.email();

    const user = new User(id, name, email);

    expect(user.id).toBe(id);
    expect(user.name).toBe(name);
    expect(user.email).toBe(email);
  });
});
