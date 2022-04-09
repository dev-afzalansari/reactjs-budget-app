import Layout from './components/layout'
import './app.css'
import AddModal from './components/addmodal'
import Global from './global/context'
import BudgetCards from './components/budgetcards'
import ExpenseModal from './components/expensemodal'
import Statement from './components/statementmodal'

function App() {
    return (
        <>
            <Global>
            <Layout>
            <AddModal />
            <ExpenseModal />
            <Statement />
            <BudgetCards />
            </Layout>
            </Global>
        </>
    )
}

export default App