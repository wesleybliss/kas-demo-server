import db from '../db'

const getAll = (offset = 0, limit = 100) => Object.values(db.users).slice(offset, (offset + limit))

const getById = id => db.users[+id] || null

const getByEmail = email => Object.values(db.users)
    .find(it => it.email.toLowerCase() === email.toLowerCase())

//

export const bind = app => {
    
    app.get('/users', (req, res) => {
        if (!req.query.email)
            res.json(getAll())
        else
            res.json(getByEmail(req.query.email))
    })
    
    app.get('/users/:id', (req, res) => {
        res.json(getById(req.params.id))
    })
    
}
