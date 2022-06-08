import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    const hash = await bcrypt.hash(pass, user.salt);

    if (user && user.password === hash) {
      delete user.password;
      delete user.salt;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user._id,
      admin: user.admin,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
