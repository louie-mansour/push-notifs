import './KeywordsPanel.scss'
import {Chip} from "@mui/material";
import {Done} from "@mui/icons-material";

export default function KeywordsPanel(props) {
    return (
        <div className='KeywordsPanel'>
            <h3 className='KeywordsPanel_header'>Notify me for</h3>
                {props.keywords.map(keyword => (
                    <Chip icon={<Done />} label={keyword} key={keyword}/>
                ))}
            <a href="https://www.w3schools.com" className='KeywordsPanel_manageSettings'>
                <p >Manage notification settings</p>
            </a>
        </div>
    )
}