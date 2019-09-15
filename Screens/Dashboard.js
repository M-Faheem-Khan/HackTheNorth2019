import React from "react";
import {
  Text,
  Container,
  Card,
  CardItem,
  Content,
  View,
  Form,
  H1,
  Picker
} from "native-base";
import firebase from "../Components/firebase";
import { AppLoading } from "expo";
import * as Font from "expo-font"; // fonts
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons"; // icons

class Dashboard extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    name: null,
    school: null,
    route: null,
    number: null,
    isReady: false,
    isModalVisible: false,
    selected: null
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("../node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("../node_modules/native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });

    this.setState({ isReady: true });
    this.getDataFromFirebase();
  }

  getDataFromFirebase = () => {
    firebase
      .firestore()
      .collection("Users")
      .doc(this.props.navigation.getParam("docID"))
      .get()
      .then(doc => {
        console.log(doc.data());
        this.setState({
          name: doc.data().name,
          school: doc.data().university,
          route: doc.data().route,
          number: doc.data().number
        });
      });
  };

  onValueChange(value) {
    this.setState({
      selected: value
    });

    firebase
      .firestore()
      .collection("Users")
      .doc(this.props.navigation.getParam("docID"))
      .update({
        route: value,
        DateModified: new Date().toISOString()
      });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    console.log(this.state);
    return (
      <Container padder>
        <View style={styles.view}>
          <View style={styles.viewChild} >
            <LottieView style={styles.animation}
              ref={animation => {
                this.animation = animation;
              }}
              style={{
                width: 170,
                height: 170,
                backgroundColor: "#fff"
              }}
              source={require("../Animations/stopwatch.json")}
              autoPlay
              loop={false}
            />
            <H1 style={styles.title}>Hi, {this.state.name}</H1>
          </View>
        </View>
        <Content padder>
          <Card transparent>
            <CardItem>
              <Text>Let's get you there InTime</Text>
            </CardItem>
            <CardItem>
              <Text>
                Your fitbit companion number is
                <Text style={styles.companionNumber}>{this.state.number}</Text>
              </Text>
            </CardItem>
            <CardItem footer>
              {/* <Button full danger bordered dark style={{ flex: 1, textAlign: "center" }} onPress={this.toggleModal} >
                <Text>Set Route Prefrence</Text>
              </Button> */}
              <Form>
                <Text>Please Select a prefered route:</Text>
                <Picker
                  note
                  mode="dropdown"
                  label="Prefered Route"
                  style={{ width: 120 }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Picker.Item label="5" value={5} />
                  <Picker.Item label="7" value={7} />
                  <Picker.Item label="9" value={9} />
                  <Picker.Item label="12" value={12} />
                  <Picker.Item label="13" value={13} />
                  <Picker.Item label="19" value={19} />
                  <Picker.Item label="29" value={29} />
                  <Picker.Item label="31" value={31} />
                  <Picker.Item label="201" value={201} />
                  <Picker.Item label="202" value={202} />
                </Picker>
              </Form>
            </CardItem>
          </Card>
        </Content>
      </Container>
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
    paddingTop: 100
  },
  animation: {
    paddingTop: 100
  },
  Lottie: {
    width: 150,
    height: 150,
    backgroundColor: "#fff"
  },
  title: { textAlign: "center", fontSize: 32, paddingTop: 10},
  container: {
    textAlign: "center",
    fontSize: 32,
    paddingTop: 30,
    display: "flex"
  },
  loginBtn: {
    flex: 1,
    textAlign: "center"
  },
  header: {
    flex: 1,
    alignItems: "center"
  },
  companionNumber: {
    color: "rgb(206, 75,77)"
  }
};

export default Dashboard;
