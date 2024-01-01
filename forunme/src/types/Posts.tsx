export type Post = {
    ID: number;
    Title: string;
    Body: string;
    UpdatedAt: string
    CreatedAt:string
  }
  export function isPost(data: Post|Post[]): data is Post {
    if ((data as Post).ID !== undefined){
      return true
    }else{
      return false
    };
  }