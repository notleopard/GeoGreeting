import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LocationSelectionScreen from "../screens/LocationSelectionScreen";
import ImageSelectionScreen from "../screens/ImageSelectionScreen";
import ComposeGreetingCardScreen from "../screens/ComposeGreetingCardScreen";
import ShareScreen from "../screens/ShareScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SavedGreetingCardsScreen from "../screens/SavedGreetingCardsScreen";
import { AuthContext } from "../authcontext/AuthContext";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AuthContext.Consumer>
        {({ user }) => (
          <Stack.Navigator initialRouteName={user ? "Welcome" : "Login"}>
            {user ? (
              <>
                <Stack.Screen
                  name="Welcome"
                  component={WelcomeScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="LocationSelection"
                  component={LocationSelectionScreen}
                  options={{ title: "Location Selection" }}
                />
                <Stack.Screen
                  name="ImageSelection"
                  component={ImageSelectionScreen}
                  options={{ title: "Image Selection" }}
                />
                <Stack.Screen
                  name="ComposeGreetingCard"
                  component={ComposeGreetingCardScreen}
                  options={{ title: "Compose Greeting Card" }}
                />
                <Stack.Screen name="Share" component={ShareScreen} />
                <Stack.Screen
                  name="SavedGreetingCards"
                  component={SavedGreetingCardsScreen}
                  options={{ title: "Gallery" }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Register"
                  component={RegisterScreen}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </Stack.Navigator>
        )}
      </AuthContext.Consumer>
    </NavigationContainer>
  );
};

export default AppNavigator;
