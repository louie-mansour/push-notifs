import './SearchPanel.scss';
import {useCallback, useState} from "react";
import {searchByKeyword} from "../../services/search/SearchService";
import {Button, TextField} from "@mui/material";
import {Article} from "../article/Article";

export default function SearchPanel(props) {
    const { searchResults, setSearchResults } = props
    const [searchTerm, setSearchTerm] = useState(undefined);

    const performSearch = useCallback(async () => {
        const searchResults = await searchByKeyword(searchTerm)
        setSearchResults(searchResults.articles)
    }, [searchTerm, setSearchResults]);

    return (
        <div className='SearchPanel'>
            <div className='SearchPanel_search'>
                <div className='SearchPanel_searchbar' >
                    <TextField
                        id="standard-search"
                        label="Search"
                        type="search"
                        variant="standard"
                        onChange={onChangeSearchInput}
                        onKeyUp={onKeyupSearchInput}
                    />
                </div>
                <div className='SearchPanel_button'>
                    <Button variant="contained" onClick={clickSearchPanelButton}>search</Button>
                </div>
            </div>
            <div className='SearchPanel_results'>
                {
                    searchResults.map(searchResult => {
                        return <Article article={searchResult} key={searchResult.url}/>
                    })
                }
            </div>
        </div>
    )
    function onChangeSearchInput(e) {
        setSearchTerm(e.target.value)
    }
    async function clickSearchPanelButton(e) {
        e.preventDefault()
        await performSearch()
    }

    async function onKeyupSearchInput(e) {
        if (e.keyCode === 13) {
            await performSearch()
        }
    }
}