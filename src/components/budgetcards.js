import styled from '@emotion/styled'
import { useState } from 'react'
import { useBudgetContext } from '../global/context'


function BudgetCards() {

    let globalObj = useBudgetContext()

    let [redo,setRedo] = useState(false)

    let budgets = globalObj.budgets

    if(budgets.length === 0) {
        return <NoBudget>No Budget</NoBudget>
    }

    function handleDelete(ev) {
        let id = parseInt(ev.target.getAttribute('data-id'))

        globalObj.setBudgets(budgets => {
            let temp = budgets

            temp.forEach((budget,ind) => {
                if(budget.id === id) {
                    budgets.splice(ind,1)
                }
            })

            return budgets
        })
        setRedo(!redo)
    }

    return (
        <Wrapper>
        {budgets.map(function(budget) {
            return <Card handleDelete={handleDelete} key={budget.id} budget={budget} />
        })}
        </Wrapper>
    )
}

function Card(props) {

    let { budget,handleDelete } = props
    let globalObj = useBudgetContext()

    function handleExpenseClick(ev) {
        globalObj.currentId.current = ev.target.getAttribute('data-id')
        globalObj.setExpenseModalShow(true)
    }

    function handleStatementClick(ev) {
        globalObj.currentId.current = parseInt(ev.target.getAttribute('data-id'))
        globalObj.setStatementShow(true)
    }

    let totalExpenses = budget.expenses.reduce((total,elem) => {
        return total += elem.expense_amount
    },0)

    let status = budget.budget_amount >= totalExpenses

    return(
        <Div>
        <Heading>
        <BudgetName>{budget.budget_name}</BudgetName>
        <Status status={status}><Tooltip id='tooltip'>
        {status ? 'budget in' : 'budget out'}    
        </Tooltip></Status>
        </Heading>
        <div>
            <Span>Budget Limit - ${budget.budget_amount}</Span>
            <Span>Expenses Made - ${totalExpenses}</Span>
        </div>
        <Btns>
            <DeleteBtn onClick={handleDelete} data-id={budget.id}>Delete</DeleteBtn>
            <ExpenseBtn data-id={budget.id} onClick={handleExpenseClick}>Add Expense</ExpenseBtn>
            <StatementBtn data-id={budget.id} onClick={handleStatementClick}>Statement</StatementBtn>
        </Btns>
    </Div>
    )
}

const Span = styled.span`
    padding: 6px 1rem;
    background-color: lightgray;
    color: #000;
    opacity: 0.6;
    border-radius: 4px;
    font-weight: lighter;
    font-size: 1.2rem;
    margin-right: 4px;
`

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
    padding-bottom: 5rem;
`

const NoBudget = styled.h1`
    color: #848484;
    width: 100%;
    text-align: center;
    margin-top: 4rem;
`

const Status = styled.div`
    margin: 4px;
    margin-left: auto;
    height: 1rem;
    width: 1rem;
    border-radius: 0.5rem;
    background-color: ${props => props.status ? 'green' : 'red'};
    position: relative;
    cursor: pointer;
    &:hover #tooltip {
        display: block;
    }
`

const Tooltip = styled.strong`
    padding: 4px 1rem;
    background-color: #848484;
    color: #fff;
    display: none;
    position: absolute;
    top: -5px;
    right: 1.2rem;
    border-radius: 4px;
    white-space: nowrap;
`

const Heading = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
`

const Btns = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 1rem;
`

const StatementBtn = styled.button`
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
    margin-left: auto;
`

const DeleteBtn = styled.button`
    padding: 8px 1rem;
    border: none;
    background-color: red;
    opacity: 0.6;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        opacity: 1;
    }
    margin: 4px;
`

const ExpenseBtn = styled.button`
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
    margin: 4px;
`

const BudgetName = styled.h2`
    font-weight: bold;
`

const Div = styled.div`
    width: calc(100% - 2rem);
    box-shadow: 0 0 4px #848484;
    border-radius: 4px;
    margin: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

export default BudgetCards