import { HttpStatus, NotFoundException } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';

import { ValueErrorType } from './error-types';

// EntityNotFound Exception: Response 404
export function catchEntityNotFoundException(
  error: EntityNotFoundError & {
    message?: string;
  },
) {
  throw new NotFoundException({
    status_code: HttpStatus.NOT_FOUND,
    detail: error.message
      .replace(/\s{1,}/g, ' ')
      .replace(/[/{}\n\"]/g, '')
      .replace(/matching:  where:  /g, '')
      .trimEnd(),
    type: ValueErrorType.NOT_FOUND,
  });
}
