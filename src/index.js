import express from 'express'
import bodyParser from 'body-parser'
import * as routes from './routes'
import { initDatabase } from './db'

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
const uri = `http://${host}:${port}`

const app = express()
const routesMap = []

const interceptRoute = (o, v) => {
    const nv = `_${v}`
    o[nv] = o[v]
    o[v] = (...args) => {
        const path = args[0]
        if (path && path.startsWith('/'))
            routesMap.push({
                type: v.toUpperCase(),
                path: `${uri}${path}`
            })
        o[nv](...args)
    }
}

const getHtmlRoutingTable = () => {
    const html = routesMap.map(it => `
        <li>${it.type} <a href="${it.path}">${it.path}</a></li>
    `).join('\n')
    const css = `
        <style type="text/css">
        body { font-family: Hack, Monaco, monospace; }
        li { margin: 0; padding: 10px; }
        </style>
    `
    return `<html><head>${css}</head><body><ul>${html}</body></html>`
}

interceptRoute(app, 'get')
interceptRoute(app, 'put')
interceptRoute(app, 'del')
interceptRoute(app, 'post')

initDatabase()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//app.use(express.static('client'))

app.get('/', (_, res) => {
    res.send(getHtmlRoutingTable())
})

app.post('/reset', (_, res) => {
    initDatabase()
    res.send({ status: 'Database reset' })
})

routes.bind(app)

app.listen(port, host, () => console.log(`Listening on ${uri}`))
