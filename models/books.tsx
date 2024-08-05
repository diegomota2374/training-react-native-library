export interface Chapter {
  number: number;
  title: string;
  content: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  year: number;
  genre: string;
  img: string;
  creation_date: string;
  modification_date: string;
  chapters: Chapter;
}

export interface NavigateFormBook {
  navigate: string;
}

export interface FormBookProps {
  initialBook: Book | String;
}
