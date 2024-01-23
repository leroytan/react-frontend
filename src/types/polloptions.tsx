export type PollsOptions = {
    ID: number;
    Title: string;
    UpdatedAt: string
    CreatedAt:string
    PollsOptionsVotes: PollsOptionsVotes[]
  }
  export type PollsOptionsVotes = {
    ID: number;
    UpdatedAt: string
    CreatedAt:string
    PollsOptionsID: number
    UserID: number
  }