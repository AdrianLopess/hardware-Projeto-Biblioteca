const criaPagina = ()=>{
    const header = document.createElement('header');
    let item = document.createElement('div');
    item.id="iconeInicio";
    header.append(item);

    item = document.createElement('div');
    item.id="iconeAutenticacao";
    header.append(item);

    const footer = document.createElement('footer');
    document.body.append(header, footer);
    imprimeForms();
}
const imprimeForms = ()=>{
    if(!document.querySelector("main")){
        const main = document.createElement("main");
        document.body.insertBefore(main, document.querySelector("footer"));
    }
    const main = document.querySelector("main");
    let defJson = document.createElement("button");
    defJson.textContent= "Definir arquivo json";
    defJson.addEventListener("click", (e)=>{
        e.preventDefault();
        selecionarArquivo();
    })
    main.append(defJson);
    
    let form = document.createElement("form");
    let label = document.createElement("label");
    label.textContent= "Nome:";
    label.for = "cadNome"
    let input = document.createElement("input");
    input.type="text";
    input.required = true;
    input.name = "nome";
    input.id = "cadNome";
    input.placeholder = "Insira o primeiro nome"
    label.append(input);
    form.append(label);
    
    label = document.createElement("label");
    label.textContent= "Email:";
    label.for = "cadEmail"
    input = document.createElement("input");
    input.type="email";
    input.required = true;
    input.name = "email";
    input.id = "cadEmail";
    input.placeholder = "Insira o email"
    label.append(input);
    form.append(label);

    label = document.createElement("label");
    label.textContent= "Senha:";
    label.for = "cadSenha"
    input = document.createElement("input");
    input.type="password";
    input.required = true;
    input.minLength = "6";
    input.name = "senha";
    input.id = "cadSenha";
    input.placeholder = "Defina a senha"
    label.append(input);
    form.append(label);

    let button = document.createElement("button");
    button.textContent= "Mostrar senha"
    button.id="cadShow"
    button.addEventListener("click", (e)=>{
        e.preventDefault();
        const senha = document.querySelector("#cadSenha")
        if(senha.type === "password"){
            senha.type = "text";
        }else{
            senha.type = "password"
        }
    })
    label.append(button);

    let div = document.createElement("div");
    form.append(div);

    input = document.createElement("input");
    input.type="submit";
    input.value = "Cadastrar";
    input.classList.add("btnAuth");
    div.append(input);
    
    input = document.createElement("input");
    input.type="reset";
    input.value = "Limpar";
    input.classList.add("btnLimpar")
    div.append(input);

    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        const nome = document.querySelector("#cadNome");
        const email = document.querySelector("#cadEmail");
        const senha = document.querySelector("#cadSenha");
        senha.type = "text";
        const dados = {
            "nome": nome.value, 
            "email": email.value, 
            "senha": senha.value
        }
        cadastrarUsuario([dados])
        console.log(dados);
        const form = document.forms[0];
        form.reset();
    })
    input.addEventListener("click", (e)=>{
        e.preventDefault();
        form.reset();
    })
    main.append(form);


    form = document.createElement("form");

    label = document.createElement("label");
    label.textContent= "Email:";
    label.for = "autEmail"
    input = document.createElement("input");
    input.type="email";
    input.required = true;
    input.name = "email";
    input.id = "autEmail";
    input.placeholder = "Insira o email"
    label.append(input);
    form.append(label);

    label = document.createElement("label");
    label.textContent= "Senha:";
    label.for = "authSenha"
    input = document.createElement("input");
    input.type="password";
    input.minLength = "6";
    input.required = true;
    input.name = "senha";
    input.id = "authSenha";
    input.placeholder = "Digite a senha"
    label.append(input);
    form.append(label);

    button = document.createElement("button");
    button.textContent= "Mostrar senha"
    button.addEventListener("click", (e)=>{
        e.preventDefault();
        if(input.type === "password"){
            input.type = "text";
        }else{
            input.type = "password"
        }
    })
    label.append(button);
    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        autenticarUsuario();
    })

    div = document.createElement("div");
    form.append(div);

    input = document.createElement("input");
    input.type="submit";
    input.value = "Autenticar";
    input.classList.add("btnAuth")
    div.append(input);
    
    input = document.createElement("input");
    input.type="reset";
    input.value = "Limpar";
    input.classList.add("btnLimpar");
    div.append(input);

    main.append(form);
}
const cadastrarUsuario = async (dados) => {

    if (!Array.isArray(dados)) return;

    const resultado = await lerUsuarios();

    if (!resultado) return;

    const usuarios = resultado.usuarios;
    const arquivo = resultado.arquivo;

    const existe = usuarios.some(
        usuario => usuario.email === dados[0].email
    );

    if (existe) {
        console.log("Email já existe!");
        return;
    }

    const maiorId = usuarios.reduce(
        (maior, usuario) =>
            Math.max(maior, Number(usuario.id) || 0),
        0
    );

    dados[0].id = maiorId + 1;

    usuarios.push(dados[0]);

    await salvarUsuarios(arquivo, usuarios);

    console.log("Usuário cadastrado!", usuarios);
};
const lerUsuarios = async () => {
    if (!arquivoUsuarios) {
        console.log("Arquivo ainda não selecionado!");
        return null;
    }

    const arquivo = await arquivoUsuarios.getFile();

    const conteudo = await arquivo.text();

    return JSON.parse(conteudo);
};
const salvarUsuarios = async (usuarios) => {
    const gravacao = await arquivoUsuarios.createWritable();

    await gravacao.write(
        JSON.stringify(usuarios, null, 4)
    );

    await gravacao.close();
};
const selecionarArquivo = async () => {
    try {
        [arquivoUsuarios] = await window.showOpenFilePicker({
            types: [{
                description: "Arquivo JSON",
                accept: {
                    "application/json": [".json"]
                }
            }]
        });
        
        console.log("Arquivo selecionado com sucesso!");
        
    } catch (erro) {
        console.error("Erro ao selecionar arquivo:", erro);
    }
};
let arquivoUsuarios = null;

criaPagina();