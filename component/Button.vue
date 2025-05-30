<script setup>
defineOptions({ inheritAttrs: false })
</script>

<template>
    <button v-bind:class="atr">
        <slot />
    </button>
</template>

