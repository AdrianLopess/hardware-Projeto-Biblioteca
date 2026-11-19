const criaPagina = ()=>{
    const header = document.createElement('header');
    let item = document.createElement('div');
    item.id="barraPesquisa";
    header.append(item);

    let busca = document.createElement("form");
    busca.id="formBusca";
    let buscaTexto = document.createElement('input');
    buscaTexto.type="text";
    buscaTexto.name="buscaTexto"
    buscaTexto.placeholder="Digite o nome de um livro";
    let buscaButton = document.createElement('input');
    buscaButton.type="submit";
    buscaButton.name="buscaButton";
    busca.append(buscaTexto, buscaButton);
    busca.addEventListener("submit", (e)=>{
        e.preventDefault();
        buscarTitulo(busca.buscaTexto.value);
    })
    header.append(busca);
    item = document.createElement('div');
    item.id="iconeAutenticacao";
    header.append(item);

    const footer = document.createElement('footer');
    document.body.append(header, footer);

    imprimeTitulos();
    imprimeFavoritos();
}
const buscarTitulo = (titulo)=>{
    if(titulo.trim() == ""){
        imprimeTitulos();
        return;
    }
    if(!ocalStorage.getItem("titulos")){
        console.log("nao foi possivel acessar o acervo");
        return;
    }
    let titulos = JSON.parse(localStorage.getItem("titulos"));
    console.log(titulos);
}
const imprimeTitulos = ()=>{
    if(document.querySelector("#listaTitulos")){
        document.querySelector("#listaTitulos").remove();
    }
    if(localStorage.getItem("titulos")){
        const titulos = JSON.parse(localStorage.getItem("titulos"));
        if(titulos.length > 0){
            const listaTitulos = document.createElement('div');
            listaTitulos.id="listaTitulos";
            document.body.insertBefore(listaTitulos, document.querySelector("header").nextSibling)
            if(!document.body.classList.contains('docComTitulos')){
                document.body.classList.add("docComTitulos");
            }
            titulos.forEach((element)=>{
                const item = document.createElement('div');

                let itemDiv = document.createElement("div");
                let span = document.createElement("span");
                span.textContent=element.nome;
                span.classList.add("tituloLivro")
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
                const autores = (element)=>{
                    if(element.autores.length > 1){
                        const nomes = element.autores;
                        return nomes.join(', ');
                    }else{
                        return element.autores[0];
                    }
                }
                span.textContent=`${autores(element)}`;
                itemDiv.append(span);
                item.append(itemDiv);


                if(element.premiacoes.length > 0){
                    itemDiv = document.createElement("div");
                    span = document.createElement("span");
                    span.textContent="Premiacoes: ";
                    itemDiv.append(span);
                    span = document.createElement("span");
                    const premiacoes = (element)=>{
                        if(element.premiacoes.length > 1){
                            const nomes = element.premiacoes;
                            return nomes.join(', ');
                        }else{
                            return element.premiacoes[0];
                        }
                    }
                    span.textContent=`${premiacoes(element)}`;
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

                itemDiv = document.createElement("div");
                span = document.createElement("a");
                span.textContent = "Empréstimo";
                span.href="#";
                span.classList.add("botaoEmprestimo");
                span.addEventListener("click", (e)=>{
                    e.preventDefault();
                    emprestimo(element);
                })
                itemDiv.append(span);
                item.append(itemDiv);

                itemDiv = document.createElement("div");
                span = document.createElement("a");
                span.textContent = "Favoritar";
                span.href="#";
                span.classList.add("botaoFavorito");
                span.addEventListener("click", (e)=>{
                    e.preventDefault();
                    addFavorito(element);
                })
                itemDiv.append(span);
                item.append(itemDiv);

                listaTitulos.append(item);
            })
            
        }
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

            if(!document.body.classList.contains('docComFav')){
                document.body.classList.add("docComFav");
            }
            favoritos.forEach((element) => {
                const item = document.createElement('div');

                let itemDiv = document.createElement("div");
                let span = document.createElement("span");
                span.textContent=element.nome;
                span.classList.add("tituloLivro")
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
                const autores = (element)=>{
                    if(element.autores.length > 1){
                        const nomes = element.autores;
                        return nomes.join(', ');
                    }else{
                        return element.autores[0];
                    }
                }
                span.textContent=`${autores(element)}`;
                console.log(span);
                itemDiv.append(span);
                item.append(itemDiv);

                if(element.premiacoes.length > 0){
                    itemDiv = document.createElement("div");
                    span = document.createElement("span");
                    span.textContent="Premiacoes: ";
                    itemDiv.append(span);
                    span = document.createElement("span");
                    const premiacoes = (element)=>{
                        if(element.premiacoes.length > 1){
                            const nomes = element.premiacoes;
                            return nomes.join(', ');
                        }else{
                            return element.premiacoes[0];
                        }
                    }
                    span.textContent=`${premiacoes(element)}`;
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


                itemDiv = document.createElement("div");
                span = document.createElement("a");
                span.href= "#"
                span.textContent = "Remover";
                itemDiv.append(span);
                span.addEventListener("click", (e)=>{
                    e.preventDefault();
                    rmvFavorito(element);
                })
                item.append(itemDiv)

                listaFav.append(item);
            });

        }
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
const guardarTitulos = (dados)=>{
    if(Array.isArray(dados)){
        localStorage.setItem('titulos', JSON.stringify(dados));
        console.log(JSON.parse(localStorage.getItem("titulos")));
        return;
    }
    console.log("as informacoes fornecidas nao sao um array");
}
const lerTitulos = async ()=>{
    const resposta = await fetch("../private/titulos.json")
    let dados = await resposta.json();
    dados = Object.entries(dados);
    dados = dados[0][1].livros;
    guardarTitulos(dados);
    
}
const lerUsuarios = async()=>{
    const resposta = await fetch("../private/usuarios.json");
    let dados = await resposta.json();
    dados = Object.entries(dados);
    console.log(dados);
    dados = dados[0];
    console.log(dados);
}
const cadastrarUsuario = async ()=>{

}
const addFavorito = (element) =>{
    console.log(element);
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        console.log(favoritos);
        if(!Array.isArray(favoritos)){
            favoritos = [favoritos];
            console.log(favoritos)
        }
        if(favoritos.some(livro => livro.id == element.id)){
            console.log("livro ja existe na lista de favoritos");
            return;
        }
        favoritos.push(element);
        console.log(favoritos);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        imprimeFavoritos();
}
const rmvFavorito = (element)=>{
    console.log(element);
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    if(!Array.isArray(favoritos)){
        favoritos = [favoritos];
    }
    favoritos.forEach((livro, index) =>{
        if(livro.id == element.id){
            favoritos.splice(index, 1);
            return;
        }
    })
    console.log(favoritos);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    imprimeFavoritos();
}
criaPagina();
lerTitulos();
lerUsuarios();