export interface Page {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface PageResponse<T> {
  info: Page;
  results: T[];
}
