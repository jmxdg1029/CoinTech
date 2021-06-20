import Head from 'next/head';
import Link from 'next/link';
import style from'./Layour.module.css'
const Layout = ({children,title = "Coin Tracker"}) => {
    return (
        <div className={style.layout}>
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className="header">
            <Link href='/' passHref>
                <a className={style.title}>
                    <h1 className={style.title_text}>Coin Tech</h1>
                </a>
            </Link>
        </header>
        <main>{children}</main>
        </div>
    )
}

export default Layout;