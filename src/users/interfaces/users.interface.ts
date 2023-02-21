export interface ICreateUserRequest {
  readonly first_name: string;
  readonly last_name: string;
}

export interface IUpdateUserRequest {
  readonly id: string;
  readonly first_name?: string;
  readonly last_name?: string;
}
