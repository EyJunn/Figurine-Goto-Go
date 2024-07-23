import { Body, Controller, Param, Patch, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('/signup')
  signUp(@Body() dto: SignupDto) {
    return this.authService.signup(dto)
  }

  @Post('/signin')
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }

  @Patch('/activate/:token')
  activateAccount(@Param('token') token: string, @Res()
res: any){
    return this.authService.activateAccount(token, res)
  }
}
