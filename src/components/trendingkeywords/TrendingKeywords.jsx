import './TrendingKeywords.scss'
import {useEffect, useState} from "react";
import {getTrendingKeywords} from "../../services/trends/TrendsService";

export default function TrendingKeywords(props) {
    const [keywords, setKeywords] = useState([])
    useEffect(() => {
        const fetchKeywords = async () => {
            const keywords = await getTrendingKeywords()
            setKeywords(keywords.keywords)
        }
        fetchKeywords()
            .catch(err => console.log(err))
    })
    return (
        <div className='TrendingKeywords'>
            <h3 className='TrendingKeywords_header'>Trending Keywords</h3>
            {keywords.map(keyword => {
                return <p className='TrendingKeywords_keyword' key={keyword}>{keyword}</p>
            })}
        </div>
    )
}
