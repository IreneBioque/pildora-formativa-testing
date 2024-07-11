import { User } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository";

export class FindUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new Error("User not found");

    return user;
  }
}
