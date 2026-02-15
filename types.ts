
export interface Service {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  priceStart: number;
}

export interface Review {
  id: number;
  author: string;
  content: string;
  rating: number;
  date: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
