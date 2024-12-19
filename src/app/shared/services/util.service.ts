import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  /**
   * Generate random 8 digit number for ids
   * @returns 8 digit number
   */
  randomId(): number {
    return Math.floor(Math.random() * 100000000);
  }
}
