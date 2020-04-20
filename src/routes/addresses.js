import db from '../db'

const getAll = () => Object.values(db.addresses)

const getById = id => db.addresses[+id] || null

const getByUserId = userId => Object.values(db.users)
    .find(it => +it.id === +userId).address

//

export const bind = app => {
    
    app.get('/addresses', (_, res) => {
        res.json(getAll())
    })

    app.get('/addresses/:id', (req, res) => {
        res.json(getById(req.params.id))
    })
    
}
