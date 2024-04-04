// Const para pegar o canvas element do DOM(querySelector pq vou usar a tag e não ID) e setar canvas context() que neste caso será o "2d"
const canvasEl = document.querySelector("canvas"),
  canvasCtx = canvasEl.getContext("2d");

const lineWidth = 15;

// obj Campo
const field = {
  //Aqui temos duas propriedades e um método que fizemos para criar o Obj field
  w: window.innerWidth,
  h: window.innerHeight,
  draw: function () {
    // Primeiro definimos cor e depois dimensão
    //Depois vai o posicionamento (x, y, largura, altura)
    // Desenha o field
    canvasCtx.fillStyle = "#286047";
    canvasCtx.fillRect(0, 0, this.w, this.h);
  },
};

// obj line
const line = {
  w: lineWidth,
  h: field.h,
  draw: function () {
    // Primeiro definimos cor e depois dimensão
    //Depois vai o posicionamento (x, y, largura, altura)
    // Desenha a line central
    canvasCtx.fillStyle = "#D9D9D9"; //Por conta desta, tudo que colocar a partir daqui vai ter esta cor
    canvasCtx.fillRect(field.w / 2 - this.w / 2, 0, this.w, this.h);
  },
};

// obj Raquete Esquerda
const leftPaddle = {
  x: 10,
  y: 0,
  w: lineWidth,
  h: 200,
  _move: function () {
    this.y = mouse.y - this.h / 2;
  },
  draw: function () {
    //Desenha a raquete 1
    canvasCtx.fillRect(this.x, this.y, this.w, this.h);

    this._move();
  },
};

// obj Raquete Direita
const rightPaddle = {
  x: field.w - lineWidth - 10,
  y: 200,
  w: lineWidth,
  h: 200,
  _move: function () {
    this.y = ball.y;
  },
  draw: function () {
    //Desenha a raquete 2
    canvasCtx.fillRect(this.x, this.y, this.w, this.h);

    this._move();
  },
};

// obj Bola
const ball = {
  x: 0,
  y: 0,
  r: 20,
  speed: 5,
  directionY: 1,
  directionX: 1,
  _calcPosition: function () {
    // Verifica as laterais y do field
    if (
      (this.y - this.r < 0 && this.directionY < 0) ||
      (this.y > field.h - this.r && this.directionY > 0)
    ) {
      // rebate a bola
      this._reverseY();
    }

    // Verifica se x é maior que a tela, ou seja, fez ponto ?
    if (this.x > field.w - this.r - rightPaddle.w - 10) {
      //Verifica se a raquete rebate ou não
      if (
        this.y + this.r > rightPaddle.y &&
        this.y - this.r < rightPaddle.y + rightPaddle.h
      ) {
        // rebate
        this._reverseX();
      } else {
        // Pontua player 1
        score.increaseHuman();
        this._pointUp();
      }
    }
  },
  _reverseY: function () {
    // 1 x -1 = -1   math básica né pae
    // -1 x -1 = 1
    this.directionY = this.directionY * -1;
  },
  _reverseX: function () {
    // 1 x -1 = -1   math básica né pae
    // -1 x -1 = 1
    this.directionX = this.directionX * -1;
  },
  _pointUp: function () {
    this.x = field.w / 2;
    this.y = field.h / 2;
  },
  _move: function () {
    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;
  },
  draw: function () {
    //Desenhando a bolinha
    // x, y, r, 0, 2*math.PI, false (Bem alto explicativo)
    canvasCtx.beginPath();
    canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    canvasCtx.fill();

    this._calcPosition();
    this._move();
  },
};

// obj Placar
const score = {
  human: 0,
  bot: 0,
  increaseHuman: function () {
    this.human++;
  },
  increaseBot: function () {
    this.bot++;
  },
  draw: function () {
    // Desenhando o Placar
    canvasCtx.font = "bold 72px Arial";
    canvasCtx.textAlign = "Center";
    canvasCtx.textBaseline = "Top";
    canvasCtx.fillStyle = "#01351D";
    //string, x: number, y: number
    canvasCtx.fillText(this.human, field.w / 4, 100);
    canvasCtx.fillText(this.bot, field.w / 4 + field.w / 2, 100);
  },
};

//obj mouse
const mouse = { x: 0, y: 0 };

function setup() {
  // Aqui vou setar o tamanho do Canvas, tanto o El quanto o Ctx
  // Coloquei o El recebendo o Ctx para facilitar o código
  canvasEl.width = canvasCtx.width = window.innerWidth;
  canvasEl.height = canvasCtx.height = window.innerHeight;
}

// Aqui será basicamente para desenhar
function draw() {
  field.draw();
  line.draw();
  leftPaddle.draw();
  rightPaddle.draw();
  ball.draw();
  score.draw();
}

//Para melhorar as animações
window.animateFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    }
  );
})();

function main() {
  animateFrame(main);
  draw();
}

setup();
main();

// Isso aqui serve basicamente para a raquete seguir o mouse
canvasEl.addEventListener("mousemove", function (e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
});
