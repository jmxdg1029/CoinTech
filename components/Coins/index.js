
const Coins = ({name,price,symbol}) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>{symbol}</p>
            <p>{price}</p>
        </div>
    )
}

export default Coins