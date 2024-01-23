import { PollsOptions, PollsOptionsVotes } from "./polloptions";

export type Post = {
    ID: number;
    Title: string;
    Content: string;
    Comments: Post[]
    UpdatedAt: string
    CreatedAt:string
    UserID: number
    Username: string
    PollsOptions: PollsOptions[]
    Userpollsvotes : PollsOptionsVotes[]
    Upvotecount :number
	  Downvotecount: number
    ParentpostID: number
  }
  export function isPost(data: Post|Post[]): data is Post {
    if ((data as Post).ID !== undefined){
      return true
    }else{
      return false
    };
  }