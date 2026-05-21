import { useAuth } from '../contexts/AuthContext';
import { useMessages } from '../hooks/useMessages';
import { MessageList } from '../components/Chat/MessageList';
import { MessageInput } from '../components/Chat/MessageInput';
import { isFirebaseConfigured } from '../lib/firebase';

export function ChatPage() {
  const { currentUser } = useAuth();
  const { messages, loading, error, sendMessage } = useMessages('general');

  if (!isFirebaseConfigured) {
    return (
      <main className="chat-page">
        <div className="setup-notice">
          <h2>Firebase not configured</h2>
          <p>
            Add your Firebase credentials to <code>.env.local</code> to enable real-time chat.
          </p>
          <p>
            See <code>.env.local.example</code> and the <a href="/README.md">README</a> for setup
            instructions.
          </p>
        </div>
      </main>
    );
  }

  async function handleSend(text: string) {
    if (!currentUser) return;
    await sendMessage(
      text,
      currentUser.uid,
      currentUser.displayName ?? currentUser.email ?? 'Anonymous',
      currentUser.photoURL,
    );
  }

  return (
    <main className="chat-page">
      <div className="chat-header">
        <h2># general</h2>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      {loading ? (
        <div className="chat-loading">Loading messages…</div>
      ) : (
        <MessageList messages={messages} currentUid={currentUser?.uid ?? ''} />
      )}
      <MessageInput onSend={handleSend} disabled={!currentUser} />
    </main>
  );
}
