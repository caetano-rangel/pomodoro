import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, Entypo } from "@expo/vector-icons"
import Home from "./components/Home/home";
import Guia from "./components/Guia/guia";
import Badges from "./components/Badges/badges";


const Tab = createBottomTabNavigator();

function Routes(){
    return(
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: '#D6BD98',
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: "#1A3636",
                height: 80,
                paddingTop: 5,
                borderTopWidth: 0,
                elevation: 0, 
                shadowOpacity: 0,
            }
            }}>
            <Tab.Screen name="Home" component={Home}
            options={{
                headerShown: false,
                tabBarIcon: ({color, size, focused}) => {
                    if(focused){
                        return <Ionicons name="home" size={size} color={color} />
                    }
                    return <Ionicons name="home-outline" size={size} color={color} />
                }
            }}
            />
            <Tab.Screen name="Badges" component={Badges}
            options={{
                headerShown: false,
                tabBarIcon: ({color, size, focused}) => {
                    if(focused){
                        return <Entypo name="medal" size={size} color={color} />
                    }
                    return <Entypo name="medal" size={size} color={color} />
                }
            }}
            />
            <Tab.Screen name="Guia" component={Guia}
            options={{
                headerShown: false,
                tabBarIcon: ({color, size, focused}) => {
                    if(focused){
                        return <Ionicons name="help" size={size} color={color} />
                    }
                    return <Ionicons name="help-outline" size={size} color={color} />
                }
            }}
            />
        </Tab.Navigator>
    )
}

export default Routes;
       
