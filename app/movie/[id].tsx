import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";
import join from "lodash/join";
import map from "lodash/map";
import currency from "currency.js";
import { getYear } from "date-fns/fp";
import {
  convertMinutesToHoursAndMinutes,
  formatTimeConversion,
  TimeFormatOption,
} from "@/utils";
import DMSans from "@/components/font/DMSans";

const MovieInfo = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) => (
  <View className="flex-col items-start justify-center mt-5">
    <DMSans className="text-light-200 text-sm">{label}</DMSans>
    <DMSans.Bold className="text-light-100 text-sm mt-2">
      {value || "N/A"}
    </DMSans.Bold>
  </View>
);

const MovieDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  const movieTime = [
    getYear(movie?.release_date || "1970-01-01"),
    formatTimeConversion(
      convertMinutesToHoursAndMinutes(movie?.runtime),
      TimeFormatOption.SHORT
    ),
  ];

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
          <DMSans.Bold className="text-white text-xl">
            {movie?.title}
          </DMSans.Bold>
          {/* Release year and duration */}
          <View className="flex-row items-center gap-x-1 mt-2">
            <DMSans className="text-light-200 text-sm">
              {join(movieTime, " - ")}
            </DMSans>
          </View>
          {/* Rating */}
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <DMSans.Bold className="text-white text-xm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </DMSans.Bold>
            <DMSans className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </DMSans>
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
        <DMSans.SemiBold className="text-white text-base">
          Go back
        </DMSans.SemiBold>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
