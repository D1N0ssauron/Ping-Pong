// Const para pegar o canvas element do DOM(querySelector pq vou usar a tag e não ID) e setar canvas context() que neste caso será o "2d"
const canvasEl = document.querySelector("canvas"),
  canvasCtx = canvasEl.getContext("2d");

const lineWidth = 15;

// obj Campo
const campo = {
  //Aqui temos duas propriedades e um método que fizemos para criar o Obj campo
  w: window.innerWidth,
  h: window.innerHeight,
  draw: function () {
    // Primeiro definimos cor e depois dimensão
    //Depois vai o posicionamento (x, y, largura, altura)
    // Desenha o campo
    canvasCtx.fillStyle = "#286047";
    canvasCtx.fillRect(0, 0, this.w, this.h);
  },
};

// obj Linha
const linha = {
  w: lineWidth,
  h: campo.h,
  draw: function () {
    // Primeiro definimos cor e depois dimensão
    //Depois vai o posicionamento (x, y, largura, altura)
    // Desenha a linha central
    canvasCtx.fillStyle = "#D9D9D9"; //Por conta desta, tudo que colocar a partir daqui vai ter esta cor
    canvasCtx.fillRect(campo.w / 2 - this.w / 2, 0, this.w, this.h);
  },
};

// obj Raquete Esquerda
const raqueteEsquerda = {
  x: 10,
  y: 400,
  w: lineWidth,
  h: 200,
  draw: function () {
    //Desenha a raquete 1
    canvasCtx.fillRect(this.x, this.y, this.w, this.h);
  },
};

// obj Raquete Direita
const raqueteDireita = {
  x: campo.w - lineWidth - 10,
  y: 200,
  w: lineWidth,
  h: 200,
  draw: function () {
    //Desenha a raquete 2
    canvasCtx.fillRect(this.x, this.y, this.w, this.h);
  },
};

// obj Bola
const bola = {
  x: 500,
  y: 100,
  r: 20,
  velo: 5,
  _move: function () {
    this.x += this.velo;
    this.y += this.velo;
  },
  draw: function () {
    //Desenhando a bolinha
    // x, y, r, 0, 2*math.PI, false (Bem alto explicativo)
    canvasCtx.beginPath();
    canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    canvasCtx.fill();

    this._move();
  },
};

// obj Placar
const placar = {
  humano: "3",
  computador: "1",
  draw: function () {
    // Desenhando o Placar
    canvasCtx.font = "bold 72px Arial";
    canvasCtx.textAlign = "Center";
    canvasCtx.textBaseline = "Top";
    canvasCtx.fillStyle = "#01351D";
    //string, x: number, y: number
    canvasCtx.fillText(this.humano, campo.w / 4, 100);
    canvasCtx.fillText(this.computador, campo.w / 4 + campo.w / 2, 100);
  },
};

function setup() {
  // Aqui vou setar o tamanho do Canvas, tanto o El quanto o Ctx
  // Coloquei o El recebendo o Ctx para facilitar o código
  canvasEl.width = canvasCtx.width = window.innerWidth;
  canvasEl.height = canvasCtx.height = window.innerHeight;
}

// Aqui será basicamente para desenhar
function draw() {
  campo.draw();
  linha.draw();
  raqueteEsquerda.draw();
  raqueteDireita.draw();
  bola.draw();
  placar.draw();
}

// Lembrando de chamar as funcs
setup();
draw();

//Pra definir tempo/velocidade
window.setInterval(draw, 1000 / 60);
