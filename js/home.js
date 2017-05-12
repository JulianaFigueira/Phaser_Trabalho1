"use strict"; //sempre começar o arquivo com essa linha

//Atenção sempre: 
// - Letras maiúsculas e minúsculas: sempre usar os "cases" corretos;
// - Abrir e fechar parênteses: um esquecimento pode gerar um erro difícil de notar;
// - Abrir e fechar chaves: mesmo caso anterior
// - Sempre veja o console no navegador apertando F12 caso algo não funcione como deveria

//Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais: preload, create e update
//As funções sempre começam com NomeDoObjeto.prototype 
var HomeState = function(game) {};
var button;

// preload: carregar todos os assets necessários para esta scene ou para as próximas
HomeState.prototype.preload = function() {
    // Não há nenhum asset a ser carregado aqui, então a função fica vazia
      this.game.load.image('play', 'Assets/play.png');
    this.game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);
   
}

// create: instanciar e inicializar todos os objetos dessa scene
HomeState.prototype.create = function() {
    game.add.image(game.world.centerX, game.world.centerY, 'play').anchor.set(0.5);
    this.PlayKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.button = game.add.button(game.world.centerX - 70, 450, 'button', actionOnClick, this, 0,0,0 );
    this.button.width = 155;
    this.button.height = 40;
     //this.button.anchor.setTo(0.5, 0.5);
    this.button = new LabelButton(this.game, 480, 512, "button", "Start game!", this.doBtnStartHandler, this, 0, 0, 0); // button frames 1=over, 0=off, 2=down

}

// update: o que fazer a cada quadro por segundo
HomeState.prototype.update = function() {
    if(this.PlayKey.isDown)
        this.game.state.start('game');
}

function actionOnClick () {

    this.game.state.start('game');

}