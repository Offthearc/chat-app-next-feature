import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MessageList } from '../components/Chat/MessageList';
import type { Message } from '../types';

const makeMessage = (id: string, uid: string, text: string): Message => ({
  id,
  text,
  uid,
  displayName: uid === 'me' ? 'Me' : 'Other',
  photoURL: null,
  createdAt: Date.now(),
});

describe('MessageList', () => {
  it('shows empty state when no messages', () => {
    render(<MessageList messages={[]} currentUid="me" />);
    expect(screen.getByText(/no messages yet/i)).toBeInTheDocument();
  });

  it('renders all messages', () => {
    const messages = [
      makeMessage('1', 'me', 'First'),
      makeMessage('2', 'other', 'Second'),
    ];
    render(<MessageList messages={messages} currentUid="me" />);
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('marks own messages correctly', () => {
    const messages = [makeMessage('1', 'me', 'My message')];
    const { container } = render(<MessageList messages={messages} currentUid="me" />);
    expect(container.querySelector('.message-own')).toBeInTheDocument();
  });
});
