export type Nulleable<T> = T | null;

export type Pagination = {
  offset: number;
  limit: number;
};

export type QueryParams = Pagination & {
  name?: string;
};
