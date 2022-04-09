import styled from "@emotion/styled"
import { useBudgetContext } from '../global/context'
import { FaReact } from 'react-icons/fa'


function Layout(props) {

    let { children } = props

    return (
        <Div>
            <Navbar />
            {children}
        </Div>
    )
}

function Navbar(props) {

    let globalObj = useBudgetContext()

    function handleAddClick() {
        globalObj.setModalShow(true)
    }

    return (
        <Nav>
            <NavHeading><FaReact /> Budget</NavHeading>
            <AddBtn onClick={handleAddClick}>Add Budget</AddBtn>
        </Nav>
    )
}

const Div = styled.div`
    height: 100vh;
    width: 100vw;
    min-width: 18rem;
    max-width: 45rem;
    box-shadow: 0 0 8px #848484;
    position: relative;
    overflow: hidden;
`

const Nav = styled.nav`
    width: 100%;
    border-bottom: 2px solid #848484;
    display: flex;
    align-items: center;
`

const NavHeading = styled.h1`
    margin: 1rem;
    display: flex;
    align-items: center;
    font-style: italic;
`
const AddBtn = styled.button`
    margin-left: auto;
    margin-right: 1rem;
    padding: 8px 1rem;
    border: none;
    background-color: lightgrey;
    opacity: 0.8;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: lightgray;
        opacity: 1;
    }
`

export default Layout