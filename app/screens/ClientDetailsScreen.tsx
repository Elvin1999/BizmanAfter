import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { getClientSales } from "../db/database";

export default function ClientDetails({ route }: any) {
    const navigation: any = useNavigation();

    const { client } = route.params;
    const [sales, setSales] = useState<any[]>([]);

    useEffect(() => {
        getClientSales(client.id, (data: any[]) => {
            setSales(data);
        })
    }, [client]);

    return (
        <SafeAreaView style={{ padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Name : {client.name}</Text>
            <Text>Phone : {client.phone}</Text>
            <Text>Email : {client.email}</Text>
            <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold' }}>Sales</Text>
            <ScrollView>
                {
                    sales.map((sale) => (
                        <View key={sale.id} style={{ marginVertical: 8, padding: 8, backgroundColor: '#eee' }}>
                            <Text>
                                Amount : {sale.amount}
                            </Text>
                            <Text>
                                Date : {sale.date}
                            </Text>
                        </View>
                    ))
                }
            </ScrollView>
            <Button mode="contained" style={{ marginTop: 12 }} onPress={() => navigation.navigate('AddSale', { client })}>
                Add Sale
            </Button>
        </SafeAreaView>
    )
}