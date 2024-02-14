import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UsersRepository } from '../users/users.repository';
import { compareSync, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto';
import { PASSWORD_HASH_SALT } from '../constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersRepository.findByEmail(signInDto.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password } = user;

    delete user.password;

    if (!compareSync(signInDto.password, password)) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      name: user.name,
    };

    const access_token = await this.jwtService.signAsync(payload);
    return { access_token, user };
  }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.usersRepository.findByEmail(signUpDto.email);
    if (user) {
      throw new ConflictException('Email already exists');
    }
    signUpDto.password = hashSync(signUpDto.password, PASSWORD_HASH_SALT);
    const data = await this.usersRepository.create(signUpDto);
    delete data.password;
    return data;
  }
}
