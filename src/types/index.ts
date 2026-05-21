export interface Message {
  id: string;
  text: string;
  uid: string;
  displayName: string;
  photoURL: string | null;
  createdAt: number;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
