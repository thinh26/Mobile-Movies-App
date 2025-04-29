import { View, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";
import DMSans from "./font/DMSans";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={{ pathname: "/movie/[id]", params: { id } }} asChild>
      <TouchableOpacity className="w-[30%]">
        {/* Movie info */}
        <Image
          source={{
            uri: poster_path
              ? `${process.env.EXPO_PUBLIC_TMDB_MOVIE_POSTER_URL}${poster_path}`
              : process.env.EXPO_PUBLIC_FALLBACK_POSTER_URL,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <DMSans.Bold
          className="text-sm text-white mt-2 flex-1"
          numberOfLines={2}
        >
          {title}
        </DMSans.Bold>
        {/* Rating */}
        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} />
          <DMSans.Bold className="text-xs text-white uppercase">
            {Math.round(vote_average)}
          </DMSans.Bold>
        </View>
        {/* Year of Release */}
        <View className="flex-row items-center justify-between">
          <DMSans className="text-xs text-light-300">
            {release_date?.split("-")[0]}
          </DMSans>
        </View>
        {/*  */}
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
