import { describe, expect, test } from 'vitest';
import { Xeito } from '../classes/xeito';

describe('Xeito Application Class', () => {
 
  test('Xeito class exists', () => {
    expect(Xeito).toBeDefined();
  })

  test('Xeito class can be instantiated', () => {
    const xeito = new Xeito({});
    expect(xeito).toBeInstanceOf(Xeito);
  })

  test('Xeito class has required methods', () => {
    const xeito = new Xeito({});
    
    expect(xeito.bootstrap).toBeInstanceOf(Function);
    expect(xeito.usePlugin).toBeInstanceOf(Function);
  });

});