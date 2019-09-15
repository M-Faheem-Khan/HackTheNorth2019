
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
  H1,
  Button
} from "native-base";
import { FontAwesome as Icon } from "@expo/vector-icons";
import firebase from "../Components/firebase";
import LottieView from "lottie-react-native";
import DisplayRoutes from '../Components/routeNum'




class selectFavoriteRoute extends Component {
    static navigationOptions = {
        header: null
      };
      state={name: null, school: null, route: null, number: null}
      async componentDidMount() {
        await Font.loadAsync({
          Roboto: require("../node_modules/native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("../node_modules/native-base/Fonts/Roboto_medium.ttf"),
          ...Ionicons.font
        });
        this.getDataFromFirebase()
        this.setState({ isReady: true });
      }

      getDataFromFirebase = () => {
        firebase.firestore().collection("Users").doc(this.props.navigation.getParam("docID")).get().then((doc) => {
          this.setState({ name: doc.data().name, school: doc.data().university, route: doc.data().route, number: doc.data().number})
        })
      }

  render() {
    return (
     <Container>
       <Text>Hey there {this.state.name}, let's get you there InTime today.</Text>
       <Card>
         <CardItem>
           <Text> What is your prefered route?</Text>
            <DisplayRoutes />

         </CardItem>
         <CardItem>
           <Text>Your fitbit-number companion number is {this.state.number}</Text>
         </CardItem>

       </Card>
     </Container>
    )
  }
}

export default selectFavoriteRoute;