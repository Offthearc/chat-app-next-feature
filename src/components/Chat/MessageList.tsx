import { useEffect, useRef } from 'react';
import type { Message } from '../../types';
import { MessageItem } from './MessageItem';

interface Props {
  messages: Message[];
  currentUid: string;
}

export function MessageList({ messages, currentUid }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="message-list message-list-empty">
        <p>No messages yet. Say hello!</p>
      </div>
    );
  }

  return (
    <div className="message-list">
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} isOwn={msg.uid === currentUid} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
