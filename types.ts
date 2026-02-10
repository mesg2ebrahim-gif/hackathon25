
export interface UserRegistration {
  id: string;
  fullName: string;
  cnic: string;
  email: string;
  phone: string;
  address: string;
  program: string;
  issueDate: string;
  profileImage?: string; // Base64 string of the uploaded photo
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export enum AppRoute {
  HOME = 'home',
  REGISTER = 'register',
  ID_CARD = 'id-card',
  FAQS = 'faqs',
  SUPPORT_CHAT = 'support-chat',
  ADMIN = 'admin'
}
