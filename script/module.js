const criaPagina = ()=>{
    const header = document.createElement('header');
    let item = document.createElement('div');
    item.id="barraPesquisa";
    header.append(item);

    let busca = document.createElement("form");
    busca.id="formBusca";
    let buscaTexto = document.createElement('input');
    buscaTexto.type="text";
    buscaTexto.name="buscaTitulo"
    buscaTexto.placeholder="Digite o nome de um livro";
    let buscaButton = document.createElement('input');
    buscaButton.type="submit";
    buscaButton.name="buscaButton";
    busca.append(buscaTexto, buscaButton);
    busca.addEventListener("submit", (e)=>{
        e.preventDefault();
        buscarTitulo(busca.buscarTitulo.value);
    })
    item = document.createElement('div');
    item.id="iconeAutenticacao";
    header.append(item);

    const footer = document.createElement('footer');
    document.body.append(header, footer);
    imprimeTitulos();
}
const buscarTitulo = (titulo)=>{
    console.log(titulo);
}
const imprimeTitulos = ()=>{
    if(document.querySelector("#listaTitulos")){
        document.querySelector("#listaTitulos").remove();
    }
    if(localStorage.getItem("titulos")){
        const titulos = JSON.parse(localStorage.getItem("titulos"));
        const listaTitulos = document.createElement('div');
        listaTitulos.id="listaTitulos";
        if(document.body.classList.contains)

        console.log(titulos);
    }else{
        console.log("nao foi possivel acessar o acervo");
    }
}
const imprimeFavoritos = ()=>{
    if(document.querySelector("#listaFav")){
        document.querySelector('#listaFav').remove();
    }
    if(localStorage.getItem("favoritos")){
        const favoritos = JSON.parse(localStorage.getItem("favoritos"));
        if(favoritos.length > 0){
            const listaFav = document.createElement('div');
            listaFav.id="listaFav";
            document.body.insertBefore(listaFav, document.querySelector("footer"));

            const favHeader = document.createElement('h3');
            favHeader.textContent="Lista de Favoritos";
            listaFav.append(favHeader);

            if(!document.body.contains('docComFav')){
                document.body.classList.add("docComFav");
            }
            favoritos.forEach((element) => {
                const item = document.createElement('div');

                let itemDiv = document.createElement("div");
                let span = document.createElement("span");
                span.textContent=element.nome;
                itemDiv.append(span);
                item.append(itemDiv);

                itemDiv = document.createElement("div");
                span = document.createElement("span");
                span.textContent="Data de publicação: ";
                itemDiv.append(span);
                span = document.createElement("span");
                span.textContent=element.data_publicacao;
                itemDiv.append(span);
                item.append(itemDiv);

                itemDiv = document.createElement("div");
                span = document.createElement("span");
                span.textContent="Autor(es): ";
                itemDiv.append(span);
                span = document.createElement("span");
                span.textContent=`${(element)=>{
                    if(element.autores.length > 1){
                        const nomes = element.autores;
                        return nomes.join(', ');
                    }else{
                        return element.autores[0];
                    }
                }}`;
                console.log(span);
                itemDiv.append(span);
                item.append(itemDiv);

                if(element.premiacoes.length > 0){
                    itemDiv = document.createElement("div");
                    span = document.createElement("span");
                    span.textContent="Premiacoes: ";
                    itemDiv.append(span);
                    span = document.createElement("span");
                    span.textContent=`${(element)=>{
                        if(element.premiacoes.length > 1){
                            const nomes = element.premiacoes;
                            return nomes.join(', ');
                        }else{
                            return element.premiacoes[0];
                        }
                    }}`;
                    console.log(span);
                    itemDiv.append(span);
                    item.append(itemDiv);
                }

                itemDiv = document.createElement("div");
                span = document.createElement("span");
                span.textContent="Editora: ";
                itemDiv.append(span);
                span = document.createElement("span");
                span.textContent=element.editora;
                itemDiv.append(span);
                item.append(itemDiv);

                listaFav.append(item);
            });
        }
        console.log(favoritos);
    }else{
        if(document.body.classList.contains("docComFav")){
            document.body.classList.remove('docComFav');
        }
        console.log("nao foi possivel encontrar a lista de favoritos");
    }
}
const imprimeEmprestimos = ()=>{
    if(localStorage.getItem('emprestimos')){
        const emprestimos = JSON.parse(localStorage.getItem("emprestimos"));
        console.log(emprestimos);
    }else{
        console.log("nao foi possivel acessar os emprestimos");
    }
}
const guardarTitulos = ()=>{

}
criaPagina();