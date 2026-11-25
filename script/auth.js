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
}
const imprimeForms = ()=>{
    let form = document.createElement("form");
    if(!document.querySelector("main")){
        const main = document.createElement("main");
        document.body.appendBefore(main, document.querySelector("footer"));
    }
    const main = document.querySelector("main");

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
    input.name = "senha";
    input.id = "cadSenha";
    input.placeholder = "Defina a senha"
    label.append(input);
    form.append(label);

    let button = document.createElement("button");
    button.textContent= "Mostrar senha"
    button.addEventListener("click", (e)=>{
        e.preventDefault();
        input.classList.toggle("mostrarSenha");
    })
    label.append(button);

    label = document.createElement("label");
    label.textContent= "Adicionar foot de perfil:";
    label.for = "cadFoto"
    input = document.createElement("input");
    input.type="file";
    input.name = "email";
    input.id = "cadFoto";
    input.accept = ".jpeg .jpg .png .svg";
    label.append(input);
    form.append(label);

    let div = document.createElement("div");
    main.append(div);
    div.append(form);

    input = document.createElement("input");
    input.type="submit";
    input.value = "Cadastrar";
    
    input = document.createElement("input");
    input.type="reset";
    input.value = "Limpar";

    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        const nome = document.querySelector("#cadNome");
        const email = document.querySelector("#cadEmail");
        const senha = document.querySelector("#cadSenha");
        const foto = document.querySelector("#cadFoto");
        const dados = {
            "nome": nome.value, 
            "email": email.value, 
            "senha": `${senha.type="text"; senha.value}`,
            "foto" : foto.
        }
        cadastrarUsuario()
    })


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
    label.for = "cadSenha"
    input = document.createElement("input");
    input.type="password";
    input.required = true;
    input.name = "senha";
    input.id = "cadSenha";
    input.placeholder = "Defina a senha"
    label.append(input);
    form.append(label);

    button = document.createElement("button");
    button.textContent= "Mostrar senha"
    button.addEventListener("click", (e)=>{
        e.preventDefault();
        input.classList.toggle("mostrarSenha");
    })
    label.append(button);
}
