import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { lerAlunos, salvarAlunos } from '../models/modelAluno.js'
import { criarAluno, listarAlunos } from '../controllers/controllersAluno.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const routersAluno = express.Router()

let alunos = lerAlunos()

// rota para exibir o formulário de cadastro
routersAluno.get('/aluno', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/cadastroAluno.html'))
})

routersAluno.get('/cadastroAluno', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/cadastroAluno.html'))
})

// rota para cadastrar um novo aluno
routersAluno.post('/aluno', criarAluno)

// rota para listar todos os alunos
routersAluno.get('/alunos', listarAlunos)

export default routersAluno
