import styled from "@emotion/styled"
import { ImCross } from 'react-icons/im'
import { useBudgetContext } from '../global/context'
import { useState,useRef } from 'react'

function AddModal(props) {

    let [input,setInput] = useState({
        budget_name: '',
        budget_amount: 0
    })
    let inputRef = useRef([])

    let globalObj = useBudgetContext()

    function handleDismissClick() {
        globalObj.setModalShow(false)
    }

    function handleNewBudget() {

        let id = Date.now()

        // new obj for budgets
        let newBudget = {
            id: id,
            budget_name: input.budget_name,
            budget_amount: parseFloat(input.budget_amount),
            expenses: []
        }

        // pushing new budget in budgets state
        globalObj.setBudgets(budgets => {
            budgets.push(newBudget)
            return budgets
        })

        // reseting the input state here
        setInput(input => {
            input.budget_name = ''
            input.budget_amount = 0
            return input
        })

        inputRef.current[0].value = ''
        inputRef.current[1].value = null

        //closing the modal after entering
        handleDismissClick()
    }

    return (
        <Div show={globalObj.show}>
            <ImCross id="modal_close_icon" onClick={handleDismissClick} />
            <ModalForm
             setInput={setInput}
             handleNewBudget={handleNewBudget}
             inputRef={inputRef}
             />
        </Div>
    )
}

function ModalForm(props) {

    let { inputRef,setInput,handleNewBudget } = props

    function handleInput(ev) {
        let elem = ev.target

        setInput(input => {
            input[elem.id] = elem.value
            return input
        })

    }

    return(
        <>
            <ModalHeading>Add Your Budget Below</ModalHeading>
            <Label htmlFor="budget_name">Budget Name</Label>
            <Input type='text' id="budget_name" onChange={handleInput} ref={elem => inputRef.current[0] = elem} />
            <Label htmlFor="budget_amount">Budget Amount</Label>
            <Input type='number' id='budget_amount' onChange={handleInput} ref={elem => inputRef.current[1] = elem} />
            <ModalAddBtn onClick={handleNewBudget}>ADD</ModalAddBtn>
        </>
    )
}

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

const Div = styled.div`
    width: 60%;
    min-width: 16rem;
    max-width: 25rem;
    box-shadow: 0 0 8px #848484;
    background-color: #fff;
    border-radius: 4px;
    padding: 1rem 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: ${props => props.show ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    margin: 0 4px;
    text-align: center;
    transiftion: all 100ms ease;
    z-index: 10;
`

export default AddModal