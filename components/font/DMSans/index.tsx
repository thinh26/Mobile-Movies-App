import { View, Text, type TextProps } from "react-native";
import React, { PropsWithChildren } from "react";
import clsx from "clsx";

const DMSans = (props?: PropsWithChildren<TextProps>) => {
  return (
    <Text {...props} className={clsx("font-dmRegular", props?.className)}>
      {props?.children}
    </Text>
  );
};

const DMSansBold = (props?: PropsWithChildren<TextProps>) => {
  return (
    <Text {...props} className={clsx("font-dmBold", props?.className)}>
      {props?.children}
    </Text>
  );
};

const DMSansSemiBold = (props?: PropsWithChildren<TextProps>) => {
  return (
    <Text {...props} className={clsx("font-dmSemiBold", props?.className)}>
      {props?.children}
    </Text>
  );
};

DMSans.Bold = DMSansBold;
DMSans.SemiBold = DMSansSemiBold;
export default DMSans;
