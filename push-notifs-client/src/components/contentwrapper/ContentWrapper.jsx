import './ContentWrapper.scss'

export default function ContentWrapper(props) {
    return (
        <div className='ContentWrapper'>
            {props.children}
        </div>
    )
}