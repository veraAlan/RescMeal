import { useState, useEffect, useRef } from 'react';
import axiosConfig from '../../utils/axiosConfig';
import { Chart, ChartType } from 'chart.js/auto';
import { getSessionId } from '../../utils/getSessionId';

interface ChartData {
    labels: string[];
    values: number[];
}

export const useDashboardData = () => {
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
                    const token = localStorage.getItem('authToken');
                    const endpoints = [
                        'sales/stock',
                        'sales/dashboard',
                        'sales/revenue',
                        'sales/customers'
                    ];

                    const [stockResponse, salesResponse, revenueResponse, customerResponse] = await Promise.all(
                        endpoints.map(endpoint =>
                            axiosConfig.get(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
                                params: { businessId }
                            })
                        )
                    );

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
        const colors = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(199, 199, 199, 0.2)'
        ];

        const borderColors = [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(199, 199, 199, 1)'
        ];

        const createChart = (
            ref: React.MutableRefObject<Chart | null>, 
            ctx: CanvasRenderingContext2D | null, 
            data: ChartData, 
            type: ChartType, 
            label: string
        ) => {
            if (ctx) {
                if (ref.current) ref.current.destroy();
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
                                backgroundColor: colors.slice(0, data.values.length),
                                borderColor: borderColors.slice(0, data.values.length),
                                borderWidth: 1,
                                data: data.values,
                            }]
                        },
                        options: {
                            maintainAspectRatio: false,
                            scales: {
                                y: { beginAtZero: true }
                            }
                        }
                    });
                }
            }
        };

        createChart(stockChartRef, (document.getElementById('stockChart') as HTMLCanvasElement)?.getContext('2d'), stockData, 'bar', 'Stock Existente');
        createChart(salesChartRef, (document.getElementById('salesChart') as HTMLCanvasElement)?.getContext('2d'), salesData, 'line', 'Artículos Vendidos');
        createChart(revenueChartRef, (document.getElementById('revenueChart') as HTMLCanvasElement)?.getContext('2d'), revenueData, 'pie', 'Ingresos');
        createChart(customerChartRef, (document.getElementById('customerChart') as HTMLCanvasElement)?.getContext('2d'), customerData, 'doughnut', 'Clientes');
    }, [stockData, salesData, revenueData, customerData]);

    return {
        stockData,
        salesData,
        revenueData,
        customerData
    };
};