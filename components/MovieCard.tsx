import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

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
        <Text
          className="text-sm font-bold text-white mt-2 flex-1"
          numberOfLines={2}
        >
          {title}
        </Text>
        {/* Rating */}
        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(vote_average)}
          </Text>
        </View>
        {/* Year of Release */}
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 text-white">
            {release_date?.split("-")[0]}
          </Text>
        </View>
        {/*  */}
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
