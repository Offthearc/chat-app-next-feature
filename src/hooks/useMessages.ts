import { useEffect, useState } from 'react';
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Message } from '../types';

export function useMessages(roomId = 'general') {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'rooms', roomId, 'messages'),
      orderBy('createdAt', 'asc'),
      limit(100),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];
        setMessages(msgs);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [roomId]);

  async function sendMessage(text: string, uid: string, displayName: string, photoURL: string | null) {
    await addDoc(collection(db, 'rooms', roomId, 'messages'), {
      text: text.trim(),
      uid,
      displayName,
      photoURL,
      createdAt: serverTimestamp(),
    });
  }

  return { messages, loading, error, sendMessage };
}
