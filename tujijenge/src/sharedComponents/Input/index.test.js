import { render, screen, fireEvent } from '@testing-library/react';
import Input from './index';

jest.mock('./style.css', () => ({}));

describe('Input Component', () => {

  test('input field uses default type', () => {
    render(<Input id="test-input" label="email" value="" onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'text');
  });

  test('input field has provided id', () => {
    render(<Input id="test-input" label="email" value="" onChange={() => { }} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'test-input');
  });

  test('label displays provided text', () => {
    render(<Input id="test-input" label="email" value="" onChange={() => { }} />);
    const label = screen.getByText('email');
    expect(label).toBeInTheDocument();
  });

  test('input field matches provided value', () => {
    render(<Input id="test-input" label="email" value="test" onChange={() => { }} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test');
  });

  test('onChange is called when the input changes', () => {
    const handleChange = jest.fn();
    render(<Input id="test-input" label="email" value="" onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('input field has provided type', () => {
    render(<Input id="test-input" label="email" value="" onChange={() => { }} type="email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  test('input field has provided placeholder', () => {
    render(<Input id="test-input" label="email" value="" onChange={() => { }} placeholder="Enter email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter email');
  });
});