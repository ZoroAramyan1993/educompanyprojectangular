import {Role} from "./Role";

export interface User{
  id: number;
  name: string;
  email: string;
  password:string;
  roles: Role[];
}
