import './Header.scss'
import {History, Home, Newspaper, Person, QuestionMark} from "@mui/icons-material";
import {Tab, Tabs} from "@mui/material";
import {useState} from "react";

export default function Header() {
    return (
        <div className='Header'>
            <h1 className="Header_title"><strong>>_</strong> notify.me</h1>
            <Navigation />
        </div>
    )
}

function Navigation(props) {
    const [tab, setTab] = useState('home')
    return (
        <div className='Navigation'>
            <Tabs value={tab} onChange={(_event, value) => setTab(value)} aria-label="icon label tabs">
                <Tab icon={<Home />} label='home' value='home' />
                <Tab icon={<History />} label='history' value='history' />
                <Tab icon={<QuestionMark />} label='about' value='about' />
                <Tab icon={<Newspaper />} label='news' value='news' />
                <Tab icon={<Person />} label='account' value='account' />
            </Tabs>
        </div>
    )
}