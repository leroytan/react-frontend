import { Course } from "./course";

export type User = {
    ID: number;
    Email: string;
    Username: string;
    UpdatedAt: string
    CreatedAt:string
    RoleID: number
    Courses: Course[]
  }