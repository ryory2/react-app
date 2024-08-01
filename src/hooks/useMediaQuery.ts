import { useEffect, useState } from 'react'

export const mediaQuery = {
    sp: 'width < 752px',
    // tablet: '752px <= width < 1122px',
    pc: '1122px <= width',
}

export const useMediaQuery = (query: string) => {
    // メディアクエリとは、画面の幅や高さ、解像度などに基づいてCSSのスタイルを適用する条件を設定するもの
    const formattedQuery = `(${query})`
    // 引数として渡されたクエリ文字列を括弧で囲み、メディアクエリの形式にします。
    const [match, setMatch] = useState(matchMedia(formattedQuery).matches)

    useEffect(() => {
        const mql = matchMedia(formattedQuery)

        if (mql.media === 'not all' || mql.media === 'invalid') {
            console.error(`useMediaQuery Error: Invalid media query`)
        }

        mql.onchange = (e) => {
            setMatch(e.matches)
        }

        return () => {
            mql.onchange = null
        }
    }, [formattedQuery, setMatch])

    return match
}

// ■利用方法
// import { mediaQuery, useMediaQuery } from './useMediaQuery'
// import { SpComponent } from './SpComponent'
// import { PcComponent } from './PcComponent'

// export const Component = () => {
//   const isSp = useMediaQuery(mediaQuery.sp)

//   if (isSp) {
//     return <SpComponent />
//   }

//   return <PcComponent />
// }