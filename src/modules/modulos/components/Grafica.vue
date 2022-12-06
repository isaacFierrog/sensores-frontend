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
        },
        tiempo: {
            type: Array,
            default: []
        }
    },
    setup(props) {
        const { datos, tiempo } = toRefs(props)
        console.log('DATOS GRAFICA');
        console.log(datos.value);

        //Propiedades
        const HORAS_DIA = 24;
        const arregloHoras = ['1', '2', '3', '4', '5'];
        const chartOptions = {
            chart: {
                id: 'grafica-datos'
            },
            xaxis: {
                categories: tiempo.value
            }
        }

        //Metodos
        // const generarHoras = () => {
        //     for(let d = 1; d <= HORAS_DIA; d++){
        //         chartOptions.xaxis.categories.push(d);
        //     }
        // };

        // generarHoras();
        console.log(arregloHoras);

        return { chartOptions, datos }
    } 
}
</script>