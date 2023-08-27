const express = require('express')

const {
  getFinances, 
  getFinance, 
  createFinance, 
  deleteFinance, 
  updateFinance
} = require('../controllers/financeController')

const router = express.Router()

// GET all finances
router.get('/', getFinances)

// GET a single finance
router.get('/:id', getFinance)

// POST a new finance
router.post('/', createFinance)

// DELETE a finance
router.delete('/:id', deleteFinance)

// UPDATE a finance
router.patch('/:id', updateFinance)

module.exports = router