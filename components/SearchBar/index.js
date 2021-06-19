import styles from './Search.module.css';
import 'bootstrap/dist/css/bootstrap.css'
const SearchBar = ({...rest}) => {
    return (
        <div className={styles.container}>
            <div className={styles.coin_search} >
                <input className={styles.coin_input} {...rest}/>
            </div>
        </div>
    )
}

export default SearchBar
