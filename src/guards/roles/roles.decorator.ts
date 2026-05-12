import { SetMetadata } from "@nestjs/common";
import { Role } from "./roles.enums";

export const Roles_Key = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(Roles_Key, roles);
