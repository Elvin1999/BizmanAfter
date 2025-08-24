import { Button, Text, View } from "react-native";
import { removeToken } from "../utils/auth";

export default function HomeScreen({ navigation }: any) {
    const logout = async () => {
        await removeToken();
        navigation.replace('Login');
    };

    return (
        <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Welcome to Bizman!</Text>
            <Button title="Go Clients" onPress={() => navigation.navigate('Clients')}></Button>
            <Button title="Logout" onPress={logout} />
        </View>
    )
}