import { User } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, name: string, email: string): Promise<User> {
    const user = new User(id, name, email);
    return await this.userRepository.save(user);
  }
}
