document.getElementById("finance-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const descricao = document.getElementById("descricao").value;
    const categoria = document.getElementById("categoria").value;
    const data = document.getElementById("data").value;
    const valor = parseFloat(document.getElementById("valor").value);

    const transacao = { descricao, categoria, data, valor };

    let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];
    transacoes.push(transacao);

    localStorage.setItem("transacoes", JSON.stringify(transacoes));

    document.getElementById("finance-form").reset();

    atualizarInterface();
});

function atualizarInterface() {
    const transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];
    const tabela = document.querySelector("#transaction-table tbody");
    tabela.innerHTML = "";

    let totalReceitas = 0;
    let totalDespesas = 0;

    transacoes.forEach((transacao, index) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${transacao.descricao}</td>
            <td>${transacao.categoria}</td>
            <td>${new Date(transacao.data).toLocaleDateString()}</td>
            <td>R$ ${transacao.valor.toFixed(2)}</td>
            <td>
                <button onclick="editarTransacao(${index})">Editar</button>
                <button onclick="excluirTransacao(${index})">Excluir</button>
            </td>
        `;

        tabela.appendChild(linha);

        if (transacao.categoria === "receita") {
            totalReceitas += transacao.valor;
        } else {
            totalDespesas += transacao.valor;
        }
    });

    document.getElementById("total-receitas").textContent = `R$ ${totalReceitas.toFixed(2)}`;
    document.getElementById("total-despesas").textContent = `R$ ${totalDespesas.toFixed(2)}`;
    document.getElementById("saldo-final").textContent = `R$ ${(totalReceitas - totalDespesas).toFixed(2)}`;
}

function excluirTransacao(index) {
    let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];
    transacoes.splice(index, 1);
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
    atualizarInterface();
}

function editarTransacao(index) {
    let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];
    const transacao = transacoes[index];

    document.getElementById("descricao").value = transacao.descricao;
    document.getElementById("categoria").value = transacao.categoria;
    document.getElementById("data").value = transacao.data;
    document.getElementById("valor").value = transacao.valor;

    excluirTransacao(index);
}

document.addEventListener("DOMContentLoaded", atualizarInterface);