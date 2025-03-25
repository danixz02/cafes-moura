document.addEventListener("DOMContentLoaded", function () {
    const listaCarrinho = document.getElementById("lista-carrinho");
    const totalCompra = document.getElementById("total-compra");
  
    // Recupera os dados do localStorage
    const itensCarrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const total = localStorage.getItem("total") || "0.00";
  
    // Adiciona os itens na lista
    itensCarrinho.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
      listaCarrinho.appendChild(li);
    });
  
    // Exibe o total
    totalCompra.textContent = `Total: R$ ${total}`;
  });

  
  document.getElementById("confirmarPagamento").addEventListener("click", function() {
    // Verifica se alguma opção de pagamento está selecionada
    if (!document.querySelector('input[name="pagamento"]:checked')) {
      alert("Por favor, selecione uma opção de pagamento!");
      return;
    }
      
    comprar();

    function comprar() {
        alert("Compra finalizada com sucesso!");
        localStorage.removeItem("carrinho");
        localStorage.removeItem("total");
        window.location.href = "../index.html";
      }
  });
  
