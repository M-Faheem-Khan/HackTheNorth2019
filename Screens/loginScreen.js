import React from "react";
import { AppLoading } from "expo";
import {
  Container,
  Button,
  Icon,
  Header,
  Left,
  Right,
  Body,
  Text,
  Title,
  Input,
  Content,
  Item,
  Card,
  CardItem
} from "native-base";
import firebase from "../Components/firebase";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: "Login"
  };
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      email: null,
      password: null
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("../node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("../node_modules/native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }
  signUpUser = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        firebase.auth().onAuthStateChanged(user => {
          firebase
            .firestore()
            .collection("Users")
            .add({
              email: user.email,
              UUID: user.uid
            })
            .then(docID => {
              this.props.navigation.navigate("Home", {
                docID: docID
              });
            });
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  signInUser = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        firebase.auth().onAuthStateChanged(user => {
          this.props.navigation.navigate("Home", {
            UUID: user.uid
          });
        });
      });
  };

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    console.log(this.state);
    return (
      <Container>
        {/* Add the input here */}

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

        {/* Ask the user for their name */}
        {/* Ask the user for their prefered bus -> 12, 12A .. etc */}
        <Button onPress={() => this.signUpUser()}>
          <Text>Hello</Text>
        </Button>
      </Container>
    );
  }
}

export default LoginScreen;
