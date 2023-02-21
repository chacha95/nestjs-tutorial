export enum ValueErrorType {
  NOT_FOUND = 'NOT_FOUND',
  FOREIGN_KEY_NOT_FOUND = 'FOREIGN_KEY_NOT_FOUND',
  CONFLICT = 'CONFLICT',
}

export enum Precondition {
  REQUIRED = 'PRECONDITION_REQUIRED',
}

export declare enum InternalErrorType {
  SYSTEM_ERROR = 'SYSTEM_ERROR',
}

export enum InvalidRequestType {
  BODY = 'INVALID_BODY',
  PARAM = 'INVALID_PARAM',
}
