import React, {useState} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {SafeAreaView, Text, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Dimensions} from 'react-native';
import {View, Image} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const {width: PAGE_WIDTH} = Dimensions.get('window');

const colors = [
  '#26292E',
  '#899F9C',
  '#B3C680',
  '#5C6265',
  '#F5D399',
  '#F1F1F1',
];

const Test = () => {
  const [progressValue, setProgressValue] = useState(0);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={{flex: 1}}>
      <Text>111</Text>
      <Carousel
        loop
        width={PAGE_WIDTH}
        pagingEnabled={true}
        height={PAGE_WIDTH / 2}
        data={[...new Array(6).keys()]}
        onProgressChange={(_, absoluteProgress) =>
          setProgressValue(absoluteProgress)
        }
        renderItem={({index}) => (
          <View key={index}>
            <Image source={require('../images/Pencil.png')} />
          </View>
        )}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 100,
          alignSelf: 'center',
        }}>
        {colors.map((backgroundColor, index) => {
          return (
            <PaginationItem
              backgroundColor={'#CF3339'}
              animValue={progressValue}
              index={index}
              key={index}
              length={colors.length}
            />
          );
        })}
      </View>
    </View>
  );
};
const PaginationItem = props => {
  const {animValue, index, length, backgroundColor} = props;
  const width = 10;
  console.log(animValue);
  console.log(index);
  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        backgroundColor: 'white',
        width: Math.round(animValue) === index ? 20 : width,
        height: width,
        borderRadius: 50,
        overflow: 'hidden',
        transform: [
          {
            rotateZ: '0deg',
          },
        ],
      }}>
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};
export default Test;
