import pegaArquivo from "./index.js";   
import fs from "fs";
import chalk from "chalk"; 
import listaValidada from "./http-validacao.js";

const caminho = process.argv; // Pega o caminho do arquivo ou diretório

async function imprimeLista(valida, resultado, identificador = '') {

    if (valida){ // Caso --valida seja verdadeiro será impresso a lista validada + resultado
      console.log(
        chalk.yellow("Lista Validada"),
        chalk.black.bgGreen(identificador),
        await listaValidada(resultado));        
    }else{
      console.log( // Caso --valida seja falso será impresso a lista de links + resultado
        chalk.yellow("Lista de links"),
        chalk.black.bgGreen(identificador),
        resultado);        
    }
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';

    try{
        fs.lstatSync(caminho); // Verifica a existencia do caminhho informado
    } catch (erro) {
        if(erro.code === 'ENOENT'){ // Mensagem de erro caso o arquivo ou diretório não seja encontrado
            console.log(chalk.red('Arquivo ou diretório não encontrado'));
            return;
        }
    }

    if (fs.lstatSync(caminho).isFile()){ // Verifica se o caminho é um arquivo
        const resultado = await pegaArquivo(argumentos[2]); //
        imprimeLista(valida, resultado); // Imprime a lista de links
    } else if (fs.lstatSync(caminho).isDirectory()){ // Verifica se o caminho é um diretório
        const arquivos = await fs.promises.readdir(caminho) 
        arquivos.forEach(async (nomeDeArquivo) => { 
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`) 
            imprimeLista(valida, lista, nomeDeArquivo);
        })
    }
}

processaTexto(caminho); // Chama a função processaTexto passando o caminho do arquivo ou diretório