// Ref. https://javascript.plainenglish.io/a-try-catch-decorator-to-stylize-your-code-bdd0202765c8
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

import { catchEntityNotFoundException } from './not-found-exception-handlers';
import { catchQueryFailedException } from './query-exception-handlers';

export function dbExceptionDecorator() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // Save a reference to the original method
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        const result = await originalMethod.apply(this, args);
        return result;
      } catch (error) {
        // https://github.com/typeorm/typeorm/issues/5057#issuecomment-893097574
        if (error instanceof QueryFailedError) {
          catchQueryFailedException(error);
        }
        if (error instanceof EntityNotFoundError) {
          catchEntityNotFoundException(error);
        }
        throw error;
      }
    };

    return descriptor;
  };
}
