import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";
import join from "lodash/join";
import map from "lodash/map";
import currency from "currency.js";

const MovieInfo = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Movie Poster */}
        <View>
          <Image
            source={{
              uri: `${process.env.EXPO_PUBLIC_TMDB_MOVIE_POSTER_URL}${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>
        {/* Movie Detail Info */}
        <View className="flex-col items-start justify-center mt-5 px-5">
          {/* Movie Name */}
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            {/* Release year */}
            <Text className="text-light-200 text-sm">
              {movie?.release_date.split("-")[0]}
            </Text>
            {/* Duration */}
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>
          {/* Rating */}
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-xm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>
          {/* Movies Overview */}
          <MovieInfo label="Overview" value={movie?.overview} />
          {/* Movies Genres */}
          <MovieInfo
            label="Genres"
            value={join(
              map(movie?.genres, (g) => g.name),
              " - "
            )}
          />
          {/* Budget and Revenue */}
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`${currency(movie?.budget || 0, {
                precision: 0,
                symbol: "$",
              })
                .divide(1_000_000)
                .format()} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`${currency(movie?.revenue || 0, {
                precision: 3,
                symbol: "$",
              })
                .divide(1_000_000)
                .format()}`}
            />
          </View>
          {/* Movies Labels */}
          <MovieInfo
            label="Production Companies"
            value={join(
              map(movie?.production_companies, (c) => c.name),
              " - "
            )}
          />
        </View>
      </ScrollView>
      {/* Go back button */}
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
