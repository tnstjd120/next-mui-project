import "next-auth";
import { IUser } from "./User";

declare module "next-auth" {
  export interface User extends IUser {}
}
