import {SetMetadata} from "@nestjs/common";

export const ROLES_KEYS = "roles"

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEYS, roles)

