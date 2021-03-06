import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-simple-toast";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { getRecipes, Recipe } from "./src/backend";
import { Screen } from "./src/common/Screen";
import { RecipeListItem } from "./src/RecipeListItem";
import { RecipeView } from "./src/RecipeView";

const HomeScreen = props => {
  const [recipes, setRecipes] = useState([]);

  const onRecipeItemPressed = (recipe: Recipe) => {
    props.navigation.navigate("Recipe", {
      recipe
    });
  };

  useEffect(() => {
    getRecipes()
      .then(setRecipes)
      .catch(e => {
        console.log(e);
        Toast.show(`${e}`);
      });
  }, []);

  return (
    <Screen>
      <Text>Recipes</Text>
      {recipes.map((r: Recipe) => (
        <RecipeListItem
          key={r.Id}
          recipe={r}
          onGotoPressed={() => onRecipeItemPressed(r)}
        />
      ))}
    </Screen>
  );
};

const StackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Recipes"
    }
  },
  Recipe: {
    screen: RecipeView,
    navigationOptions: {
      title: "Recipe",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-home" size={24} color="white" />
      )
    }
  }
});

const SettingsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
};

const TabNavigator = createMaterialBottomTabNavigator({
  Home: {
    screen: StackNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-home" size={24} color="white" />
      )
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: "Settings",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-settings" size={24} color="white" />
      )
    }
  }
});

export default createAppContainer(TabNavigator);
