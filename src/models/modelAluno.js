import fs from 'fs'
import path from 'path'

// export let cursos = [{
//     cod: '001', 
//     curso: 'Desenvolvimento de Sistema', 
//     ch: 1200, 
//     tipo: 'Técnico'
// }]

// caminho do arquivo JSON
const caminho = path.join(import.meta.dirname, '..', 'database', 'alunos.json')

export function lerAlunos() {
    try {
        if (!fs.existsSync(caminho)) {               //verifica se o arquivo existe
            fs.writeFileSync(caminho, '[]', 'utf-8')
        }
        const conteudo = fs.readFileSync(caminho, 'utf-8')
        if (conteudo === '') {
            return []
        } else {
            return JSON.parse(conteudo)
        }
    } catch (error) {
        console.error("Erro ao ler o arquivo:", error)
        return []
    }
}

export function salvarAlunos(alunos) {
    console.log(alunos)
    try {
        fs.writeFileSync(caminho, JSON.stringify(alunos, null, 2))
        console.log("Arquivo JSON criado com sucesso!")
    } catch (error) {
        console.error("Erro ao escrever o arquivo:", error)
    }
}
