import './UserAccountKeywords.scss';
import {TextField, Button, Stack, Chip, ListItem} from "@mui/material";
import {useState} from "react";


export default function UserAccountKeywords(props) {
    const { keywords, setKeywords } = props
    if (!keywords) {
        return (
            <div className='UserAccountKeywords'>
                <h2 className='UserAccountKeywords_header'>Notification Keywords</h2>
                <p className='UserAccountKeywords_description'>
                    We only send notifications for articles which match your keywords.
                </p>
                <p className='UserAccountKeywords_description'>
                    Starting with 3-5 keywords is recommended.
                </p>
            </div>
        );
    }
    return (
        <div className='UserAccountKeywords'>
            <h2 className='UserAccountKeywords_header'>Notification Keywords</h2>
            <p className='UserAccountKeywords_description'>
                We only send notifications for articles which match your keywords.
            </p>
            <p className='UserAccountKeywords_description'>
                Starting with 3-5 keywords is recommended.
            </p>
            <div className='UserAccountChannels_inputLine'>
                <UserAccountKeywordInput
                    keywords={keywords}
                    setKeywords={setKeywords}
                />
            </div>
        </div>
    )
}

function UserAccountKeywordInput(props) {
    const { keywords, setKeywords } = props
    const [textInput, setTextInput] = useState('')
    return (
        <div className='UserAccountKeywordInput'>
            <div className='UserAccountKeywordInput_input'>
                <TextField
                    fullWidth
                    id="standard-basic"
                    label='Add keyword'
                    variant="standard"
                    value={textInput}
                    onChange={onChangeInput}
                    onKeyUp={onKeyupInput}
                />
            </div>
            <div className='UserAccountKeywordInput_add'>
                <Button
                    variant="contained"
                    onClick={async (e) => { await clickAddButton(e) }}
                >
                    Add
                </Button>
            </div>
            <div className='UserAccountKeywordInput_list'>
                <Stack direction="row" spacing={1}>
                    {keywords.map((keyword) => {
                        return (
                            <Chip
                                label={keyword}
                                onDelete={() => onDelete(keyword)}
                                key={keyword}
                            />
                        )
                    })}
                </Stack>
            </div>
            <div className='UserAccountKeywordInput_save'>
                <Button variant="contained">Save</Button>
            </div>
        </div>
    )

    function onChangeInput(e) {
        setTextInput(e.target.value)
    }
    async function clickAddButton(e) {
        e.preventDefault()
        if (keywords.indexOf(textInput) === -1) {
            setKeywords(keywords => [...keywords, textInput])
            setTextInput('')
        }
    }

    function onKeyupInput(e) {
        if (e.keyCode === 13) {
            setKeywords(keywords => [...keywords, textInput])
            setTextInput('')
        }
    }

    async function onDelete(keywordToDelete) {
        setKeywords(keywords => keywords.filter(keyword => keyword !== keywordToDelete))
    }
}