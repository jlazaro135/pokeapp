import {
  getImageById,
  getFormattedName,
  convertWeightToKg,
  convertHeightToCm,
  isDesktop,
} from './helpers';

describe('Helpers', () => {
  describe('getImageById', () => {
    it('should return a valid image URL with type number', () => {
      const id = 25;
      const expectedUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      expect(getImageById(id)).toBe(expectedUrl);
    });

    it('should return a valid image URL with type string', () => {
      const id = '25';
      const expectedUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      expect(getImageById(id)).toBe(expectedUrl);
    });
  });

  describe('getFormattedName', () => {
    it('should format name with dash', () => {
      const name = 'charizard-mega-x';
      const expectedFormattedName = 'charizard mega x';
      expect(getFormattedName(name)).toBe(expectedFormattedName);
    });

    it('should return name without any changes if there is no dash', () => {
      const name = 'pikachu';
      expect(getFormattedName(name)).toBe(name);
    });
  });

  describe('convertWeightToKg', () => {
    it('should convert weight to kilograms', () => {
      const weightInDecigrams = 500;
      const expectedWeightInKg = '50';
      expect(convertWeightToKg(weightInDecigrams)).toBe(expectedWeightInKg);
    });
  });

  describe('convertHeightToCm', () => {
    it('should convert height to centimeters', () => {
      const heightInDecimeters = 8;
      const expectedHeightInCm = '80';
      expect(convertHeightToCm(heightInDecimeters)).toBe(expectedHeightInCm);
    });
  });

  describe('isDesktop', () => {
    it('should return true if window width is greater than or equal to 992', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(1000);
      expect(isDesktop()).toBe(true);
    });

    it('should return false if window width is less than 992', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(800);
      expect(isDesktop()).toBe(false);
    });
  });
});
