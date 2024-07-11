import { faker } from "@faker-js/faker";
import { FindUserByIdUseCase } from "../../../src/application/uses-cases/find-user.use-case";
import { User } from "../../../src/domain/user.entity";
import { UserRepository } from "../../../src/domain/user.repository";

describe("FindUserByIdUseCase", () => {
  let userRepositoryMock: jest.Mocked<UserRepository>;
  let findUserByIdUseCase: FindUserByIdUseCase;

  beforeEach(() => {
    userRepositoryMock = {
      save: jest.fn(),
      findById: jest.fn(),
    };

    findUserByIdUseCase = new FindUserByIdUseCase(userRepositoryMock);
  });

  it("should return a user when it exists", async () => {
    const userId = faker.datatype.uuid();
    const expectedUser = new User(
      userId,
      faker.person.firstName(),
      faker.internet.email()
    );

    userRepositoryMock.findById.mockResolvedValueOnce(expectedUser);

    const result = await findUserByIdUseCase.execute(userId);

    expect(result).toEqual(expectedUser);
    expect(userRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.findById).toHaveBeenCalledWith(userId);
  });

  it("should throw an error when the user does not exist", async () => {
    const userId = faker.string.uuid();

    userRepositoryMock.findById.mockResolvedValueOnce(null);

    await expect(findUserByIdUseCase.execute(userId)).rejects.toThrow(
      "User not found"
    );
    expect(userRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.findById).toHaveBeenCalledWith(userId);
  });
});
