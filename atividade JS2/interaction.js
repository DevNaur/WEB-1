let vidas;
let palavras = [];
let palavraAtual;
let dicaAtual;
let exibicao = [];
let numPalavra = 0;

let dicaUsada = false;

const imgMenino = document.getElementById("img-menino");
const palavraEl = document.getElementById("palavra");
const teclado = document.getElementById("box-teclado");
const boxDica = document.getElementById("box-dica");
const textoDica = document.getElementById("texto-dica");

document.getElementById("btn_iniciar").addEventListener("click", novoJogo);
document.getElementById("btn_dica").addEventListener("click", mostrarDica);

async function iniciar() {
    const response = await fetch("fases.json");
    const data = await response.json();
    palavras = data.frutas;
}

iniciar();

/* ===== DICAS AUTOMÁTICAS ===== */
function gerarDica(palavra) {
    const dicas = {
        "ABACAXI": "Tem coroa e é muito usado em sucos.",
        "MELANCIA": "Grande, verde por fora e vermelha por dentro.",
        "BANANA": "Amarela e preferida dos macacos.",
        "MORANGO": "Vermelho, doce e pequeno.",
        "UVA": "Vem em cachos e pode ser roxa ou verde.",
        "LARANJA": "Cítrica, rica em vitamina C.",
        "PERA": "Tem formato parecido com uma gota.",
        "MANGA": "Doce e amarela, muito popular no Brasil.",
        "GOIABA": "Pode ser vermelha ou branca por dentro.",
        "CEREJA": "Pequena, vermelha e usada em bolos."
    };

    return dicas[palavra] || "Sem dica disponível.";
}

function novoJogo() {
    vidas = 6;
    numPalavra = 0;
    dicaUsada = false;

    imgMenino.src = "imgs/menino1.png";

    boxDica.classList.add("escondido");
    document.getElementById("btn_dica").disabled = false;

    carregarPalavra();
}

function carregarPalavra() {
    palavraAtual = palavras[numPalavra];
    dicaAtual = gerarDica(palavraAtual);

    exibicao = Array(palavraAtual.length).fill("_");
    palavraEl.textContent = exibicao.join(" ");

    dicaUsada = false;
    document.getElementById("btn_dica").disabled = false;
    boxDica.classList.add("escondido");

    carregarTeclado();
}

function carregarTeclado() {
    teclado.innerHTML = "";

    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    letras.split("").forEach(letra => {
        const btn = document.createElement("button");
        btn.textContent = letra;
        btn.classList.add("tecla");

        btn.addEventListener("click", () => verificarLetra(letra, btn));
        teclado.appendChild(btn);
    });
}

function mostrarDica() {
    boxDica.classList.remove("escondido");
    textoDica.textContent = dicaAtual;

    document.getElementById("btn_dica").disabled = true;
}

function verificarLetra(letra, botao) {
    botao.disabled = true;

    let acertou = false;

    for (let i = 0; i < palavraAtual.length; i++) {
        if (palavraAtual[i] === letra) {
            exibicao[i] = letra;
            acertou = true;
        }
    }

    palavraEl.textContent = exibicao.join(" ");

    if (!acertou) {
        vidas--;
        imgMenino.src = `imgs/menino${7 - vidas}.png`;
    }

    if (vidas === 0) {
        alert(`😢 Fim de jogo! A palavra era: ${palavraAtual}`);
        desativarTeclado();
        return;
    }

    if (!exibicao.includes("_")) {
        alert(`🎉 Você acertou: ${palavraAtual}!`);
        proximaPalavra();
    }
}

function proximaPalavra() {
    numPalavra++;

    if (numPalavra >= palavras.length) {
        alert("🏆 Você descobriu todas as palavras!");
        desativarTeclado();
        return;
    }

    carregarPalavra();
}

function desativarTeclado() {
    document.querySelectorAll(".tecla").forEach(b => b.disabled = true);
}
