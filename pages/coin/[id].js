import Layout from '../../components/Layout';
import Image from 'next/image'
import style from './Coin.module.css'
import React, {useRef, useEffect} from 'react';

import Chartjs from "../../node_modules/chart.js"

const Coin = ({coin}) => {
    const chartRef = useRef()

    useEffect(() => {
        if(chartRef && chartRef.current){
            const chartInstance = new Chartjs(chartRef.current, {
                type: 'line',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
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
    })
    return (
        <Layout>
            <div className={style.coin_container}>
                <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
                <div className={style.coin_desc}>
                    <Image  src={coin.image.large} alt={coin.name} height={300} width={300} />
                    <p>{coin.name}</p>
                    <p>{coin.symbol}</p>
                    <p>${coin.market_data.current_price.cad}</p>
                </div>
            </div>
        </Layout>
    )
};

export default Coin

export async function getServerSideProps(context) {
    const {id} = context.query

    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)

    const data = await res.json()

    return {
        props: {
            coin: data
        }
    }
}