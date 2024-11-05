"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Chart, ChartType } from 'chart.js/auto';

const Dashboard: React.FC = () => {
    const searchParams = useSearchParams();
    const businessId = searchParams.get('businessId');
    const [salesData, setSalesData] = useState({ labels: [], values: [] });
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/business/dashboard`, {
                    params: { businessId },
                });
                console.log('Datos recibidos del backend:', response.data);
                setSalesData(response.data);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchSalesData();
    }, [businessId]);

    useEffect(() => {
        const ctx = (document.getElementById('salesChart') as HTMLCanvasElement).getContext('2d');
        if (ctx) {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            chartRef.current = new Chart(ctx, {
                type: 'bar' as ChartType,
                data: {
                    labels: salesData.labels,
                    datasets: [{
                        label: 'Cantidad Vendida',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        data: salesData.values,
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [salesData]);

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-center my-4">Dashboard de Ventas</h1>
            <canvas id="salesChart" width="400" height="200"></canvas>
        </div>
    );
};

export default Dashboard;
