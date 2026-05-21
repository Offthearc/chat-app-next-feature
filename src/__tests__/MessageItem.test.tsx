import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MessageItem } from '../components/Chat/MessageItem';
import type { Message } from '../types';

const baseMessage: Message = {
  id: 'msg1',
  text: 'Hello there',
  uid: 'user1',
  displayName: 'Alice',
  photoURL: null,
  createdAt: Date.now(),
};

describe('MessageItem', () => {
  it('renders message text', () => {
    render(<MessageItem message={baseMessage} isOwn={false} />);
    expect(screen.getByText('Hello there')).toBeInTheDocument();
  });

  it('shows author name for other users messages', () => {
    render(<MessageItem message={baseMessage} isOwn={false} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('hides author name for own messages', () => {
    render(<MessageItem message={baseMessage} isOwn={true} />);
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
  });

  it('applies own class for own messages', () => {
    const { container } = render(<MessageItem message={baseMessage} isOwn={true} />);
    expect(container.firstChild).toHaveClass('message-own');
  });

  it('applies other class for other messages', () => {
    const { container } = render(<MessageItem message={baseMessage} isOwn={false} />);
    expect(container.firstChild).toHaveClass('message-other');
  });
});
