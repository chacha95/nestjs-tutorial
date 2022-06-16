import { ulid } from 'ulid';

// Singleton => https://refactoring.guru/design-patterns/singleton/typescript/example
export class PULID {
  private static instance: PULID;

  static getInstance() {
    if (!PULID.instance) {
      PULID.instance = new PULID();
    }
    return PULID.instance;
  }

  static generate(prefix: string): string {
    return `${prefix}_${ulid()}`;
  }
}
