import React from "react"; // react
import { AppLoading } from "expo"; // expo
import { View, KeyboardAvoidingView, Platform } from "react-native"
import {
  Container,
  Button,
  Icon,
  Text,
  Card,
  Input,
  Content,
  Item,
  CardItem,
  H1
} from "native-base"; // native-base components
import firebase from "../Components/firebase"; // firebase
import * as Font from "expo-font"; // fonts
import { Ionicons } from "@expo/vector-icons"; // icons
import LottieView from "lottie-react-native"; // lottie
import { createStackNavigator, createAppContainer } from "react-navigation"; // Version can be specified in package.json

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
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
                  docID: docID.id
                });
              });
          });
        })
        .catch(error => {
          alert(error.message);
        });
    }
  };

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    
    return (
		<KeyboardAvoidingView
                behavior={"padding"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={1}
            >
      <Container>
        <Content
          contentContainerStyle={{ justifyContent: "center", flex: 1 }}
          padder
          style={styles.verticalAlign}
        >
			
          <View style={styles.animationContainer}>
            <LottieView
              ref={animation => {
                this.animation = animation;
			  }}
              style={{
                width: 150,
                height: 150,
                backgroundColor: "#fff"
              }}
			  source={require("../Animations/bus_animation")}
			  autoPlay loop
            />
			<H1 style={styles.title}>Sign Up</H1>
          </View>
		  
		  
          {/* <Card rounded> */}
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
                <Icon active name="lock" />
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
				danger
              >
                <Text style={styles.loginBtn}>Sign Up</Text>
              </Button>
            </CardItem>
          {/* </Card> */}
        </Content>
      </Container>
	  </KeyboardAvoidingView>
    );
  }
}

const styles = {
  card: {
    maxWidth: "85%"
  },
  loginBtn: {
    flex: 1,
	textAlign: "center",
	color: "rgb(206, 75,77)"
  },
  verticalAlign: {
    flex: 1,
    textAlignVertical: "center"
  },
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
	display: "flex"
  },
  buttonContainer: {
    paddingTop: 20
  },
  title: {
	  textAlign: "center",
	  fontSize: 35,
	  paddingTop: 30,
	  
  }
};

export default LoginScreen;
