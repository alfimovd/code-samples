/**
 * Class for gradient.
 * Determine the color of the object according to the specified scale and gradient.
 * Build gradient and get colors by obj value.
 *
 * @class      Gradient (name)
 */
export default class Gradient {
  /**
   * Constructs the object.
   *
   * @param      {Array}  gradientColors  The gradient colors
   * @param      {number}  size            The size of gradient (discreteness)
   */
  constructor(
    gradientColors = ['#00f', '#0ff', '#0f0', '#ff0', '#f00'],
    size = 256
  ) {
    this.validateParams(gradientColors, size);
    this.size = size;
    this.gradientData = this.getGradientData(gradientColors, size);
    this.rgbaColorList = this.getRgbaColorList(this.gradientData);
  }

  /**
   * Gets the color.
   *
   * @param      {<type>}  value   The value
   * @param      {<type>}  max     The maximum
   * @param      {<type>}  min     The minimum
   * @return     {<type>}  The color.
   */
  getColor(value, max, min = 0) {
    return this.getColorRgba(value, max, min);
  }

  /**
   * Gets the color rgba.
   *
   * @param      {<type>}  value   The value
   * @param      {<type>}  max     The maximum
   * @param      {number}  min     The minimum
   * @return     {<type>}  The color rgba.
   */
  getColorRgba(value, max, min = 0) {
    const valueIndex = this.normalizeValue(value, max, min);
    return this.rgbaColorList[valueIndex];
  }

  /**
   * Gets the rgba color list.
   *
   * @param      {<type>}  gradientData  The gradient data (flat array rgba components by canvas context.getImageData().data)
   * @return     {Array}   The rgba color list.
   */
  getRgbaColorList(gradientData) {
    const list = [];
    for (let i = 0; i < gradientData.length; i += 4) {
      list.push(
        this.buildRgbaStr(
          gradientData[i],
          gradientData[i + 1],
          gradientData[i + 2],
          gradientData[i + 3],
        )
      );
    }
    return list;
  }

  /**
   * Builds a rgba string from components.
   *
   * @param      {int}  r       0..255
   * @param      {int}  g       0..255
   * @param      {int}  b       0..255
   * @param      {int}  a       0..255
   * @return     {String}  The rgba string.
   */
  buildRgbaStr(r, g, b, a) {
    a = Math.ceil(a / 255 * 100) / 100;
    return `rgba(${r},${g},${b},${a})`;
  }

  /**
   * By value and min-max range, return index of gradient color 
   *
   * @param      {number}  value   The value
   * @param      {number}  max     The maximum
   * @param      {number}  min     The minimum
   * @return     {number}  Index in gradien color array
   */
  normalizeValue(value, max, min = 0) {
    if (!max) {
      max = this.size;
      min = 0;
    }
    if (value >= max) {
      return 0;
    }
    if (value <= min) {
      return this.size - 1;
    }    
    const range = max - min;
    const valueInRange = range - Math.abs(min) - value;
    return (valueInRange / range * this.size).toFixed(0);
  }

  /**
   * Gets the gradient data.
   *
   * @param      {<type>}  colors  The colors
   * @param      {<type>}  width   The width
   * @param      {number}  height  The height
   * @return     {<type>}  The gradient data.
   */
  getGradientData(colors, width, height = 1) {
    const context = this.createCanvasContext2d(width);
    const gradient = context.createLinearGradient(0, 0, width, height);
    const step = 1 / (colors.length - 1);
    colors.forEach((color, index) => {
      gradient.addColorStop(index * step, color);
    });
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    return context.getImageData(0, 0, width, height).data;
  }

  /**
   * Creates a canvas context 2 d.
   *
   * @param      {number}  width   The width
   * @param      {number}  height  The height
   * @return     {CanvasRenderingContext2D}  Context 2D of canvas
   */
  createCanvasContext2d(width = 256, height = 1) {
    const canvas = document.createElement('CANVAS');
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext('2d');
  }

  /**
   * Validate initial params
   * @param {*} gradientColors Arr of colors
   * @param {*} size gradient size
   */
  validateParams(gradientColors, size) {
    if (gradientColors.length < 2) {
      throw new Error('Color array must contain two and more items');
    }
    if (size < gradientColors.length) {
      throw new Error('Small gradient size');
    }
  }
}
