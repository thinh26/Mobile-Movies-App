import { View, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import DMSans from "@/components/font/DMSans";

const Saved = () => {
  return (
    <View className="bg-primary flex-1">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.person} className="size-10" tintColor="#fff" />
        <DMSans className="text-gray-500 text-base">Saved</DMSans>
      </View>
    </View>
  );
};

export default Saved;
