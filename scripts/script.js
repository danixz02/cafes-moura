const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

burger.addEventListener("click", () => {
  menu.classList.toggle("active");
  burger.classList.toggle("toggle");
});

document.addEventListener("DOMContentLoaded", function () {
  const botoesAdicionar = document.querySelectorAll(".btn");
  const carrinhoIcon = document.getElementById("carrinho-icon");
  const modalCarrinho = document.getElementById("modal-carrinho");
  const fecharModal = document.getElementById("fechar-modal");
  const carrinhoItensModal = document.getElementById("carrinho-itens-modal");
  const totalPrecoModal = document.getElementById("total-preco-modal");
  const badge = document.getElementById("badge");
  const toast = document.getElementById("toast");
  const btnFinalizarCompra = document.getElementById("finalizarCompraBtn");

  let total = 0;
  let quantidadeItens = 0;

  // Adiciona produto ao carrinho
  botoesAdicionar.forEach((botao) => {
    botao.addEventListener("click", function () {
      const card = botao.closest(".card");
      const img = card.querySelector("img").outerHTML;
      const nomeProduto = card.querySelector("h2").textContent;
      const precoProduto = parseFloat(
        card.querySelector(".valorReal").textContent.replace("R$ ", "").replace(",", ".")
      );

      // Criar item no carrinho
      const itemCarrinho = document.createElement("li");
      itemCarrinho.innerHTML = `
        ${img}  ${nomeProduto} - R$ ${precoProduto.toFixed(2)}
        <button class="remover">Excluir</button>
      `;
      carrinhoItensModal.appendChild(itemCarrinho);

      // Atualizar total
      total += precoProduto;
      totalPrecoModal.textContent = total.toFixed(2);

      // Remover item do carrinho
      itemCarrinho.querySelector(".remover").addEventListener("click", function () {
        itemCarrinho.remove();
        total -= precoProduto;
        totalPrecoModal.textContent = total.toFixed(2);

        // Atualiza quantidade de itens no badge
        quantidadeItens--;
        badge.textContent = quantidadeItens;
      });

      // Atualiza a quantidade de itens no badge
      quantidadeItens++;
      badge.textContent = quantidadeItens;

      // Exibe a notificação de item adicionado
      toast.className = "toast show";
      setTimeout(function () {
        toast.className = toast.className.replace("show", "");
      }, 3000);
    });
  });

  // Finalizar compra - Salva itens no localStorage e redireciona para a página de pagamento
  function finalizarCompra() {
    const itensCarrinho = [];
    document.querySelectorAll("#carrinho-itens-modal li").forEach((item) => {
      const nomeProduto = item.textContent.split(" - R$ ")[0].trim();
      const precoProduto = parseFloat(item.textContent.split(" - R$ ")[1]);

      itensCarrinho.push({ nome: nomeProduto, preco: precoProduto });
    });

    const total = parseFloat(totalPrecoModal.textContent);

    // Salvar no localStorage
    localStorage.setItem("carrinho", JSON.stringify(itensCarrinho));
    localStorage.setItem("total", total.toFixed(2));

    // Redirecionar para a página de pagamento
    window.location.href = "../pages/pagamento.html";
  }

  // Adiciona evento ao botão "Finalizar Compra"
  if (btnFinalizarCompra) {
    btnFinalizarCompra.addEventListener("click", finalizarCompra);
  }

  // Abre o modal quando clicar no ícone do carrinho
  carrinhoIcon.addEventListener("click", function () {
    modalCarrinho.style.display = "block";
  });

  // Fecha o modal quando clicar no "X"
  fecharModal.addEventListener("click", function () {
    modalCarrinho.style.display = "none";
  });

  // Fecha o modal clicando fora dele
  window.addEventListener("click", function (event) {
    if (event.target === modalCarrinho) {
      modalCarrinho.style.display = "none";
    }
  });
});
