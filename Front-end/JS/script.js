
const produtosCotacao = [
    { nome: "Banana Prata", precoAtual: 25.00, precoAnt: 22.00, unidade: "Milheiro" },
    { nome: "Tomate", precoAtual: 80.00, precoAnt: 90.00, unidade: "Cx 20kg" },
    { nome: "Abacate", precoAtual: 5.50, precoAnt: 5.50, unidade: "Kg" },
    { nome: "Maracujá", precoAtual: 7.00, precoAnt: 6.00, unidade: "Kg" }
];

function carregarCotacoes() {
    const corpoTabela = document.getElementById('corpoTabela');
    corpoTabela.innerHTML = ""; // Limpa antes de preencher

    produtosCotacao.forEach(prod => {
        let icone = "➖";
        let classe = "";

        // Algoritmo de comparação
        if (prod.precoAtual > prod.precoAnt) {
            icone = "⬆"; // Preço subiu
            classe = "alta"; // Vermelho (ruim para quem compra, bom pra quem vende)
        } else if (prod.precoAtual < prod.precoAnt) {
            icone = "⬇"; // Preço caiu
            classe = "baixa";
        }

        const linha = `
            <tr>
                <td>${prod.nome} <br><small>${prod.unidade}</small></td>
                <td>R$ ${prod.precoAtual.toFixed(2)}</td>
                <td class="${classe}">${icone}</td>
            </tr>
        `;
        corpoTabela.innerHTML += linha;
    });
}

const anunciosDb = [
    { titulo: "Mudas de Café", tipo: "VENDA", preco: "R$ 5,00", local: "Ubajara" },
    { titulo: "Frete para Fortaleza", tipo: "SERVIÇO", preco: "A combinar", local: "Tianguá" },
    { titulo: "Compro Esterco", tipo: "COMPRA", preco: "Negociável", local: "São Benedito" },
    { titulo: "Trator para Alugar", tipo: "SERVIÇO", preco: "R$ 150/h", local: "Guaraciaba" }
];

function carregarAnuncios(filtro = "") {
    const lista = document.getElementById('listaAnuncios');
    lista.innerHTML = "";

    anunciosDb.forEach(anuncio => {
        // Algoritmo de Busca (Filtro)
        if (anuncio.titulo.toLowerCase().includes(filtro.toLowerCase())) {
            
            let corTag = anuncio.tipo === "VENDA" ? "tag-venda" : "tag-compra";
            
            const card = `
                <div class="card-anuncio">
                    <span class="${corTag}">${anuncio.tipo}</span>
                    <h3>${anuncio.titulo}</h3>
                    <p><strong>${anuncio.preco}</strong></p>
                    <p><small>📍 ${anuncio.local}</small></p>
                    <button onclick="alert('Abrindo WhatsApp do vendedor...')">Contato</button>
                </div>
            `;
            lista.innerHTML += card;
        }
    });
}

// Função para o botão de busca
function filtrarAnuncios() {
    const termo = document.getElementById('campoBusca').value;
    carregarAnuncios(termo);
}

window.onload = function() {
    carregarCotacoes();
    carregarAnuncios();
    console.log("Sistema AgroConecta carregado com sucesso!");
};