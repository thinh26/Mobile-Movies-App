import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID;

const client: Client = new Client()
  .setEndpoint(
    `${process.env.EXPO_PUBLIC_APPWRITE_API_BASE_URL}${process.env.EXPO_PUBLIC_APPWRITE_API_VERSION}`
  )
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);

const database: Databases = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments<TMetricsDto>(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal("searchTerm", query)]
    );

    const existingMovie = result.documents.at(0);
    if (existingMovie) {
      await database.updateDocument<TMetricsDto>(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: (existingMovie.count ?? 0) + 1
        }
      );
    }
    else {
      await database.createDocument<TMetricsDto>(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `${process.env.EXPO_PUBLIC_TMDB_MOVIE_POSTER_URL}${movie.poster_path}`
      });
    }
  }
  catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  Array<TrendingMovie> | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count")
    ]);

    return result.documents as unknown as Array<TrendingMovie>;
  }
  catch (error) {
    console.error(error);
    return undefined;
  }
};
