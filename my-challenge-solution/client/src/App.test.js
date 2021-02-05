import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Sum from './Sum';
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



describe('sum', () => {
  test('sums up two values', () => {
    expect(Sum(2, 4)).toBe(6);
  });
});
