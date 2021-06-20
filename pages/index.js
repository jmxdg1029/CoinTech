import Head from 'next/head'
import Layout from '../components/Layout'
import {useState} from 'react'
import SearchBar from '../components/SearchBar'
import CoinList from '../components/CoinList'
import 'bootstrap/dist/css/bootstrap.css'

export default function Home({filteredCoins}) {
  const [search, setSearch] = useState('')
  const allCoins = filteredCoins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
  ) 

  const handleChange = e => {
    e.preventDefault()

    setSearch(e.target.value.toLowerCase())
  }
  return (
    <Layout>
      <div className="coin_app">
        <main >
          <h1 className="text-center mb-4 mt-2">
            Welcome to Coin Tracking
          </h1>
          <SearchBar type="text" placeholder="Coin Search" onChange = {handleChange}/>
          <CoinList filteredCoins={allCoins}/>
        </main>
      </div>

      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossOrigin="anonymous"></link>
      
    </Layout>
  )
}

//server side prox (since the value's will constantly keep changing)
export const getServerSideProps = async () => {
  const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=10&page=1&sparkline=false')

  const filteredCoins = await res.json()

  return {
    props: {
      filteredCoins
    }
  }
}

