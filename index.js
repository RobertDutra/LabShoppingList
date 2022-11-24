let lista = document.querySelector('.listaDeCompra');
let produto = document.querySelector('#produto');
let botao = document.querySelector('#btn');
let janelaEdicao = document.querySelector('#janelaEdicao');
let janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo');
let btnFechar = document.querySelector('#janelaEdicaoBtnFechar');
let btnInserirTotal = document.querySelector('#btnInserirTotal');
let valorProduto = document.querySelector('#valorDoProduto');
let total = document.querySelector('#total');

botao.addEventListener('click', (e) => {
        
    let produtoDigitado = produto.value;
    if(produtoDigitado == ''){
        alert("Produto não digitado!")
    }
    else{
        let item = {
            nome: produto.value,
            id : gerarId(),
        }
        ;
        adicionarProduto(item);
        // gif = '<img src="gifs-de-sucesso-2.gif"/>'
        // msg =  gif + "<p>Adicionado com sucesso.</p>" ;
        // prompt(gif)
        // document.write(msg);
    }
    
});

produto.addEventListener('keyup', (e) => {
    if(e.keyCode === 13){
        let item = {
            nome: produto.value,
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
    let li = criarTagLi(item);
    lista.appendChild(li);
    produto.value = '';
    produto.focus();
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
    let valorDoItem = valorProduto.value;
    total.innerHTML = 'Valor: '+ valorDoItem;
    console.log(valorDoItem); 
})

function excluir (idProduto){
    let confirmacao = window.confirm('Tem certeza que deseja excluir? ')
    if(confirmacao){
        let li = document.getElementById('' + idProduto + '');
        console.log(li)
        console.log(idProduto)
        if(li){
            lista.removeChild(li);
            }
    }
}

function alternarJanelaEdicao(){
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}