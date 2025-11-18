const { Transaction } = require("../models");
const {Sequelize} = require("sequelize");
const { formatDataForChartjs, formatDataForTitleChartjs, formatDataForRevenueChartjs } = require('../utils/chartFormatter');

module.exports = {
    getDaily: async (req, res) => {
        try {
            const data = await Transaction.findAll({
            attributes: [
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('created_at'), '%Y-%m-%d'), 'date_day'],
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
            ],
            group: [
                'date_day'
            ],
            order: [
                ['date_day', 'ASC']
            ]
            });

            const chartData = formatDataForChartjs(data, 'Jumlah Transaksi Harian');

            res.json(chartData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving daily chart data', error });
        }
    },

    getMonthly: async (req, res) => {
        try {
            const data = await Transaction.findAll({
                attributes: [
                    [Sequelize.fn('DATE_FORMAT', Sequelize.col('created_at'), '%Y-%m'),'month_year'],
                    [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
                ],
                group: [
                    'month_year'
                ],
                order: [
                    ['month_year', 'ASC']
                ]
            });
            const chartData = formatDataForChartjs(data);

            res.json(chartData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving chart data', error });
        }
    },

    getFilm: async (req, res) => {
        try {
            const data = await Transaction.findAll({
                attributes: [
                    'title',
                    [Sequelize.fn('COUNT', Sequelize.col('id')), 'total_transactions']
                ],
                group: ['title'],
                order: [
                    [Sequelize.literal('total_transactions'), 'DESC'] 
                ]
            });
            const chartData = formatDataForTitleChartjs(data);

            res.json(chartData);
        } catch (error) {
            console.error('Error saat menghitung total transaksi per judul:', error);
            res.status(500).json({ 
                message: 'Gagal mengambil data total transaksi per judul', 
                error: error.message 
            });
        }
    },

    getRevenueMonthly: async (req, res) => {
        try {
            const data = await Transaction.findAll({
            attributes: [
                [ Sequelize.fn('DATE_FORMAT', Sequelize.col('created_at'), '%Y-%m'), 'month_year'],
                [Sequelize.fn('SUM', Sequelize.col('gross_amount')), 'total_revenue']
            ],
            group: [
                'month_year'
            ],
            order: [
                ['month_year', 'ASC']
            ]
            });

            const chartData = formatDataForRevenueChartjs(data);

            res.json(chartData);
        } catch (error) {
            console.error('Error saat mengambil data pendapatan bulanan:', error);
            res.status(500).json({ 
                message: 'Gagal mengambil data revenue bulanan', 
                error: error.message 
            });
        }
    }
}