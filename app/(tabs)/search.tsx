import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { updateSearchCount } from "@/services/appWrite";
import size from "lodash/size";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    // Debounce
    // Purpose: not spamming request to our backend
    const timeoutId = setTimeout(() => {
      void (async () => {
        if (searchQuery.trim()) {
          await loadMovies();
          if (size(movies) > 0 && movies?.[0]) {
            await updateSearchCount(searchQuery, movies[0]);
          }
        }
        else {
          reset();
        }
      })();
    }, 500);


    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
        source={images.bg}
      />
      <FlatList
        className="px-5"
        contentContainerStyle={{ paddingBottom: 100 }}
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={({ item }) => <MovieCard {...item} />}
        scrollEnabled={true}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16
        }}
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
        ListHeaderComponent={(
          <>
            <View className="w-full flex-row justify-center mt-20">
              <Image className="w-12 h-10" source={icons.logo} />
            </View>
            <View>
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {moviesLoading && (
              <ActivityIndicator
                className="my-3"
                color="#0000ff"
                size="large"
              />
            )}
            {moviesError && (
              <Text className="text-red-500 px-5 my-3">
                Error: {moviesError.message}
              </Text>
            )}
            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              size(movies) > 0 && (
              <Text className="text-xl text-white font-bold">
                Search result for{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
};

export default Search;
