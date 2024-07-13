import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Request} from 'express';
import {CookieService} from "./cookie.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const req = context.switchToHttp().getRequest() as Request;
    const token = req.cookies[CookieService.tokenKey];

    if(!token) {
      throw new UnauthorizedException()
    }

    try {
      req['session'] = this.jwtService.verifyAsync(token, {secret: process.env.JWT_SECRET});
    } catch  {
      throw new UnauthorizedException()
    }

    return true;
  }
}
