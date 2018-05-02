import { Component } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import Gradient from './ad.gradient.js';

class Range {
  constructor(
    public min: number,
    public max: number
  ) {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  gradient;
  sorting: boolean = true;
  samplesCount = 24;
  sampleValueRange = new Range(-1000, 1000);
  samples = []; // sample object
  colors = []; // array of gradient colors
  presets = [
    [
      '#00f',
      '#0ff',
      '#0f0',
      '#ff0',
      '#f00'
    ],
    [
      '#00BCD4',
      '#FFEB3B',
      '#FF5722'
    ],
    [
      '#E91E63',
      '#3F51B5',
      '#8BC34A',
      '#FFEB3B',
    ]
  ];

  addOnBlur: boolean = true;
  // separate by enter and comma 
  separatorKeysCodes = [ENTER, COMMA];

  constructor() {
    this.usePreset(0);
  }

  /**
   * add color to color list
   * @param event 
   */
  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add color
    if ((value || '').trim()) {
      this.colors.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.updateGradient();
  }
  
  /**
   * remove color from color list
   * @param color 
   */
  remove(color: any): void {
    let index = this.colors.indexOf(color);
    if (index >= 0) {
      this.colors.splice(index, 1);
    }
    this.updateGradient();
  }

  /**
   * Use one of color preset
   * @param id 
   */
  usePreset(id: number) {
    this.colors = this.presets[id];
    this.updateGradient();
  }

  /**
   * update sample object and graduents
   */
  updateGradient() {
    this.gradient = new Gradient(this.colors);
    let newSamples = this.createSampleObjectList(this.samplesCount, this.sampleValueRange);
    newSamples = this.setGradientStyleToSamples(newSamples, this.sampleValueRange, this.gradient);
    if (this.sorting) {
      newSamples.sort((a, b) => a.value - b.value);
    }
    this.samples = newSamples;
  }

  /**
   * Set gradient style to object list
   * @param samples object array
   * @param range Range of samples value
   * @param gradient ad.Gradient
   */
  private setGradientStyleToSamples(samples, range: Range, gradient) {
    return samples.map(sample => {
      sample.style = {
        // color defined by value and range
        background: gradient.getColor(sample.value, range.max, range.min)
      };
      return sample;
    })
  }

  /**
   * create sample list
   * @param count of sample objects
   * @param max value
   * @param min valie
   */
  private createSampleObjectList(count, range: Range) {
    const objectList = [];
    for (let i: number = 1; i <= count; i++) {
      objectList.push({value: this.getRandomIntFromRange(range)});
    }
    return objectList;
  }

  /**
   * get random int from range (min, max)
   */
  private getRandomIntFromRange(range: Range)
  {
    return Math.floor(Math.random()*(range.max - range.min + 1) + range.min);
  }
}
