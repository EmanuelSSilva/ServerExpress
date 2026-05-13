import path from 'path'
import {lerAlunos, salvarAlunos} from '../models/modelAluno.js'

// Carrega os alunos do arquivo JSON
const alunos = lerAlunos()

export const criarAluno = (req, res) => {
     // const {cod, curso, ch, tipo} = req.body // desestruturação da requisição
    // console.log(req.body) // visualizando o corpo da requisição     

    const Matricula = req.body.Matricula
    const nome = req.body.nome
    const telefone = req.body.telefone
    const email = req.body.email
    const curso = req.body.curso

    const alunoNovo = {Matricula, nome, telefone, email, curso}

    alunos.push(alunoNovo)
    salvarAlunos(alunos)


    res.redirect('/alunos')
    //res.status(200).json({mensagem: 'Aluno cadastrado!', alunoNovo})

}

export function listarAlunos (req, res) {
    res.render('alunos', { alunos: alunos })
}

export const buscarAluno = (req, res) => {
     const alunoEncontrado = alunos.find(a => a.nome === req.params.nome)
    if(!alunoEncontrado){
      return res.status(500).json({mensagem: 'Aluno não encontrado'})
    }    
    res.status(200).json({mensagem: 'Aluno Encontrado: ', alunoEncontrado})
}

export const atualizarAluno = (req, res) => {
     const alunoEncontrado = alunos.find(a => a.cod === req.params.cod)

    if(!alunoEncontrado){
      return res.status(500).json({mensagem: 'Aluno não encontrado!'})
    }

    const {cod, nome, idade, curso} = req.body

    if(!nome || !idade || !curso) {
        return res.status(400).json({mensagem: 'Preencha todos os dados!'})
    }

    alunoEncontrado.nome = nome
    alunoEncontrado.idade = idade
    alunoEncontrado.curso = curso

    const alunoAtual = {cod, nome, idade, curso}

    res.status(200).json({mensagem: 'Aluno Encontrado: ', alunoAtual})
}

export const removerAluno = (req, res) => {
     const alunoEncontrado = alunos.findIndex(a => a.cod === req.params.cod)

    if(alunoEncontrado === -1){
      return res.status(500).json({mensagem: 'Aluno não encontrado'})
    }

    alunos.splice(alunoEncontrado, 1)

    res.status(200).json({mensagem: 'Aluno Removido com sucesso!', alunos})
}

export const alterAluno = (req, res) => {
    const alunoEncontrado = alunos.find(a => a.cod === req.params.cod)

    if(!alunoEncontrado){
      return res.status(400).json({mensagem: 'Aluno não encontrado!'})
    }

    const {cod, nome, idade, curso} = req.body

    if(nome !== undefined && nome !== null  && nome !== '') {
        alunoEncontrado.nome = nome
    }
    if ( idade !== undefined && idade !== null  && idade !== '' ){
            alunoEncontrado.idade = Number(idade)
    }
    if(curso !== undefined && curso !== null  && curso !== ''){
        alunoEncontrado.curso = curso
    }

    const alunoAtual = {
        cod: cod,
        nome: alunoEncontrado.nome,
        idade: alunoEncontrado.idade,
        curso: alunoEncontrado.curso
    }

    res.status(200).json({mensagem: 'Aluno Encontrado: ', alunoAtual})
}

export const cadastroAluno = (req, res) => {
    res.sendFile(path.join(import.meta.dirname, '../public/html/cadastroAluno.html'))
}

export const paginaBuscarAluno = (req, res) => {
    res.sendFile(path.join(import.meta.dirname, '../public/html/buscarAluno.html'))
}
