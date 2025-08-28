import ClientChart from "@/components/charts/ClientChart";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { getClients, initDatabase } from "../db/database";
import { removeToken } from "../utils/auth";

export default function HomeScreen({ navigation }: any) {

    const [clients, setClients] = useState<any[]>([]);

    const logout = async () => {
        await removeToken();
        navigation.replace('Login');
    };

    const loadClients = async () => {
        await getClients((data) => {
            setClients(data);
        })
    };

    useEffect(() => {
        (async () => {
            await initDatabase();
            await loadClients();
        })();
    },[]);

    const clientsData = clients ?? [];

    return (
        <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Welcome to Bizman!</Text>
            <ClientChart clients={clientsData} />
            <Button title="Go Clients" onPress={() => navigation.navigate('Clients')}></Button>
            <Button title="Logout" onPress={logout} />
        </View>
    )
}