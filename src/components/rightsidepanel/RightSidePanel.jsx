import './RightSidePanel.scss'
import TrendingArticles from "../trendingarticles/TrendingArticles"
import TrendingKeywords from "../trendingkeywords/TrendingKeywords";
import ImportantLinks from "../importantlinks/ImportantLinks";

export default function RightSidePanel() {

    return (
        <div className='RightSidePanel'>
            <TrendingArticles />
            <TrendingKeywords />
            <ImportantLinks />
        </div>
    )
}