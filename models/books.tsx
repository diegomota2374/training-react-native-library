export interface Chapter {
  number: number;
  title: string;
  content: string;
}

export interface Book {
  id?: string;
  title: string;
  author: string;
  genre: string;
  description?: string;
  image?: string;
}

export interface NavigateFormBook {
  navigate: string;
}

export interface FormBookProps {
  initialBook: Book | String;
}
