import './Header.scss'
import {History, Home, Newspaper, Person, QuestionMark} from "@mui/icons-material";
import {Tab, Tabs} from "@mui/material";
import {useState} from "react";
import {useAuth0} from "@auth0/auth0-react";

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
    const { logout } = useAuth0();

    return (
        <div className='Navigation'>
            <Tabs value={tab} onChange={(_event, value) => changeTab(value)} aria-label="icon label tabs">
                <Tab icon={<Home />} label='home' value='home' />
                <Tab icon={<History />} label='history' value='history' />
                <Tab icon={<QuestionMark />} label='about' value='about' />
                <Tab icon={<Newspaper />} label='news' value='news' />
                <Tab icon={<Person />} label='sign in' value='sign_in' />
                <Tab icon={<Person />} label='sign out' value='sign_out' />
            </Tabs>
        </div>
    )

    function changeTab(value) {
        setTab(value)
        if (value === 'sign_in') {
            window.location.href = 'https://dev-isnyz8zq.auth0.com/authorize?response_type=code&client_id=ToGq3rWLOjJhBay1i4vDgieN8dlscXHr&redirect_uri=http://localhost:4000/auth/callback&scope=user:edit%20openid%20email%20phone&audience=http://localhost:4000&state=xyzABC123'
        }
        if (value === 'sign_out') {
            logout({ logoutParams: { returnTo: window.location.origin } })
        }
    }
}