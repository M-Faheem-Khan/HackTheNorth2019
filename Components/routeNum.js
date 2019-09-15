import React from "react";
import { ListItem, Text, Left, Right, Radio, View } from "native-base";

export default class routeNum extends React.Component {
  populateRoutesList(route) {
    return (
      <ListItem key={route.number}>
        <Left>
          <Text>{route.number}</Text>
        </Left>
        <Right>
          <Radio selected={false} />
        </Right>
      </ListItem>
    );
  }
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
        <Text>Hello World</Text>
        {/* {
          this.props.RouteList.forEach(route => this.populateRoutesList(route))
        } */}
      </View>
    );
  }
}
