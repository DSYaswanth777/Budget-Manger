import { useState } from "react"
import { Container, Button, Stack } from "react-bootstrap"
import AddBudgetModel from "./components/AddBudgetModel"
import AddExpenseModal from "./components/AddExpenseModal"
import BudgetCard from "./components/BudgetCard"
import TotalBudgetCard from "./components/TotalBudgetCard"
import UnCategorizedBudgetCard from "./components/UnCategorizedBudgetCard"
import ViewExpensesModal from "./components/ViewExenpsesModal"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./context/BudgetContext"

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExenpsesModalBudgetId, setViewExpensesBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }
  return (
    <>
      <Container className='my-4'>
      <h1 className='me-auto text-center'>Budgets</h1>
      <div className="d-flex justify-content-center">

        <Stack direction='horizontal' gap='3' className='mb-4 mt-2'>
       
          <Button variant='primary' onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant='outline-primary' onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
      </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            )
            return (
              <BudgetCard
              
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                openAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() => setViewExpensesBudgetId(budget.id)}
              />
            )
          })}
          <UnCategorizedBudgetCard
            openAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() =>
              setViewExpensesBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard/>
        </div>
      </Container>
      <AddBudgetModel
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExenpsesModalBudgetId}
        handleClose={() => setViewExpensesBudgetId()}
      />
    </>
  )
}

export default App
