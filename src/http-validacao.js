function extraiLinks(arrLinks) { // Função que extrai os links do texto
  return arrLinks.map((objetoLink) => Object.values(objetoLink).join()); // Retorna um array com os links encontrados
}

async function checaStatus(listaURLs) { // Função que verifica o status dos links
  const arrStatus = await Promise.all( // Retorna um array com os status dos links
    listaURLs.map(async (url) => { // Mapeia a lista de links
      try { // Tenta fazer a requisição
        const response = await fetch(url);
        return response.status;
      } catch (erro) { // Caso ocorra um erro, retorna a mensagem de erro
        return manejaErro(erro);
      }
    })
  );
  return arrStatus;
}

// Tratamento de erro
function manejaErro(erro) { 
  if (erro.cause.code === "ENOTFOUND"){ 
    return 'Link quebrado';
  } else {
    return 'Ocorreu algum erro'; 
  }
}

export default async function listaValidada(listaDeLinks) { // Função que retorna a lista de links validados
  const links = (extraiLinks = extraiLinks(listaDeLinks)); 
  const status = await checaStatus(links); // Retorna o status dos links

  return listaDeLinks.map((objeto, index) => ({ // Retorna um array com os links e seus status
    ...objeto, // Retorna o objeto com o link
    status: status[index],
  }));
}