import './FeedPanel.scss';
import {Article} from "../article/Article";

export default function FeedPanel(props) {
    return (
        <div className='FeedPanel'>
            {
                props.feed && props.feed.map(feedItem => {
                    return <Article article={feedItem} key={feedItem.url}/>
                })
            }
        </div>
    )
}