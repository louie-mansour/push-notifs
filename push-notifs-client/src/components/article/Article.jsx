import './Article.scss'

export function Article(props) {
    const { keyword, source, title, url } = props.article
    return (
        <div className='Article'>
            <p className='Article_keyword'>{`${source}, ${keyword}`}</p>
            <p className='Article_title'><a href={url}>{title}</a></p>
        </div>
    )
}

export function MiniArticle(props) {
    const { keyword, source, title, url } = props.article
    return (
        <div className='Article Article--mini'>
            <p className='Article_keyword Article_keyword--mini'>{`${source}, ${keyword}`}</p>
            <p className='Article_title Article_title--mini'><a href={url}>{title}</a></p>
        </div>
    )
}