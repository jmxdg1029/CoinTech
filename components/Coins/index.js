import style from './Coins.module.css'

const Coins = ({name,price,symbol,marketcap,volume,image,priceChange,id}) => {
    return (
        <div className={style.coin_container}>
            <div className={style.coin_row}>
                <div className={style.coin}>
                <img src={image} alt={name}
                className={style.coin_img}/>
                <h1 className={style.coin_h1}>{name}</h1>
                <p className={style.coin_symbol}>{symbol}</p>
                </div>
                <div className={style.coin_data}>
                    <p className={style.coin_price}>${price}</p>
                    <p className={style.coin_volume}> ${volume.toLocaleString()}</p>
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
                        ${marketcap.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Coins