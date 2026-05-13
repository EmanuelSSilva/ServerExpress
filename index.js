import express from 'express'
import routeCurso from './src/routers/routersCurso.js'
import routeAluno from './src/routers/routersAluno.js'
import path from 'path'
import morgan from 'morgan'
import dotenv from 'dotenv'


dotenv.config()

const app = express()

const port = process.env.PORT 
const host = process.env.HOST 

app.use(morgan('dev')) // middleware de logging
app.use(express.json()) //middleware para fazer o parsear JSON no corpo das requisições
app.use(express.urlencoded({extended: true})) //middleware para fazer o parsear dados de formulários (x-www-form-urlencoded)
app.use(express.static(path.join(import.meta.dirname, './src/public'))) //middleware para arquivos estáticos (como HTML, CSS, JS) da pasta 'public'
app.set('view engine', 'ejs')
app.set('views', path.join(import.meta.dirname, './src/views'))

app.use(routeCurso)
app.use(routeAluno)

app.get('/', (req, res) => {
    res.render('index', {nome: 'Visitante' })
})
// app.get('/curso', (req, res) => {
//     res.render('curso')
// })
  

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Servidor em execução em: http://${process.env.HOST}:${process.env.PORT}`)
}) 