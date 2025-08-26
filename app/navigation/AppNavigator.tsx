import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import ClientDetails from '../screens/ClientDetailsScreen';
import ClientScreen from '../screens/ClientScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { getToken } from '../utils/auth';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const checkLogin = async () => {
            getToken().then((data) => {
                setIsLoggedIn(data !== "");
            });
        };

        checkLogin();
    }, []);

    if (!isLoggedIn) return null;

    return (
        <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Clients' component={ClientScreen} />
            <Stack.Screen name='ClientDetails' component={ClientDetails} />
        </Stack.Navigator>
    )


}