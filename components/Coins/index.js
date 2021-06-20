import style from './Coins.module.css'
import Image from 'next/image'
import Link from 'next/link'
import React, {useEffect} from 'react';

const Coins = ({name,price,symbol,marketcap,volume,image,priceChange,id}) => {
    return (
        <Link href='/coin/[id]' as={`/coin/${id}`}>
        <a className={style.link}>
        <div className={style.coin_container}>
            <div className={style.coin_row}>
                <div className={style.coin}>
                <Image  src={image} alt={name} height={30} width={30} />
                <h1 className={style.coin_h1}>{name}</h1>
                <p className={style.coin_symbol}>{symbol}</p>
                </div>
                <div className={style.coin_data}>
                    <p className={style.coin_price}>${price}</p>
                    <p className={style.coin_volume}> Vol: ${volume.toLocaleString()}</p>
                    {priceChange < 0 ? (
                        <p className="text-danger">
                            {priceChange.toFixed(2)}%
                        </p>
                    ) : (
                        <p className="text-success" >
                            {priceChange.toFixed(2)}%
                        </p>
                    )}

                    <p className={style.coin_marketcap}>
                        Mrkt Cap: ${marketcap.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
        </a>
        </Link>
    )
}

export default Coins