import './UserAccountKeywords.scss';
import {TextField, Button, Stack, Chip} from "@mui/material";


export default function UserAccountKeywords(props) {
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
                <UserAccountKeywordInput />
            </div>
        </div>
    )
}

function UserAccountKeywordInput(props) {
    return (
        <div className='UserAccountKeywordInput'>
            <div className='UserAccountKeywordInput_input'>
                <TextField
                    fullWidth
                    id="standard-basic"
                    label='Add keyword'
                    variant="standard"
                />
            </div>
            <div className='UserAccountKeywordInput_add'>
                <Button variant="contained">Add</Button>
            </div>
            <div className='UserAccountKeywordInput_list'>
                <Stack direction="row" spacing={1}>
                    {['JavaScript', 'Typescript', 'GPT', 'AWS'].map((keyword) => {
                        return <Chip label={keyword} onDelete={() => { alert('delete')}} />
                    })}
                </Stack>
            </div>
            <div className='UserAccountKeywordInput_save'>
                <Button variant="contained">Save</Button>
            </div>
        </div>
    )
}