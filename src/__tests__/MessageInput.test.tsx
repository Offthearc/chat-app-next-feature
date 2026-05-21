import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MessageInput } from '../components/Chat/MessageInput';

describe('MessageInput', () => {
  it('renders input and button', () => {
    render(<MessageInput onSend={vi.fn()} />);
    expect(screen.getByRole('textbox', { name: /message/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('send button is disabled when input is empty', () => {
    render(<MessageInput onSend={vi.fn()} />);
    expect(screen.getByRole('button', { name: /send/i })).toBeDisabled();
  });

  it('send button enables after typing', () => {
    render(<MessageInput onSend={vi.fn()} />);
    fireEvent.change(screen.getByRole('textbox', { name: /message/i }), {
      target: { value: 'hello' },
    });
    expect(screen.getByRole('button', { name: /send/i })).not.toBeDisabled();
  });

  it('calls onSend with text and clears input on submit', async () => {
    const onSend = vi.fn().mockResolvedValue(undefined);
    render(<MessageInput onSend={onSend} />);
    const input = screen.getByRole('textbox', { name: /message/i });
    fireEvent.change(input, { target: { value: 'hello world' } });
    fireEvent.submit(screen.getByRole('button', { name: /send/i }).closest('form')!);
    await waitFor(() => {
      expect(onSend).toHaveBeenCalledWith('hello world');
      expect(input).toHaveValue('');
    });
  });

  it('does not call onSend with whitespace-only text', () => {
    const onSend = vi.fn();
    render(<MessageInput onSend={onSend} />);
    fireEvent.change(screen.getByRole('textbox', { name: /message/i }), {
      target: { value: '   ' },
    });
    expect(screen.getByRole('button', { name: /send/i })).toBeDisabled();
  });

  it('disables input when disabled prop is true', () => {
    render(<MessageInput onSend={vi.fn()} disabled />);
    expect(screen.getByRole('textbox', { name: /message/i })).toBeDisabled();
  });
});
