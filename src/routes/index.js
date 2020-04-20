import * as usersRouter from './users'
import * as addressesRouter from './addresses'

export const bind = app => {
    
    usersRouter.bind(app)
    addressesRouter.bind(app)
    
}
