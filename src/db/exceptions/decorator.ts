import { EntityNotFoundError, QueryFailedError } from 'typeorm';

import { catchEntityNotFoundException } from './not-found-exception-handlers';
import { catchQueryFailedException } from './query-exception-handlers';

function dbExceptionHandler() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const method = descriptor.value;
    descriptor.value = () => {
      try {
        method();
      } catch (e) {
        // https://github.com/typeorm/typeorm/issues/5057#issuecomment-893097574
        if (e instanceof QueryFailedError) {
          catchQueryFailedException(e);
        }
        if (e instanceof EntityNotFoundError) {
          catchEntityNotFoundException(e);
        }
        throw e;
      }
    };
  };
}
