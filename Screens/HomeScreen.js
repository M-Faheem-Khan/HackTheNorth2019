import React, { Component } from "react";
import {
  View,
  Text,
  Container,
  Content,
  Input,
  CardItem,
  H1,
  Button
} from "native-base";
import { KeyboardAvoidingView } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons"
import firebase from "../Components/firebase";
import LottieView from "lottie-react-native";

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = { name: null, DOB: null, university: null, redirecting: false, docID: null };
  

  updateProfile = () => {
    if (!this.state.name) {
      alert("Enter Name");
    } else if (!this.state.DOB) {
      alert("Please Enter Date of Birth");
    } else if (!this.state.university) {
      alert("Please Enter Educational Institution Name");
    } else {
      this.setState({redirecting: true, docID: this.props.navigation.getParam("docID")})
      firebase
        .firestore()
        .collection("Users")
        .doc(this.props.navigation.getParam("docID"))
        .update({
          name: this.state.name,
          DOB: this.state.DOB,
          university: this.state.university,
          route: 1,
          number: Math.ceil((Math.random()) * 9000)
        }).then((data) => {
          this.props.navigation.navigate("Dashboard", {
            docID: this.state.docID
          })
        });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }} keyboardVerticalOffset={1}>
        <Container style={styles.container}>
          <View style={styles.view}>
            <View style={styles.viewChild}>
              <LottieView
                ref={animation => {
                  this.animation = animation;
                }}
                style={{
                  width: 170,
                  height: 170,
                  backgroundColor: "#fff"
                }}
                source={require("../Animations/signUp.json")}
                autoPlay
                loop
              />
              <H1 style={styles.title}>Sign Up</H1>
            </View>
            
          </View>
          <Content style={styles.container}>
            <CardItem>
              <Icon style={{ padding: 1 }} name="id-card-o" size={28} />
              <Input
                onChangeText={event => this.setState({ name: event })}
                placeholder="Super cool nickname"
              />
            </CardItem>

            <CardItem>
              <Icon style={{ padding: 1 }} name="calendar-times-o" size={28} />
              <Input
                onChangeText={event => this.setState({ DOB: event })}
                placeholder="I was born on... (DD-MM-YYYY)"
              />
            </CardItem>

            <CardItem>
              <Icon style={{ padding: 1 }} name="university" size={28} />
              <Input
                onChangeText={event => this.setState({ university: event })}
                placeholder="I currently attend..."
              />
            </CardItem>

            <CardItem >
              {/* Ask the user for their name */}
              {/* Ask the user for their prefered bus -> 12, 12A .. etc */}
              <Button
              disabled={this.state.redirecting}
                onPress={() => this.updateProfile()}
                danger
                bordered
                dark
                style={{
                  flex: 1,
                  textAlign: "center",
                  color: "111"
                }}
              >
                <Text style={styles.loginBtn}>Let's go!</Text>
              </Button>
            </CardItem>
          </Content>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  view: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  viewChild: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    paddingTop: 7
  },
  Lottie: {
    width: 150,
    height: 150,
    backgroundColor: "#fff"
  },
  title: { textAlign: "center", fontSize: 32, paddingTop: 70 },
  container: {
    textAlign: "center",
    fontSize: 32,
    paddingTop: 30,
    display: "flex"
  },
  loginBtn: {
    flex: 1,
	textAlign: "center",
	
  },
};

export default HomeScreen;
