import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { User } from './user.entity';
import { SignUpDto } from './dto/signup.dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { username, password } = signUpDto;
    const userRepository: Repository<User> =
      this.dataSource.getRepository(User);
    try {
      const hashPassword: string = hashSync(password, 10);

      const user: User = userRepository.create({
        username,
        password: hashPassword,
      });

      return await userRepository.save(user);
    } catch (err: any) {
      throw new ConflictException({
        message: [`Failed to create user: ${err.message}`],
      });
    }
  }

  async findOneUser(username: string): Promise<User | undefined> {
    const userRepository: Repository<User> =
      this.dataSource.getRepository(User);
    try {
      return await userRepository.findOne({
        where: { username: username },
      });
    } catch (err: any) {
      throw new ConflictException({
        message: [`Failed to get user by username: ${err.message}`],
      });
    }
  }
}
