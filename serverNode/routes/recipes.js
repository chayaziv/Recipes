import express from 'express'
import fs from 'fs'
import path from 'path'
import authMiddleware from '../middleware/authMiddleware.js'
import { fileURLToPath } from 'url'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbPath = path.join(__dirname, '../db/db.json')


router.get('/', (req, res) => {
  const db = JSON.parse(fs.readFileSync(dbPath))
  res.json(db.recipes)
})


router.post('/', authMiddleware, (req, res) => {
  const { title, description, products, ingredients, instructions } = req.body
  const db = JSON.parse(fs.readFileSync(dbPath))

  const newRecipe = {
    id: Date.now(),
    title,
    products,
    description,
    authorId: req.header('user-id'),
    ingredients,
    instructions,
  }

  db.recipes.push(newRecipe)
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))

  res.status(201).json({ message: 'Recipe added', recipe: newRecipe })
})

router.get('/author/name/:recipeId', (req, res) => {
  const { recipeId } = req.params
  const db = JSON.parse(fs.readFileSync(dbPath))

  const recipe = db.recipes.find((recipe) => recipe.id.toString() === recipeId)
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' })
  }

  const author = db.users.find((user) => user.id.toString() === recipe.authorId)
  if (!author) {
    return res.status(404).json({ message: 'Author not found' })
  }

  const authorName = `${author.firstName || ''} ${author.lastName || ''}`.trim()
  res.json({ authorName: authorName || 'Unknown' })
})

router.put('/:id', authMiddleware, (req, res) => {
  const { id } = req.params
  const { title, description, ingredients, instructions } = req.body
  const userId = req.header('user-id') 


  const db = JSON.parse(fs.readFileSync(dbPath))


  const recipeIndex = db.recipes.findIndex(
    (recipe) => recipe.id.toString() === id,
  )
  if (recipeIndex === -1) {
    return res.status(404).json({ message: 'Recipe not found' })
  }


  if (db.recipes[recipeIndex].authorId.toString() !== userId) {
    return res
      .status(403)
      .json({ message: 'Unauthorized: You can only edit your own recipes' })
  }


  db.recipes[recipeIndex] = {
    ...db.recipes[recipeIndex],
    title,
    description,
    ingredients,
    instructions,
  }


  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))


  res.json({
    message: 'Recipe updated successfully',
    recipe: db.recipes[recipeIndex],
  })
})

export default router
