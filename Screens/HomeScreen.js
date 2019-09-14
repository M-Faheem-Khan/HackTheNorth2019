import React, { Component } from "react";
import {
  View,
  Text,
  Container,
  Content,
  Item,
  Form,
  Label,
  Input,
  Card,
  CardItem,
  Icon
} from "native-base";

class HomeScreen extends Component {
  static navigationOptions = {
    title: "Profile"
  };
  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem>
              <Icon active name="home" />
              <Input
                textContentType="emailAddress"
                onChangeText={event => this.setState({ email: event })}
                placeholder="Email"
              />
            </CardItem>

            <CardItem>
              <Input
                textContentType="emailAddress"
                onChangeText={event => this.setState({ password: event })}
                placeholder="Password"
              />
              <Icon active name="swap" />
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default HomeScreen;
