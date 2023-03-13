import './TrendingArticles.scss'
import {useEffect, useState} from "react";
import {getTrendingArticles} from "../../services/trends/TrendsService";
import {MiniArticle} from "../article/Article";

export default function TrendingArticles(props) {
    const [articles, setArticles] = useState([])
    useEffect(() => {
        const fetchArticles = async () => {
            const articles = await getTrendingArticles()
            setArticles(articles)
        }
        fetchArticles()
            .catch(err => console.log(err))
    })
    return (
        <div className='TrendingArticles'>
            <h3 className='TrendingArticles_header'>Trending Articles</h3>
            <div className='TrendingArticles_articles'>
                { articles.map(article => {
                    return <MiniArticle article={article} key={article.url}/>
                })}
            </div>
        </div>
    )
}