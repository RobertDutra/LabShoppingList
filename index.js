let lista = document.querySelector('.listaDeCompra');
let inputProduto = document.querySelector('#inputProduto');
let btnAdicionar = document.querySelector('#btn');
let janelaEdicao = document.querySelector('#janelaEdicao');
let janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo');
let btnFechar = document.querySelector('#janelaEdicaoBtnFechar');
let btnInserirTotal = document.querySelector('#btnInserirTotal');
let valorProduto = document.querySelector('#valorDoProduto');
let total = document.querySelector('#total');
const KEY_CODE_ENTER = 13;
let dbProdutos = [];

obterProdutosLocalStorage();
renderizarListaProdutosHtml();

btnAdicionar.addEventListener('click', (e) => {
    let produtoDigitado = inputProduto.value;
    if(produtoDigitado == ''){
        alert("Produto não digitado!")
    }

    else{
        let item = {
            nome: inputProduto.value,
            id : gerarId(),
        }
        ;
        adicionarProduto(item);
    }
    
});

inputProduto.addEventListener('keyup', (e) => {
    if(e.keyCode === KEY_CODE_ENTER){
        let item = {
            nome: inputProduto.value,
            id : gerarId(),
        };

        adicionarProduto(item);
        
    }
})

function gerarId(){
    return Math.floor(Math.random() * 3000);
}

btnFechar.addEventListener('click', (e) =>{
    alternarJanelaEdicao();
})

function adicionarProduto(item){
    dbProdutos.push(item);
    localStorage.setItem('listaDeProdutos' , JSON.stringify(dbProdutos));
    renderizarListaProdutosHtml();
}

function criarTagLi(item){
    
    let li = document.createElement('li');
    li.id = item.id;
    
    let input = document.createElement('input');
    input.classList.add('check');
    input.type = 'checkbox';
    input.setAttribute('onclick', 'somar('+item.id+')')
    

    let span = document.createElement('span');
    span.classList.add('textoProduto');
    span.innerHTML =  item.nome;

    let div = document.createElement('div');
    div.classList.add('buttons');

    // let btnEditar = document.createElement('button');
    // btnEditar.classList.add('btnAcao');
    // btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
    // btnEditar.setAttribute('onclick', 'editar('+item.id+')');

    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick', 'excluir('+item.id+')');

    // div.appendChild(btnEditar);
    div.appendChild(btnExcluir);

    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(div);
    return li;
}

function somar(idProduto){
    console.log(idProduto);
    console.log(idProduto.value);
    let li = document.getElementById('' + idProduto + '');
    if(li){
        alternarJanelaEdicao();
    }

}

btnInserirTotal.addEventListener('click', (e) =>{
    alert("Funciona")
    
    let valorDoItem = valorProduto.value;
    total.innerHTML = 'Valor: '+ valorDoItem;
    // console.log(valorDoItem); 
})

function excluir (idProduto){
    let confirmacao = window.confirm('Tem certeza que deseja excluir? ')
    if(confirmacao){
        debugger
        const indiceProduto = dbProdutos.findIndex(p => p.id == idProduto);

        if(indiceProduto < 0){
            throw new Error ('Id do produto não encontrado!');
        }

        dbProdutos.splice(indiceProduto, 1);
        localStorage.setItem('listaDeProdutos' , JSON.stringify(dbProdutos));

        let li = document.getElementById('' + idProduto + '');

        if(li){
            lista.removeChild(li);
        
            }
        else{
            alert("Produto não encontrado!")
        }
    }
}

function alternarJanelaEdicao(){
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}

function renderizarListaProdutosHtml(){
    inputProduto.value = '';
    inputProduto.focus();
    lista.innerHTML = '';
    for(let i= 0; i < dbProdutos.length; i++){
        let li = criarTagLi(dbProdutos[i]);
        lista.appendChild(li);
    }
}

function obterProdutosLocalStorage(){
    if(localStorage.getItem('listaDeProdutos')) {
        dbProdutos = JSON.parse(localStorage.getItem('listaDeProdutos'));
    }
}
