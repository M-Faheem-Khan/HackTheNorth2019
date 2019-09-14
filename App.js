import LoginScreen from "./Screens/loginScreen";
import HomeScreen from "./Screens/HomeScreen";
import FirstOpen from "./Screens/FirstOpen";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const AppNavigator = createStackNavigator(
  {
    //FirstOpen: FirstOpen,
    Home: HomeScreen,
    Login: LoginScreen
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
      shadowColor: "transparent"
    }
  }
);

export default createAppContainer(AppNavigator);
