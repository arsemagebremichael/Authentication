import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './index.js';



jest.mock('./style.css', () => ({}));

describe('Button Label;', () => {
  test('button displays provided label', () => {
    render(<Button label="Sign in" onClick={() => {}} />);
    const button = screen.getByText('Sign in');
    expect(button).toBeInTheDocument();
  });

  test('button has provided variant class', () => {
    render(<Button label="Sign in" variant="secondary" onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('secondary');
  });

  test('button uses default variant class', () => {
    render(<Button label="Sign in" onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('primary');
  });

  test('onClick is called when button is clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Sign in" onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



  test('button has share-button class', () => {
    render(<Button label="Sign in" onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('share-button');
  });
});

