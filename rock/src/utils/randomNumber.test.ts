import { generateComputerHand } from './randomNumber';

describe('randomNumber', () => {
  it('should create a random number', () => {
    const randNumber = generateComputerHand();

    expect(randNumber).toBeLessThanOrEqual(2);
    expect(randNumber).toBeGreaterThanOrEqual(0);
  });
});