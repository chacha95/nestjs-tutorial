import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { InvalidRequestType, ValueErrorType } from './error-types';

export function catchQueryFailedException(error: QueryFailedError): void {
  if (error.driverError.code === '23505') {
    catchUniqueConstraintException(error);
  }
  if (error.driverError.code === '23503') {
    catchForeignKeyConstraintException(error);
  }
  if (error.driverError.code === '23502') {
    notNullConstraintException(error);
  }
  throw error;
}

// Conflict Exception: Response 409
export function catchUniqueConstraintException(
  error: QueryFailedError & {
    detail?: string;
  },
) {
  throw new ConflictException({
    status_code: HttpStatus.CONFLICT,
    detail: error.detail
      .replace(/\s{1,}/g, ' ')
      .replace(/[/\n\"]/g, '')
      .replace(/=/g, ': ')
      .replace(/Key/g, 'Unique index')
      .trimEnd(),
    type: ValueErrorType.CONFLICT,
  });
}

// Forein Key Exception: Response 404
export function catchForeignKeyConstraintException(
  error: QueryFailedError & {
    detail?: string;
  },
): void {
  throw new NotFoundException({
    status_code: HttpStatus.NOT_FOUND,
    detail: error.detail
      .replace(/[.()/\n\"]/g, '')
      .replace(/=/g, ' ')
      .replace(/Key/g, 'Foreign key')
      .trimEnd(),
    type: ValueErrorType.FOREIGN_KEY_NOT_FOUND,
  });
}

// Bad Request: Response 400
export function notNullConstraintException(
  error: QueryFailedError & {
    detail?: string;
  },
): void {
  throw new BadRequestException({
    status_code: HttpStatus.BAD_REQUEST,
    detail: error.detail
      .replace(/[.]/g, '')
      .replace(/, , /g, '')
      .replace(/Failing row contains/g, 'Not null constraint in'),
    type: InvalidRequestType.BODY,
  });
}
