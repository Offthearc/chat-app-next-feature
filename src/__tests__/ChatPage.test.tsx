import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ChatPage } from '../pages/ChatPage';

vi.mock('../lib/firebase', () => ({
  auth: {},
  db: {},
  isFirebaseConfigured: false,
}));

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    currentUser: { uid: 'u1', displayName: 'Test User', email: 'test@test.com', photoURL: null },
    loading: false,
    login: vi.fn(),
    logout: vi.fn(),
    register: vi.fn(),
  }),
}));

vi.mock('../hooks/useMessages', () => ({
  useMessages: () => ({
    messages: [],
    loading: false,
    error: null,
    sendMessage: vi.fn(),
  }),
}));

describe('ChatPage', () => {
  it('shows Firebase setup notice when not configured', () => {
    render(
      <MemoryRouter>
        <ChatPage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/firebase not configured/i)).toBeInTheDocument();
  });
});
