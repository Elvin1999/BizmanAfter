import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';

export default function ClientSalesChart({ salesObject }: any) {
    const [salesData, setSalesData] = useState<any[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const groupedData = (salesObject.sales as any[]).reduce((acc, sale) => {
                const dateKey = sale.date.slice(5);
                if (acc[dateKey]) {
                    acc[dateKey] += sale.amount;
                } else {
                    acc[dateKey] = sale.amount;
                }
                return acc;
            }, {});

            const data = Object.keys(groupedData).map((key) => ({
                x: key,
                y: groupedData[key],
            }));

            setSalesData(data);
        };
        fetch();
    }, [salesObject]);

    if (salesData.length === 0) {
        return <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }} >No available data</Text>
    }

    return (
        <View style={{ marginVertical: 12 }}>
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Sales trend</Text>
            <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
                <VictoryBar data={salesData} />
            </VictoryChart>
        </View>
    )
}