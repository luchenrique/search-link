function extraiLinks(arrLinks) {
  return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function checaStatus(listaURLs) {
  const arrStatus = await Promise.all(
    listaURLs.map(async (url) => {
      try {
        const response = await fetch(url);
        return response.status;
      } catch (erro) {
        return manejaErro(erro);
      }
    })
  );
  return arrStatus;
}

function manejaErro(erro) {
  if (erro.cause.code === "ENOTFOUND"){
    return 'Link quebrado';
  } else {
    return 'Ocorreu algum erro';
  }
}

export default async function listaValidada(listaDeLinks) {
  const links = (extraiLinks = extraiLinks(listaDeLinks));
  const status = await checaStatus(links);

  return listaDeLinks.map((objeto, index) => ({
    ...objeto,
    status: status[index],
  }));
}