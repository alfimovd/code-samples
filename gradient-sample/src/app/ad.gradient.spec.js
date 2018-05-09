import Gradient from './ad.gradient.js';

describe('Gradient', () => {
  it('should create the gradient', () => {
    const gradient = new Gradient();
    expect(gradient).toBeTruthy();
    expect(() => {
      new Gradient(['#000'])
    }).toThrowError();
    expect(() => {
      new Gradient(
        ['#00f', '#0ff', '#0f0', '#ff0', '#f00'], 
        2
      )
    }).toThrow();
  });

  it('should build rgba string', () => {
    const gradient = new Gradient();
    expect(gradient.buildRgbaStr(255, 255, 255, 255)).toEqual(`rgba(255,255,255,1)`);
  });

  it('should normalize value', () => {
    const gradient = new Gradient(['#00f', '#0ff', '#0f0', '#ff0', '#f00'], 101);

    expect(gradient.normalizeValue(200, 100, 0)).toEqual(100, 'out or range: max');
    expect(gradient.normalizeValue(-100, 100, 0)).toEqual(0, 'out or range: min');
    expect(gradient.normalizeValue(100, 100, 0)).toEqual(100, 'range border');
    expect(gradient.normalizeValue(0, 100, 0)).toEqual(0, 'range border');
    
    expect(gradient.normalizeValue(100, 200)).toEqual(50, 'zero - positive range');
    expect(gradient.normalizeValue(0, 100, -100)).toEqual(50, 'positive and negative range');
    
    expect(gradient.normalizeValue(150, 200, 100)).toEqual(50, 'positive range');
    expect(gradient.normalizeValue(125, 200, 100)).toEqual(25, 'positive range: direction');
    expect(gradient.normalizeValue(175, 200, 100)).toEqual(75, 'positive range: direction');
    
    expect(gradient.normalizeValue(-150, -100, -200)).toEqual(50, 'negative range');
    expect(gradient.normalizeValue(-125, -100, -200)).toEqual(75, 'negative range: direction');
    expect(gradient.normalizeValue(-175, -100, -200)).toEqual(25, 'negative range: direction');
  });
});
