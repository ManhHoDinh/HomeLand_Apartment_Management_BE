import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { SignInDto } from './dto/login.dto';
import { PersonRepository } from '../person/person.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly personService: PersonRepository,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signin')
  async login(@Body() loginDto: SignInDto) {
    const person = await this.personService.findOneByPhoneNumber(
      loginDto.phone_number,
    );
    if (person && person.password) {
      if (compareSync(loginDto.password, person.password)) {
        const payload = {
          id: person.id,
          type: person.type,
        };
        return {
          access_token: this.jwtService.sign(payload, {
            secret: process.env.ACCESS_TOKEN_SECRET,
            expiresIn: '15p',
          }),
          refresh_token: this.jwtService.sign(payload, {
            secret: process.env.REFRESH_TOKEN_SECRET,
            expiresIn: '7d',
          }),
        };
      }
      throw new UnauthorizedException('Wrong phone number or password');
    }
  }

  @Post('token')
  async generateToken(@Req() req) {
    const payload = this.jwtService.verify(
      req.headers.authorization.split(' ')[1],
      { secret: process.env.REFRESH_TOKEN_SECRET },
    );

    const person = await this.personService.findOne(payload.id);
    if (person) {
      const payload = {
        id: person.id,
        type: person.type,
      };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: '15p',
        }),
        refresh_token: this.jwtService.sign(payload, {
          secret: process.env.REFRESH_TOKEN_SECRET,
          expiresIn: '7d',
        }),
      };
    }

    return new NotFoundException('Person not found');
  }
}
