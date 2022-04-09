import styled from "@emotion/styled";
import { useBudgetContext } from '../global/context'
import { ImCross } from 'react-icons/im'


export default function Statement() {

    let globalObj = useBudgetContext()

    function handleDismissClick() {
        globalObj.setStatementShow(false)
    }

    let budget = globalObj.budgets.filter(budget => globalObj.currentId.current === budget.id)

    return (
        <Div statementShow={globalObj.statementShow}>
            <ImCross onClick={handleDismissClick} id="modal_close_icon" />
            <Heading>Statement</Heading>
            <List>
                {(budget[0] && budget[0].expenses.length > 0) ? budget[0].expenses.map((exp,ind) => {
                    return <div key={ind}>
                            <span style={{float: 'left'}}>{exp.expense_for}</span>
                            <span style={{float: 'right'}}>${exp.expense_amount}</span>
                        </div>
                }) : <h1>No Expenses</h1>}
            </List>
        </Div>
    )
}

const Heading = styled.h2`
    width: 100%;
    display: flex;
    margin: 8px;
`

const List = styled.div`
    height: 100%;
    width: 100%;
    overflow: scroll;
    padding-bottom: 4rem;
    display: flex;
    flex-direction: column;
    & div {
        width: 100%;
        padding: 4px;
        border-bottom: 1px solid #000;
    }
`

const Div = styled.div`
    width: 60%;
    min-width: 16rem;
    max-width: 25rem;
    box-shadow: 0 0 8px #848484;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: ${props => props.statementShow ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    margin: 0 4px;
    text-align: center;
    transiftion: all 100ms ease;
    z-index: 10;
`