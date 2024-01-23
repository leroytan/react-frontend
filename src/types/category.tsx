import { Post } from "./posts"

export type Category = {
    ID: number
    Title: string
    Description: string
    UpdatedAt: string
    CreatedAt:string
    Subcategories: SubCategory[]
  }

export type SubCategory = {
    ID: number
    Title: string
    Description: string
    UpdatedAt: string
    CreatedAt:string
    Posts: Post[]
}