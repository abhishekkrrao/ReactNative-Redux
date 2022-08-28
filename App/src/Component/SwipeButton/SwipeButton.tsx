import React from 'react';
import { Dimensions, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { appColor } from '../../../Styles';

const { width } = Dimensions.get('window');
const size = 50;

type ButtonProps = {
  progress: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
};
function SwipeButton({ progress, y }: ButtonProps): React.ReactElement {
  const style = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 0.1], [1, 0], Extrapolate.CLAMP),
      transform: [
        {
          translateX: interpolate(
            progress.value,
            [0, 0.4],
            [width - size - 8, 0]
          ),
        },
        {
          translateY: y.value - size / 2,
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[{ width: size*2,marginEnd:200, height: size,zIndex:999, borderRadius: size / 2, justifyContent: 'center', alignItems: 'center', backgroundColor: "red" }, style]}>
      <Text style={{ color: appColor.white }}>{"Button"}</Text>
    </Animated.View>
  );
}

export default SwipeButton;