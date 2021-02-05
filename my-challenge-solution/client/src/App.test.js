import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { render, fireEvent, cleanup } from '@testing-library/react';

import 'jest-dom/extend-expect';


describe('true is truthy and false is falsy', () => {
  test('true is truthy', () => {
    expect(true).toBe(true);
  });

  test('false is falsy', () => {
    expect(false).toBe(false);
  });
});

function sum(x, y) {
  return x + y;
}

describe('sum', () => {
  test('sums up two values', () => {
    expect(sum(2, 4)).toBe(6);
  });
});
