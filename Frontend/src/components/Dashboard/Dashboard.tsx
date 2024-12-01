"use client";
import React, { FC } from 'react';
import { useDashboardData } from '../../hooks/Dashboard/useDashboardData';

const Dashboard: FC = () => {
    useDashboardData();

    return (
        <div className="container mx-auto mb-10 px-4">
            <h1 className="text-2xl font-bold text-center my-20">Estadísticas</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="relative w-full h-96 mb-4 sm:mb-0">
                    <h2 className="text-center text-xl mb-2">Stock Existente</h2>
                    <canvas id="stockChart" width="400" height="200"></canvas>
                </div>
                <div className="relative w-full h-96 mb-4 sm:mb-0">
                    <h2 className="text-center text-xl mb-2">Artículos Vendidos</h2>
                    <canvas id="salesChart" width="400" height="200"></canvas>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative w-full h-96 mb-4 sm:mb-0">
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
