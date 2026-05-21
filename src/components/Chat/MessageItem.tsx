import type { Message } from '../../types';

interface Props {
  message: Message;
  isOwn: boolean;
}

export function MessageItem({ message, isOwn }: Props) {
  const time = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className={`message ${isOwn ? 'message-own' : 'message-other'}`}>
      {!isOwn && <div className="message-author">{message.displayName}</div>}
      <div className="message-bubble">
        <span className="message-text">{message.text}</span>
        {time && <span className="message-time">{time}</span>}
      </div>
    </div>
  );
}
