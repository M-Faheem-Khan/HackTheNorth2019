import React, { Component } from "react";

import LoginScreen from "./Screens/loginScreen";
import HomeScreen from "./Screens/HomeScreen";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const AppNavigator = createStackNavigator({
  Login: LoginScreen,
  Home: HomeScreen
});

export default createAppContainer(AppNavigator);
