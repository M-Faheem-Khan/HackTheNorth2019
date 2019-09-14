import LoginScreen from "./Screens/loginScreen";
import HomeScreen from "./Screens/HomeScreen";
import FirstOpen from "./Screens/FirstOpen";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const AppNavigator = createStackNavigator(
  {
    //FirstOpen: FirstOpen,
    Login: LoginScreen,
    Home: HomeScreen,
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#000",
      headerStyle: {
        backgroundColor: "#fff",
        elevation: 0,
        alignContent: "center",
        display: "flex"
      },
      headerTitleStyle: {
        flex: 1,
        color: "#000",
        fontWeight: "normal",
        alignSelf: "center",
        textAlign: "center"
      },
      shadowColor: "transparent"
    }
  }
);


export default createAppContainer(AppNavigator);
