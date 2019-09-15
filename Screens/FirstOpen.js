import React, { Component } from "react";
import { View } from "native-base";

import LottieView from "lottie-react-native";

export default class FirstOpen extends Component {
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("../node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("../node_modules/native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }
  render() {
    return (
      <View>
        <LottieView
          style={{
            width: 400,
            height: 400,
            backgroundColor: "#eee"
          }}
          source={require("../Animations/bus.json")}
        />
      </View>
    );
  }
}
