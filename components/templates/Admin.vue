<script setup>
import { onMounted, ref } from 'vue'

const stats = ref(null)
const loading = ref(true)

const visitorChartRef = ref(null)
const purchaseChartRef = ref(null)

const formatRupiah = (v) => 'Rp ' + Number(v || 0).toLocaleString('id-ID')
const formatDay = (dateStr) => new Date(dateStr).toLocaleDateString('id-ID', { weekday: 'short' })

onMounted(async () => {
  try {
    const res = await $fetch('/api/admin/dashboard/stats', { credentials: 'include' })
    stats.value = res.data
  } finally {
    loading.value = false
  }

  const ApexCharts = (await import('apexcharts')).default
  const userSeries = stats.value?.series?.users || []
  const paymentSeries = stats.value?.series?.payments || []

  const visitorOptions = {
    chart: { type: 'area', height: 300, toolbar: { show: false }, zoom: { enabled: false }, fontFamily: 'Inter, sans-serif' },
    series: [{ name: 'Pendaftar', data: userSeries.map((d) => d.count) }],
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.2, stops: [0, 90, 100], colorStops: [{ offset: 0, color: '#2966F3', opacity: 1 }, { offset: 100, color: '#5AB0F1', opacity: 0.2 }] } },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3, colors: ['#2966F3'] },
    xaxis: { categories: userSeries.map((d) => formatDay(d.date)), axisBorder: { show: false }, axisTicks: { show: false } },
    grid: { borderColor: '#f1f5f9', strokeDashArray: 4 },
    colors: ['#2966F3'],
  }

  const purchaseOptions = {
    chart: { type: 'bar', height: 300, toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
    plotOptions: { bar: { borderRadius: 8, columnWidth: '50%', distributed: true } },
    series: [{ name: 'Pembayaran Lunas', data: paymentSeries.map((d) => d.count) }],
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: { categories: paymentSeries.map((d) => formatDay(d.date)), axisBorder: { show: false }, axisTicks: { show: false } },
    grid: { borderColor: '#f1f5f9', strokeDashArray: 4 },
    colors: ['#2966F3', '#5AB0F1', '#2966F3', '#5AB0F1', '#2966F3', '#5AB0F1', '#2966F3'],
  }

  new ApexCharts(visitorChartRef.value, visitorOptions).render()
  new ApexCharts(purchaseChartRef.value, purchaseOptions).render()
})
</script>

<template>
  <div class="space-y-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      <p class="text-gray-500 text-sm">Selamat datang kembali, berikut adalah ringkasan data terbaru.</p>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
        <p class="text-xs text-gray-400 font-medium">Total User</p>
        <p class="text-2xl font-bold text-gray-800">{{ stats?.totals.users ?? '-' }}</p>
        <p class="text-xs text-green-600 mt-1">{{ stats?.totals.activeUsers ?? '-' }} aktif</p>
      </div>
      <div class="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
        <p class="text-xs text-gray-400 font-medium">Pendapatan</p>
        <p class="text-2xl font-bold text-gray-800">{{ formatRupiah(stats?.totals.revenue) }}</p>
        <p class="text-xs text-gray-400 mt-1">Tryout + Produk</p>
      </div>
      <div class="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
        <p class="text-xs text-gray-400 font-medium">Tryout Lunas</p>
        <p class="text-2xl font-bold text-gray-800">{{ stats?.totals.paidTryoutCount ?? '-' }}</p>
        <p class="text-xs text-amber-600 mt-1">{{ stats?.totals.pendingTryoutCount ?? '-' }} pending</p>
      </div>
      <div class="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
        <p class="text-xs text-gray-400 font-medium">Konten</p>
        <p class="text-2xl font-bold text-gray-800">{{ stats?.totals.tryouts ?? '-' }} tryout</p>
        <p class="text-xs text-gray-400 mt-1">{{ stats?.totals.products ?? '-' }} produk · {{ stats?.totals.blogs ?? '-' }} blog</p>
      </div>
    </div>

    <!-- Grid Grafik -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-lg font-bold text-gray-800">Pendaftar Baru</h2>
            <p class="text-xs text-gray-400 font-medium">Statistik 7 hari terakhir</p>
          </div>
          <div class="bg-blue-50 p-2 rounded-xl text-[#2966F3]">
            <Icon name="lucide:users" size="20" />
          </div>
        </div>
        <div ref="visitorChartRef"></div>
      </div>

      <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-lg font-bold text-gray-800">Pembayaran Lunas</h2>
            <p class="text-xs text-gray-400 font-medium">Statistik 7 hari terakhir</p>
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
