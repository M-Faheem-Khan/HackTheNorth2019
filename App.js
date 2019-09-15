import LoginScreen from "./Screens/loginScreen";
import HomeScreen from "./Screens/HomeScreen";
import DashboardScreen from './Screens/selectFavoriteRoute'

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const AppNavigator = createStackNavigator(
  {
      
    Login: LoginScreen,
    Home: HomeScreen,
    Dashboard: DashboardScreen
    
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
