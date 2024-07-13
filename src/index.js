import fs from 'fs'; // biblioteca nativa do node para ler arquivos
import chalk from 'chalk'; // biblioteca para colorir o terminal

function extraiLinks(texto) { // Função que extrai os links do texto
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm; // Define uma expressão regular para capturar links em formato markdown
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: [captura[2]]}))
    return resultados.length !== 0 ? resultados : chalk.red('não há links no arquivo'); // Retorna com array com os links encontrados ou uma mensagem de erro em vermelho
}

function trataErro(erro){ // Função que trata os erros
    console.log(erro); // Imprime o erro no console
    throw new Error(chalk.red(erro.code, 'não há arquivo no caminho informado')); // Outra exceção, caso não encontre o arquivo
}

async function pegaArquivo(caminhoDoArquivo){ // Função que lê o arquivo
    try {
      const enconding = "utf-8";
      // Faz a leitra do arquivo
      const texto = await fs.promises.readFile(caminhoDoArquivo, enconding);
      return extraiLinks(texto); // Extrái os links do texto que foi lido
    } catch (erro) {
      trataErro(erro);
    } 
}

export default pegaArquivo;