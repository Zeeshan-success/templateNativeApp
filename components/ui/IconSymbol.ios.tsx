import { SymbolView, SymbolViewProps, SymbolWeight } from "expo-symbols";
import { StyleProp, ViewStyle } from "react-native";

type IconNames = SymbolViewProps["name"];

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = "regular",
}: {
  name: IconNames;
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <SymbolView
      name={name}
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}
