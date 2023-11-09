import { BcryptHashService } from './hash.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hashSync: jest.fn(),
  compareSync: jest.fn(),
}));

describe('BcryptHashService', () => {
  let service: BcryptHashService;

  beforeEach(() => {
    service = new BcryptHashService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hash', () => {
    it('should return a hashed string', () => {
      const value = 'test';
      (bcrypt.hashSync as jest.Mock).mockReturnValue('hashedValue');
      const result = service.hash(value);

      expect(bcrypt.hashSync).toHaveBeenCalledWith(value, expect.any(Number));
      expect(result).toBe('hashedValue');
    });
  });

  describe('isMatch', () => {
    it('should return true if the value matches the hash', () => {
      const value = 'test';
      const hash = service.hash(value);
      (bcrypt.compareSync as jest.Mock).mockReturnValue(true);
      const result = service.isMatch(value, hash);

      expect(bcrypt.compareSync).toHaveBeenCalledWith(value, hash);
      expect(result).toBe(true);
    });

    it('should return false if the value does not match the hash', () => {
      const value = 'test';
      const hash = service.hash('different');
      (bcrypt.compareSync as jest.Mock).mockReturnValue(false);
      const result = service.isMatch(value, hash);

      expect(result).toBe(false);
    });
  });
});