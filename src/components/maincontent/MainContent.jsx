import './MainContent.scss';
import FeedPanel from '../feedpanel/FeedPanel';
import {useEffect, useState} from 'react';
import SearchPanel from '../searchpanel/SearchPanel';
import {Tab, Tabs} from "@mui/material";
import {DynamicFeed, Search} from "@mui/icons-material"
import {getFeed} from "../../services/feed/FeedService";

const feed = 'feed'
const search = 'search'

export default function MainContent(props) {

    const [panel, setPanel] = useState(feed)
    const [feedData, setFeedData] = useState([])
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        const fetchFeedData = async () => {
            const feedData = await getFeed('userId')
            setFeedData(feedData.feed)
        }
        fetchFeedData()
            .catch(err => console.log(err))
    } ,[])
    return (
        <div className='MainContent'>
            <div className='MainContent_wrapper' >
                <div className='MainContent_selector'>
                    <Tabs value={panel} onChange={(_event, value) => setPanel(value)} aria-label="icon label tabs">
                        <Tab icon={<DynamicFeed />} label={feed} value={feed} />
                        <Tab icon={<Search />} label={search} value={search} />
                    </Tabs>
                </div>
                {panel === feed && <FeedPanel feed={feedData}/>}
                {panel === search && <SearchPanel searchResults={searchResults} setSearchResults={setSearchResults}/>}
            </div>
        </div>
    )
}