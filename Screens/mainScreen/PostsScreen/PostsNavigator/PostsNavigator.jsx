import { createStackNavigator } from "@react-navigation/stack";
import CommentsScreen from "../../CommentsScreen";
import MapScreen from "../../MapScreen/MapScreen";
import PostsScreen from "../PostsScreen";



const AuthStack = createStackNavigator();

const PostsNavigator = () => {
  return (
      <AuthStack.Navigator>
          <AuthStack.Screen name="Posts" component={PostsScreen} options={{headerShown: false}} />
      <AuthStack.Screen name="Comments" component={CommentsScreen} />
      <AuthStack.Screen name="Map" component={MapScreen} />
    </AuthStack.Navigator>
  );
};

export default PostsNavigator;
