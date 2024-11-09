"use client";
import React, { useEffect, useState, useRef, FC } from 'react';
import axios from 'axios';
import { Chart, ChartType } from 'chart.js/auto';
import { getSessionId } from '../../../utils/getSessionId';

interface ChartData {
    labels: string[];
    values: number[];
}

const Dashboard: FC = () => {
    const [businessId, setBusinessId] = useState<number | null>(null);
    const [stockData, setStockData] = useState<ChartData>({ labels: [], values: [] });
    const [salesData, setSalesData] = useState<ChartData>({ labels: [], values: [] });
    const [revenueData, setRevenueData] = useState<ChartData>({ labels: [], values: [] });
    const [customerData, setCustomerData] = useState<ChartData>({ labels: [], values: [] });

    const stockChartRef = useRef<Chart | null>(null);
    const salesChartRef = useRef<Chart | null>(null);
    const revenueChartRef = useRef<Chart | null>(null);
    const customerChartRef = useRef<Chart | null>(null);

    useEffect(() => {
        const fetchBusinessId = async () => {
            try {
                const id = await getSessionId();
                setBusinessId(id);
            } catch (error) {
                console.error('Error obteniendo el ID de la sesión:', error);
            }
        };

        fetchBusinessId();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (businessId) {
                    const token = localStorage.getItem('authToken'); // Obtener el token JWT
                    const [stockResponse, salesResponse, revenueResponse, customerResponse] = await Promise.all([
                        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sales/stock`, {
                            params: { businessId },
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                            withCredentials: true
                        }),
                        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sales/dashboard`, {
                            params: { businessId },
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                            withCredentials: true
                        }),
                        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sales/revenue`, {
                            params: { businessId },
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                            withCredentials: true
                        }),
                        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sales/customers`, {
                            params: { businessId },
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                            withCredentials: true
                        })
                    ]);

                    setStockData(stockResponse.data);
                    setSalesData(salesResponse.data);
                    setRevenueData(revenueResponse.data);
                    setCustomerData(customerResponse.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [businessId]);

    useEffect(() => {
        const createChart = (ref: React.MutableRefObject<Chart | null>, ctx: CanvasRenderingContext2D | null, data: ChartData, type: ChartType, label: string) => {
            if (ctx) {
                if (ref.current) {
                    ref.current.destroy();
                }
                if (data.labels.length === 0 || data.values.length === 0) {
                    ctx.font = '16px Arial';
                    ctx.fillText('No hay datos disponibles', ctx.canvas.width / 2 - 60, ctx.canvas.height / 2);
                } else {
                    ref.current = new Chart(ctx, {
                        type: type,
                        data: {
                            labels: data.labels,
                            datasets: [{
                                label,
                                backgroundColor: [
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(192, 75, 75, 0.2)',
                                    'rgba(75, 75, 192, 0.2)',
                                    'rgba(192, 192, 75, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(192, 75, 75, 1)',
                                    'rgba(75, 75, 192, 1)',
                                    'rgba(192, 192, 75, 1)'
                                ],
                                borderWidth: 1,
                                data: data.values,
                            }]
                        },
                        options: {
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                }
            }
        };

        createChart(stockChartRef, (document.getElementById('stockChart') as HTMLCanvasElement)?.getContext('2d'), stockData, 'bar', 'Stock Existente');
        createChart(salesChartRef, (document.getElementById('salesChart') as HTMLCanvasElement)?.getContext('2d'), salesData, 'line', 'Artículos Vendidos');
        createChart(revenueChartRef, (document.getElementById('revenueChart') as HTMLCanvasElement)?.getContext('2d'), revenueData, 'pie', 'Ingresos');
        createChart(customerChartRef, (document.getElementById('customerChart') as HTMLCanvasElement)?.getContext('2d'), customerData, 'doughnut', 'Clientes'); // Gráfico de Donut
    }, [stockData, salesData, revenueData, customerData]);

    return (
        <div className="container mx-auto mb-10">
            <h1 className="text-2xl font-bold text-center my-4">Dashboard de Ventas</h1>
            <div className="grid grid-cols-2 gap-6">
                <div className="relative w-full h-96">
                    <h2 className="text-center text-xl mb-2">Stock Existente</h2>
                    <canvas id="stockChart" width="400" height="200"></canvas>
                </div>
                <div className="relative w-full h-96">
                    <h2 className="text-center text-xl mb-2">Artículos Vendidos</h2>
                    <canvas id="salesChart" width="400" height="200"></canvas>
                </div>
                <div className="relative w-full h-96">
                    <h2 className="text-center text-xl mb-2">Ingresos</h2>
                    <canvas id="revenueChart" width="400" height="200"></canvas>
                </div>
                <div className="relative w-full h-96">
                    <h2 className="text-center text-xl mb-2">Clientes</h2>
                    <canvas id="customerChart" width="400" height="200"></canvas>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
