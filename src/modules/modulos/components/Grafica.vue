<template>
    <div>
        <apexchart
            v-if="datos"
            width="100%"
            type="line"
            :options="chartOptions"
            :series="datos">
        </apexchart>
    </div>
</template>

<script>
import { toRefs } from 'vue'

export default {
    props: {
        datos: {
            type: Array,
            default: []
        }
    },
    setup(props) {
        const { datos } = toRefs(props)
        const chartOptions = {
            chart: {
                id: 'grafica-datos'
            },
            xaxis: {
                categories: [1,2,3,4,5,6,7,8,9,10]
            }
        }

        console.log(datos);

        return { chartOptions, datos }
    } 
}
</script>