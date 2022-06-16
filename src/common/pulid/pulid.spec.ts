import { PULID } from './pulid';

describe('PULID', () => {
  let pulids: string[];

  beforeAll(() => {
    pulids = [];
    pulids.push(PULID.generate('bu'));
    pulids.push(PULID.generate('bu'));
    pulids.push(PULID.generate('bu'));
  });

  it('should be defined', () => {
    expect(pulids).toHaveLength(3);
    pulids.forEach((pulid) => {
      expect(pulid.startsWith('bu_')).toEqual(true);
    });
  });
});
