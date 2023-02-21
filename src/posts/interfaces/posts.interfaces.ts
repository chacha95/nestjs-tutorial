export interface ICreatePostRequest {
  readonly user_id: string;
  readonly name: string;
}

export interface IUpdatePostRequest {
  readonly id: string;
  readonly user_id: string;
  readonly name?: string;
}
