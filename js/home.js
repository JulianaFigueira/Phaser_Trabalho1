"use strict"; //sempre começar o arquivo com essa linha

//Atenção sempre: 
// - Letras maiúsculas e minúsculas: sempre usar os "cases" corretos;
// - Abrir e fechar parênteses: um esquecimento pode gerar um erro difícil de notar;
// - Abrir e fechar chaves: mesmo caso anterior
// - Sempre veja o console no navegador apertando F12 caso algo não funcione como deveria

//Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais: preload, create e update
//As funções sempre começam com NomeDoObjeto.prototype 
var HomeState = function(game) {};

// preload: carregar todos os assets necessários para esta scene ou para as próximas
HomeState.prototype.preload = function() {
    // Não há nenhum asset a ser carregado aqui, então a função fica vazia
      this.game.load.image('play', 'Assets/play.png');
   
}

// create: instanciar e inicializar todos os objetos dessa scene
HomeState.prototype.create = function() {
    game.add.image(game.world.centerX, game.world.centerY, 'play').anchor.set(0.5);
    this.game.add.text(160, 360, "home + credits page (play = spacebar)", {fill: "#ffffff"});
    this.PlayKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  
}

// update: o que fazer a cada quadro por segundo
HomeState.prototype.update = function() {
    if(this.PlayKey.isDown)
        this.game.state.start('game');
}