import "./style.css"
import { useCallback, useState } from "react"
import { voices } from "../constants/voices"
import Head from "next/head"
import SWRegister from "../sw-register"

const sx = {
    title: {
        textAlign: "right",
        fontSize: "25px",
        fontFamily: "serif"
    },
    header: {
        objectFit: "cover"
    },
    voiceGroup: {
        display: "flex",
        flexWrap: "wrap",
        margin: "6px 12px"
    },
    voice: {
        margin: "6px",
        flex: "1 1 auto",
        display: "inline-flex",
        justifyContent: "space-between",
        cursor: "pointer",
        color: "white",
        borderRadius: "10px",
        padding: "12px 20px 12px 32px",
        backgroundColor: "#faa65f",
        borderLeft: "12px solid #FCDFA1",
        transition: "0.3s",
        boxShadow: "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)"
    },
    voiceActive: {
        backgroundColor: "hsla(27, 94%, 50%, 1)"
    }
}

const Voice = ({ name }) => {
    const [el, setEl] = useState(null)
    const [active, setActive] = useState(false)
    const handleClick = useCallback(() => {
        if (el) {
            el.play()
        }
    }, [el])

    return (
        <figure style={{ ...sx.voice, ...(active ? sx.voiceActive : {}) }} onClick={handleClick}>
            <figcaption>{name}</figcaption>
            <audio
                ref={node => {
                    setEl(node)
                }}
                src={`/static/voices/${name}.mp4`}
                onPlay={() => setActive(true)}
                onEnded={() => setActive(false)}
            ></audio>
        </figure>
    )
}

function IndexPage() {
    return (
        <>
            <Head>
                <title>noavoice - presented by 望月のあ</title>
                <meta
                    name="description"
                    content="noavoice。ボタンを押したら声が流れるアプリ。声：望月のあ @_noach"
                ></meta>
                <link rel="shortcut icon" href="/static/images/icons/favicon.png" />
                <link rel="manifest" href="/static/manifest.json" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@_noach" />
                <meta name="twitter:title" content="のあぼいす" />
                <meta name="twitter:image" content="https://noavoice.now.sh/static/twitter-ogp.png" />
                <meta name="twitter:description" content="望月のあの声がいつでも聞けるサービス" />
                <link
                    href="https://fonts.googleapis.com/css?family=Kosugi+Maru&display=swap&subset=japanese"
                    rel="stylesheet"
                ></link>
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-90236823-7"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            
                            gtag('config', 'UA-90236823-7');
                        `
                    }}
                ></script>
            </Head>
            <main>
                <style jsx>{`
                    main {
                        max-width: 900px;
                        margin: auto;
                        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                            0 1px 5px 0 rgba(0, 0, 0, 0.12);
                        background-color: #fff;
                        padding-bottom: 24px;
                    }
                `}</style>
                <img
                    src="/static/header.png"
                    alt="header"
                    height="150px"
                    width="100%"
                    style={sx.header}
                    decoding="async"
                />
                <nav style={{ display: "flex", justifyContent: "space-between", margin: "6px 32px", flexWrap: "wrap" }}>
                    <div>
                        <small>
                            <a href="https://github.com/hrdtbs/noavoice/blob/master/CHANGELOG.md">noavoice: v1.4.0</a>
                            <br />
                            <a href="https://twitter.com/_noach" style={sx.descriptionButton}>
                                声：望月のあ @_noach
                            </a>
                            <br />
                            <a
                                rel="noreferrer noopener"
                                target="_blank"
                                href="https://github.com/hrdtbs/noavoice#%E9%9F%B3%E5%A3%B0%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AElicence%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6"
                            >
                                音声ファイルのライセンスについて
                            </a>
                        </small>
                    </div>
                    <a
                        href={encodeURI(
                            `https://twitter.com/intent/tweet?url=https://noavoice.now.sh&text=Vtuber望月のあボイスボタン&hashtags=のあぼいす`
                        )}
                        data-show-count="false"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "1em 0.5em",
                            margin: "0.5em 0px",
                            border: "4px dotted #FAA65F"
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src="/static/twitter-blue.svg" width="32px" height="32px" alt="twitter" />
                        Twitterでシェアして応援！
                    </a>
                </nav>
                <div style={sx.voiceGroup}>
                    {voices.map((voice, i) => {
                        return <Voice name={voice} key={`voice-${i}`} />
                    })}
                </div>
            </main>

            <SWRegister />
        </>
    )
}

export default IndexPage
