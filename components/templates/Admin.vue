<script setup>
import { onMounted, ref } from 'vue'

const visitorChartRef = ref(null)
const purchaseChartRef = ref(null)

onMounted(async () => {
  const ApexCharts = (await import('apexcharts')).default

  // --- Konfigurasi Grafik Pengunjung (Area) ---
  const visitorOptions = {
    chart: {
      type: 'area',
      height: 300,
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: 'Inter, sans-serif'
    },
    series: [{ name: 'Pengunjung', data: [31, 40, 28, 51, 42, 109, 100] }],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
        colorStops: [
          { offset: 0, color: '#2966F3', opacity: 1 },
          { offset: 100, color: '#5AB0F1', opacity: 0.2 }
        ]
      }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3, colors: ['#2966F3'] },
    xaxis: {
      categories: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    grid: { borderColor: '#f1f5f9', strokeDashArray: 4 },
    colors: ['#2966F3']
  }

  // --- Konfigurasi Grafik Pembayaran (Bar) ---
  const purchaseOptions = {
    chart: {
      type: 'bar',
      height: 300,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif'
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '50%',
        distributed: true,
      }
    },
    series: [{ name: 'Pembelian', data: [15, 25, 12, 35, 28, 45, 30] }],
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: {
      categories: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    grid: { borderColor: '#f1f5f9', strokeDashArray: 4 },
    colors: ['#2966F3', '#5AB0F1', '#2966F3', '#5AB0F1', '#2966F3', '#5AB0F1', '#2966F3']
  }

  const visitorChart = new ApexCharts(visitorChartRef.value, visitorOptions)
  const purchaseChart = new ApexCharts(purchaseChartRef.value, purchaseOptions)

  visitorChart.render()
  purchaseChart.render()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header Dashboard -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      <p class="text-gray-500 text-sm">Selamat datang kembali, berikut adalah ringkasan data terbaru.</p>
    </div>

    <!-- Grid Grafik -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Card Pengunjung -->
      <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-lg font-bold text-gray-800">Jumlah Pengunjung</h2>
            <p class="text-xs text-gray-400 font-medium">Statistik 7 hari terakhir</p>
          </div>
          <div class="bg-blue-50 p-2 rounded-xl text-[#2966F3]">
            <Icon name="lucide:users" size="20" />
          </div>
        </div>
        <div ref="visitorChartRef"></div>
      </div>

      <!-- Card Pembelian -->
      <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-lg font-bold text-gray-800">Jumlah Pembelian</h2>
            <p class="text-xs text-gray-400 font-medium">Total transaksi diproses</p>
          </div>
          <div class="bg-indigo-50 p-2 rounded-xl text-indigo-600">
            <Icon name="lucide:shopping-cart" size="20" />
          </div>
        </div>
        <div ref="purchaseChartRef"></div>
      </div>

    </div>
  </div>
</template>