import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Title } from 'react-admin';
import { Line } from 'react-chartjs-2';
import { fetchUtils } from 'react-admin';

// Chart.js setup
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title as ChartTitle,
    Tooltip,
    Legend
} from 'chart.js';
import { useMsgRpc } from './shared/hooks/useMsgRpc.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartTitle,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const msgRpc = useMsgRpc()
    // State for metrics
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalTrunks, setTotalTrunks] = useState(0);
    const [activeCalls, setActiveCalls] = useState(0);
    const [callData, setCallData] = useState({
        labels: [], // Time labels
        datasets: []
    });

    // Fetch data for metrics
    useEffect(() => {
        const fetchData = async () => {
            // Fetch users
            /*
            msgRpc.rpcClientConnections.get('')
            const usersResponse = await fetchUtils.fetchJson('/api/users');
            setTotalUsers(usersResponse.json.length);

            // Fetch trunks
            const trunksResponse = await fetchUtils.fetchJson('/api/trunks');
            setTotalTrunks(trunksResponse.json.length);

            // Fetch active calls
            const callsResponse = await fetchUtils.fetchJson('/api/calls?status=active');
            setActiveCalls(callsResponse.json.length);

            // Fetch call traffic data for chart
            const callTrafficResponse = await fetchUtils.fetchJson('/api/calls/traffic');
            const callTrafficData = callTrafficResponse.json;
            setCallData({
                labels: callTrafficData.timestamps,
                datasets: [
                    {
                        label: 'Calls Over Time',
                        data: callTrafficData.callCounts,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                    }
                ]
            });
            */
        };

        fetchData();
    }, []);

    return (
        <div>
            <Title title="VoIP Dashboard" />
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                <Card>
                    <CardContent>
                        <Typography variant="h5">Total Users</Typography>
                        <Typography variant="h3">{totalUsers}</Typography>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Typography variant="h5">Total Trunks</Typography>
                        <Typography variant="h3">{totalTrunks}</Typography>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Typography variant="h5">Active Calls</Typography>
                        <Typography variant="h3">{activeCalls}</Typography>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Call Traffic Over Time
                    </Typography>
                    <Line data={callData} />
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
