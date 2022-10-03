import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../src";
import News from "../src/news/index";
import NewsDetail from "../src/news/detail";
import DrawerNavigators from "./drawer";

export default function Navigators() {

    const Stack = createStackNavigator()

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Index"
                    component={DrawerNavigators}
                    options={{
                        headerShown:false,
                    }}
                />
                <Stack.Screen
                    name="NewsList"
                    options={{
                        headerTitle:"Berita Sekolah"
                    }}
                    component={News}
                />
                <Stack.Screen
                    name="NewsDetail"
                    component={NewsDetail}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}