import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(email: string, password: string): Promise<any> {
      const user = await this.authService.validateUser(email, password)
        if (!user) {
            throw new UnauthorizedException('e-mail ou senha desconhecidos!')
        }
        return user;
    }

    
}