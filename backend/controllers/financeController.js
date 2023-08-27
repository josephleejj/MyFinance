const Finance = require('../schemas/financeSchema')
const mongoose = require('mongoose')

// get all finances
const getFinances = async (req, res) => {
  const finances = await Finance.find({}).sort({createdAt: -1})

  res.status(200).json(finances)
}

// get a single finance
const getFinance = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such finance'})
  }

  const finance = await Finance.findById(id)

  if (!finance) {
    return res.status(404).json({error: 'No such finance'})
  }

  res.status(200).json(finance)
}

// create a new finance
const createFinance = async (req, res) => {
    const {description, amount, type, date} = req.body

    let emptyFields = []

    if (!description) {
      emptyFields.push('Description')
    }
    
    if (!type) {
      emptyFields.push('Category')
    }

    if (!amount) {
      emptyFields.push('Amount')
    }

    if (!date) {
      emptyFields.push('Date')
    }

    if (emptyFields.length > 0) {
      return res.status(404).json({ error: 'Please fill in all the fields', emptyFields})
    }

  // add to the database
  try {
    const finance = await Finance.create({ description, amount, type, date })
    res.status(200).json(finance)
    console.log('added into database')
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a finance
const deleteFinance = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such finance'})
    }
  
    const finance = await Finance.findOneAndDelete({_id: id})
  
    if(!finance) {
      return res.status(400).json({error: 'No such finance'})
    }
  
    res.status(200).json(finance)
  }
  
  // update a finance
  const updateFinance = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such finance'})
    }
  
    const finance = await Finance.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!finance) {
      return res.status(400).json({error: 'No such finance'})
    }
  
    res.status(200).json(finance)
  }

module.exports = {
  getFinances,
  getFinance,
  createFinance,
  deleteFinance,
  updateFinance
}