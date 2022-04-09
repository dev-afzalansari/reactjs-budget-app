import { createContext,useContext,useRef,useState } from "react";


const TheContext = createContext()

export default function Global(props) {

    let [show,setModalShow] = useState(false)
    let [expenseShow,setExpenseModalShow] = useState(false)
    let [budgets,setBudgets] = useState([])
    let currentId = useRef(null)
    let [statementShow,setStatementShow] = useState(false)

    return (
        <TheContext.Provider value={{
            show,
            setModalShow,
            budgets,
            setBudgets,
            expenseShow,
            setExpenseModalShow,
            currentId,
            statementShow,
            setStatementShow
        }}>
            {props.children}
        </TheContext.Provider>
    )
}

export function useBudgetContext() {
    return useContext(TheContext)
}