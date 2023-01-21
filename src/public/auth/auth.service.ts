import { UserService } from './../../private/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginCredentielDto } from './dto/login-creadentiel.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginCredentiel: LoginCredentielDto) {
    //Recuperation des données identifiant & password
    const { identifiant, password } = loginCredentiel;

    //find user with identifiant(Email Or UserName)
    const user = await this.userService.getUserFromQuery(identifiant);

    if (!user) throw new BadRequestException('USER_NOT_FOUND');

    //check if the user is not blocked
    if (user.isBlocked) throw new BadRequestException('USER.BLOCKED');

    //check password equals crypted password stored in DB
    if (!(await this.userService.comparePassword(password, user.password)))
      throw new BadRequestException('USER_NOT_FOUND');

    //Security Avec JWT
    return {
      access_token: this.jwtService.sign({ username: user.username }),
    };

    return user;
  }

  async register(registerDto: RegisterDto) {
    return this.userService.create(registerDto);
  }
}
