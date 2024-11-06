"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Chart, ChartType } from 'chart.js/auto';

const Dashboard: React.FC = () => {
    // Obtiene los parámetros de búsqueda de la URL
    const searchParams = useSearchParams();
    // Extrae el businessId de los parámetros de búsqueda
    const businessId = searchParams.get('businessId');
    // Define el estado inicial para los datos de ventas
    const [salesData, setSalesData] = useState({ labels: [], values: [] });
    // Crea una referencia al gráfico de Chart.js
    const chartRef = useRef<Chart | null>(null);

    // Hook useEffect para obtener los datos de ventas cuando cambia el businessId
    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                // Solicita los datos de ventas a la API
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/business/dashboard`, {
                    params: { businessId },
                });
                console.log('Datos recibidos del backend:', response.data);
                // Actualiza el estado con los datos de ventas recibidos
                setSalesData(response.data);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchSalesData();
    }, [businessId]);

    // Hook useEffect para inicializar el gráfico cuando los datos de ventas cambian
    useEffect(() => {
        const ctx = (document.getElementById('salesChart') as HTMLCanvasElement).getContext('2d');
        if (ctx) {
            // Destruye el gráfico existente si hay uno
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            // Crea un nuevo gráfico de barras con los datos de ventas
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

    // Renderiza el componente con el gráfico de ventas
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-center my-4">Dashboard de Ventas</h1>
            <canvas id="salesChart" width="400" height="200"></canvas>
        </div>
    );
};

export default Dashboard;