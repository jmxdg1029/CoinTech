import Layout from '../../components/Layout';
import Image from 'next/image'
import style from './Coin.module.css'
import React, {useRef, useEffect, useState} from 'react';
import Chartjs from "../../node_modules/chart.js"
import coinGecko from '../../apis/coinGecko';


const Coin = ({coin,id}) => {
    const chartRef = useRef()
    const [coinData, setCoinData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [timeFormat, setTimeFormat] = useState("24h")

    const determineTimeFormat = () => {
        switch(timeFormat){
            case "24h":
                return coinData.day;
            case "7d":
                return coinData.week;
            case "1y":
                return coinData.year;
            default:
                return coinData.day;
                    
        }
    }

    const formatData = (data) => {
        return data.map((el) =>{
            return {
                t: el[0],
                y: el[1].toFixed(2),
            };
        });
    };
    
 
    useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        const [day,week,year] = await Promise.all([
            coinGecko.get(`/coins/${id}/market_chart/`,{
                params:{
                    vs_currency: "cad",
                    days: "1",
                },
            }),
           
            coinGecko.get(`/coins/${id}/market_chart/`,{
                params:{
                    vs_currency: "cad",
                    days: "7",
                },
            }),
            coinGecko.get(`/coins/${id}/market_chart/`,{
                params:{
                    vs_currency: "cad",
                    days: "365",
                },
            }),
        ]);
       
        setCoinData({
            day: formatData(day.data.prices),
            week: formatData(week.data.prices),
            year: formatData(year.data.prices)
        });
        setIsLoading(false);
        
    };
    fetchData();
    }, []);

    useEffect(() => {
        if(chartRef && chartRef.current){
            const chartInstance = new Chartjs(chartRef.current, {
                type: 'line',
                data: {
                    datasets: [{
                        label: `${id} price`,
                        data: determineTimeFormat(),
                        backgroundColor: "rgba(174,305,194,0.5)",
                        pointRadius:0,
                    }]
                },
                options: {
                lineHeightAnnotation:{
                    always: true, 
                    hover: false,
                    lineWeight: 1.5
                },
                animation:{
                    duration:2000
              },
                maintainAspectRation:false, 
                responsive: true,
                scales: {
                    xAxes: [
                        {
                            type: "time",
                            distribution: "linear"
                        }
                    ],
            
                }
            }
            
            });
        };
    });

    return (
        <Layout>
            <div className={style.coin_container}>
                
                <div className={style.coin_chart}>
                    <canvas ref={chartRef} id="myChart" width={550} height={550}></canvas>
                    <div className={style.chart_button_section}>
                    <button onClick={() => setTimeFormat("24h")} className={style.chart_button}>24h</button>
                    <button  onClick={() => setTimeFormat("7d")} className={style.chart_button}>7d</button>
                    <button    onClick={() => setTimeFormat("1y")} className={style.chart_button}>1y</button>
                    </div>
                </div>
                <div className={style.coin_desc}>
                    <Image  src={coin.image.large} alt={coin.name} height={200} width={200} />
                    <p>{coin.name}</p>
                    <p>{coin.symbol}</p>
                    <p>Price: ${coin.market_data.current_price.cad}</p>
                    <p>Volume(24h): ${coin.market_data.total_volume.cad}</p>
                    <p>Market Cap: ${coin.market_data.market_cap.cad}</p>
                </div>
            </div>
        </Layout>
    )
};



export async function getServerSideProps(context) {
    const {id} = context.query

    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
    

    const data = await res.json()
    

    return {
        props: {
            coin: data,
            id
        }
    }
}

export default Coin