import { View, TextInput, Image } from "react-native";
import type { NativeSyntheticEvent, NativeTouchEvent } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

type SearchBarProps = Readonly<{
  onPress?: (e: NativeSyntheticEvent<NativeTouchEvent>) => void;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}>;

const SearchBar = ({ onPress, placeholder, value, onChangeText }: SearchBarProps) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white font-dmRegular"
      />
    </View>
  );
};

export default SearchBar;
