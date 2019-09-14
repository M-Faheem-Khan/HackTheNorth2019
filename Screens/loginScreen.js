import React from "react";
import { AppLoading } from "expo";
import {
  Container,
  Button,
  Icon,
  Text,
  Card,
  Input,
  Content,
  Item,
  CardItem
} from "native-base";
import firebase from "../Components/firebase";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator, createAppContainer } from "react-navigation"; // Version can be specified in package.json

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
    if (!this.state.email) {
      alert("Email is Required!");
    } else if (!this.state.password) {
      alert("Please enter password!");
    } else {
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
          alert(error.message);
        });
    }
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


        <Content padder>
          <Card rounded>
            <CardItem>
              <Item>
                <Icon active name="mail" />

                <Input
                  textContentType="emailAddress"
                  onChangeText={event => this.setState({ email: event })}
                  placeholder="Email"
                />

              </Item>
            </CardItem>
            <CardItem>
              <Item>
                <Icon active name="text" />
                <Input
                  secureTextEntry={true}
                  textContentType="emailAddress"
                  onChangeText={event => this.setState({ password: event })}
                  placeholder="Password"
                />

              </Item>
            </CardItem>

            <CardItem>
              {/* Ask the user for their name */}
              {/* Ask the user for their prefered bus -> 12, 12A .. etc */}
              <Button
                bordered
                dark
                style={styles.loginBtn}
                onPress={() => this.signUpUser()}
              >
                <Text style={styles.loginBtn}>Login</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = {
  card: {
    maxWidth: "90%"
  },
  loginBtn: {
    flex: 1,
    textAlign: "center"
  }
};

export default LoginScreen;
