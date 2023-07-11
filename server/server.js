const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const promisePool = require('./db')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

app.use(cors())
app.use(express.json())

// Get all todos
app.get('/todos/:userEmail', async (req, res) => {
    const userEmail = req.params.userEmail
    await promisePool.query("SELECT * FROM todos WHERE user_email = ?", [userEmail])
    .then(result => {
        res.json(result[0])
    }).catch(console.log)
})

// Create a todo
app.post('/todos', async (req, res) => {
    const { user_email, title, progress, date } = req.body
    console.log(user_email, title, progress, date)
    const id = uuidv4()
    await promisePool.query("INSERT INTO todos(id, user_email, title, progress, date) VALUES (?, ?, ?, ?, ?)",
    [id, user_email, title, progress, date])
    .then(response => res.json(response))
    .catch(console.log)
})

// Edit a todo
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params
    const { user_email, title, progress, date } = req.body
    await promisePool.query("UPDATE todos SET user_email = ?, title = ?, progress = ?, date = ? WHERE id = ?",
    [user_email, title, progress, date, id])
    .then(response => res.json(response))
    .catch(console.log)
})

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params
    await promisePool.query("DELETE FROM todos WHERE id = ?", [id])
    .then(response => res.json(response))
    .catch(console.log)
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))