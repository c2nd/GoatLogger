export type Category = 
  | 'All'
  | 'Architecture' 
  | 'Design & Craft' 
  | 'Technology' 
  | 'Culture' 
  | 'Philosophy';

export type NeutralTheme = 'paper' | 'crisp' | 'charcoal';

export interface Author {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export interface SectionContent {
  id: string;
  title?: string;
  body: string[];
  pullQuote?: string;
  quoteAuthor?: string;
  captionedImage?: {
    src: string;
    caption: string;
    figureNo: string;
  };
  keyTakeaway?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: Exclude<Category, 'All'>;
  date: string;
  readTime: string;
  author: Author;
  coverImage: string;
  imageCaption: string;
  featured?: boolean;
  claps: number;
  bookmarksCount: number;
  sections: SectionContent[];
  footnotes?: string[];
  relatedIds?: string[];
}

export interface Comment {
  id: string;
  articleId: string;
  authorName: string;
  date: string;
  content: string;
  likes: number;
}
