import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appWrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Text,
  FlatList
} from "react-native";

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError
  } = useFetch(() => fetchMovies({ query: "" }));

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError
  } = useFetch(getTrendingMovies);

  return (
    <View className="flex-1 bg-primary">
      <Image className="absolute w-full z-0" source={images.bg} />
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <Image className="w-12 h-10 mt-20 mb-5 mx-auto" source={icons.logo} />
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            className="mt-10 self-center"
            color="#0000ff"
            size="large"
          />
        ) : moviesError || trendingError ? (
          <Text>Error: {moviesError?.message || trendingError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              placeholder="Search for a movie"
              onPress={() => router.push("/search")}
            />
            {trendingMovies && (
              <View className="mt-10 ">
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  className="mb-4 mt-3"
                  data={trendingMovies}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  keyExtractor={(item) => item.movie_id.toString()}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    gap: 26
                  }}
                  renderItem={({ item, index }) => (
                    <TrendingCard index={index} movie={item} />
                  )}
                />
              </View>
            )}
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>
              <FlatList
                className="mt-2 pb-32"
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                renderItem={({ item }) => <MovieCard {...item} />}
                scrollEnabled={false}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10
                }}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
