import styled from '@emotion/styled'
import { useBudgetContext } from '../global/context'
import { ImCross } from 'react-icons/im'
import { useState,useRef } from 'react'

export default function ExpenseModal() {

    let [input,setInput] = useState({
        expense_for: '',
        expense_amount: 0
    })
    let inputRef = useRef([])
    let globalObj = useBudgetContext()

    function handleDismissClick() {
        globalObj.setExpenseModalShow(false)
    }

    function handleInput(ev) {
        let elem = ev.target

        setInput(input => {
            input[elem.id] = elem.value
            return input
        })
    }

    function handleNewExpense(ev) {

        let id = parseInt(globalObj.currentId.current)
        let expense = {
            expense_for: input.expense_for,
            expense_amount: parseFloat(input.expense_amount)
        }

        globalObj.setBudgets(budgets => {
            let temp = budgets

            temp.forEach((budget,ind) => {
                if(budget.id === id) {
                    budgets[ind].expenses.push(expense)
                }
            });
            return budgets
        })

        //resetting the input state here
        setInput(input => {
            input.expense_amount = 0
            input.expense_for = ''
            return input
        })

        inputRef.current[0].value = ''
        inputRef.current[1].value = null

        return handleDismissClick()
    }

    return (
        <Div expenseShow={globalObj.expenseShow}>
            <ImCross onClick={handleDismissClick} id='modal_close_icon' />
            <ModalHeading>Add Your Expense</ModalHeading>
            <Label htmlFor='expense_for'>expense_for</Label>
            <Input type='text' id='expense_for' onChange={handleInput} ref={elem => inputRef.current[0] = elem} />
            <Label htmlFor='expense_amount'>Expense Amount</Label>
            <Input type='number' id='expense_amount' onChange={handleInput} ref={elem => inputRef.current[1] = elem} />
            <ModalAddBtn onClick={handleNewExpense}>Add Expense</ModalAddBtn>
        </Div>
    )

}

const ModalAddBtn = styled.button`
    padding: 8px 1rem;
    border: none;
    width: 100%;
    background-color: lightgrey;
    opacity: 0.6;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: lightgray;
        opacity: 1;
    }
    margin-bottom: 1rem;
`

const ModalHeading = styled.h1`
    font-weight: bold;
    margin: 1rem 0;
`

const Label = styled.label`
    font-weight: bold;
    font-size: 1.2rem;
`

const Input = styled.input`
    height: 2rem;
    width: 100%;
    font-size: 1.4rem;
    margin: 0.5rem 0 1rem 0;
    border: 1px solid #000;
    border-radius: 4px;
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
    display: ${props => props.expenseShow ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    margin: 0 4px;
    text-align: center;
    transiftion: all 100ms ease;
    z-index: 10;
`