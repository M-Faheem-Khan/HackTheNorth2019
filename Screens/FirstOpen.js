import React, { Component } from "react";
import { View } from "native-base";

import LottieView from "lottie-react-native";

export default class FirstOpen extends Component {
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
