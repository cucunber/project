import { IArticleMap } from "@/sections/article/article.type";

type ReviewAuthor = {
  name: string;
};

type ReviewContent = {
  description: IArticleMap[];
};

type Review = {
  author: ReviewAuthor;
  review: ReviewContent;
  mark: number;
  createdAt: string;
};

export interface ReviewResponse {
  reviews: Review[];
}

export const reviewRoutes = {
  reviews: "/data/reviews/reviews.json",
};
