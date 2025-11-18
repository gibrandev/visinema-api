const formatDataForChartjs = (rawData, labelText = 'Data') => {
    const labels = [];
    const dataValues = [];

    rawData.forEach(item => {
        const itemData = item.get({ plain: true });
        
        // Key di sini akan otomatis menjadi 'date_day' dari query harian
        // atau 'month_year' dari query bulanan.
        const dateKey = Object.keys(itemData).find(key => key.endsWith('_day') || key.endsWith('_year'));

        if (dateKey) {
            labels.push(itemData[dateKey]); // Contoh: ["2023-03-31", "2023-04-01"]
            dataValues.push(itemData.count);
        }
    });

    return {
        labels: labels,
        datasets: [{
            label: labelText, // Menggunakan label dinamis
            data: dataValues,
            backgroundColor: 'rgba(54, 162, 235, 0.6)', // Warna berbeda untuk harian
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };
};

const formatDataForTitleChartjs = (rawData) => {
    const labels = [];
    const dataValues = [];

    rawData.forEach(item => {
        const itemData = item.get({ plain: true });

        // title menjadi label
        labels.push(itemData.title); 
        // total_transactions menjadi data value
        dataValues.push(itemData.total_transactions);   
    });

    // Struktur output yang siap dikonsumsi oleh komponen Chart.js (misalnya, Pie Chart atau Bar Chart)
    return {
        labels: labels,
        datasets: [{
        label: 'Total Transaksi',
        data: dataValues,
        // Penting: Untuk Pie/Bar Chart, Anda perlu array warna
        backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            // ... tambahkan warna lain jika judulnya banyak
        ],
        borderWidth: 1
        }]
    };
};

const formatDataForRevenueChartjs = (rawData) => {
    const labels = [];
    const dataValues = [];

    rawData.forEach(item => {
        const itemData = item.get({ plain: true });

        // 'month_year' menjadi label (Sumbu X)
        labels.push(itemData.month_year); 
        
        // 'total_revenue' menjadi data value (Sumbu Y)
        // Pastikan nilai dikonversi menjadi angka (float) jika diperlukan oleh Chart.js
        dataValues.push(parseFloat(itemData.total_revenue));   
    });

    return {
        labels: labels,
        datasets: [{
            label: 'Total Pendapatan (Revenue)',
            data: dataValues,
            backgroundColor: 'rgba(255, 159, 64, 0.6)', // Warna oranye untuk revenue
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
            tension: 0.1 // Untuk Line Chart
        }]
    };
};

module.exports = { formatDataForChartjs, formatDataForTitleChartjs, formatDataForRevenueChartjs };