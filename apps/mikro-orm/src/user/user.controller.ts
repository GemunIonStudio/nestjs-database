import { Controller, Get } from "@nestjs/common";

import { UserEntity } from "./user.entity";
import { Roles, User } from "../common/decorators";
import { UserRole } from "./interfaces";
import { UserService } from "./user.service";

@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/profile")
  getGloballyProtectedProfile(@User() userEntity: UserEntity): UserEntity {
    return userEntity;
  }

  @Get("/")
  @Roles(UserRole.ADMIN)
  public findAll(): Promise<{ rows: Array<UserEntity>; count: number }> {
    return this.userService.findAndCount().then(([rows, count]) => ({ rows, count }));
  }
}
