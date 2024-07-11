import { faker } from "@faker-js/faker";
import { FindUserByIdUseCase } from "../../../src/application/uses-cases/find-user.use-case";
import { User } from "../../../src/domain/user.entity";
import { UserRepository } from "../../../src/domain/user.repository";

describe("FindUserByIdUseCase", () => {
  let userRepositoryMock: jest.Mocked<UserRepository>;
  let findUserByIdUseCase: FindUserByIdUseCase;
  let user: User;
  let userId: string;

  beforeEach(() => {
    userId = faker.string.uuid();
    user = new User(userId, faker.person.firstName(), faker.internet.email());

    userRepositoryMock = {
      save: jest.fn(),
      findById: jest.fn().mockResolvedValue(user),
    };

    findUserByIdUseCase = new FindUserByIdUseCase(userRepositoryMock);
  });

  describe("when the user exists", () => {
    it("should return the entity", async () => {
      const result = await findUserByIdUseCase.execute(userId);
      expect(result).toEqual(user);
    });
  });

  describe("when the user does not exist", () => {
    beforeEach(() => {
      userRepositoryMock.findById.mockResolvedValueOnce(null);
    });

    it("should throw an error", async () => {
      await expect(findUserByIdUseCase.execute(userId)).rejects.toThrow(
        "User not found"
      );
    });
  });

  it("should call findById function", async () => {
    await findUserByIdUseCase.execute(userId);
    expect(userRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.findById).toHaveBeenCalledWith(userId);
  });
});
