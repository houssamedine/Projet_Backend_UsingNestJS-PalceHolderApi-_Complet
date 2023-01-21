import { RegisterDto } from './dto/register.dto';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentielDto } from './dto/login-creadentiel.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() loginCredentiel: LoginCredentielDto) {
    return this.authService.login(loginCredentiel);
  }

  @Post('register')
  @HttpCode(200)
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
