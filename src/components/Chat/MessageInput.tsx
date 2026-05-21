import { FormEvent, useState } from 'react';

interface Props {
  onSend: (text: string) => Promise<void>;
  disabled?: boolean;
}

export function MessageInput({ onSend, disabled }: Props) {
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    setSending(true);
    try {
      await onSend(trimmed);
      setText('');
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message…"
        disabled={disabled || sending}
        maxLength={500}
        aria-label="Message"
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!text.trim() || disabled || sending}
      >
        Send
      </button>
    </form>
  );
}
