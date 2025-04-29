import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images";
import DMSans from "./font/DMSans";

const TrendingCard = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {
  return (
    <View>
      <Link
        href={{ pathname: "/movie/[id]", params: { id: movie_id } }}
        asChild
      >
        <TouchableOpacity className="w-32 relative pl-5 flex-1">
          <Image
            source={{ uri: poster_url }}
            className="w-32 h-48 rounded-lg "
            resizeMode="cover"
          />
          <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
            <MaskedView
              maskElement={
                <Text className="text-white text-6xl font-bold">
                  {index + 1}
                </Text>
              }
            >
              <Image
                source={images.rankingGradient}
                className="size-14"
                resizeMode="cover"
              />
            </MaskedView>
          </View>
          <DMSans.Bold
            className="text-light-200 text-sm mt-2"
            numberOfLines={2}
          >
            {title}
          </DMSans.Bold>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default TrendingCard;
