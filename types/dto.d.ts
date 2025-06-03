import { Models } from "react-native-appwrite";

declare type MetricsDto = {
  searchTerm: string;
  count?: number;
  poster_url: string;
  movie_id: number;
  title: string;
} & Models.Document;

declare global {
  type TMetricsDto = MetricsDto;
}