"use strict"; //sempre começar o arquivo com essa linha

//Atenção sempre: 
// - Letras maiúsculas e minúsculas: sempre usar os "cases" corretos;
// - Abrir e fechar parênteses: um esquecimento pode gerar um erro difícil de notar;
// - Abrir e fechar chaves: mesmo caso anterior
// - Sempre veja o console no navegador apertando F12 caso algo não funcione como deveria

//Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais: preload, create e update
//As funções sempre começam com NomeDoObjeto.prototype 
var LoseState = function(game) {};

// preload: carregar todos os assets necessários para esta scene ou para as próximas
LoseState.prototype.preload = function() {
    // Não há nenhum asset a ser carregado aqui, então a função fica vazia
      this.game.load.image('lose', 'Assets/game_over.png');
    
    //Som BG
    this.game.load.audio('gameOverSongBG','Assets/ThisGameIsOver.wav');
}

// create: instanciar e inicializar todos os objetos dessa scene
LoseState.prototype.create = function() {
    this.game.add.image(game.world.centerX, game.world.centerY, 'lose').anchor.set(0.5);
    this.game.add.text(400, 300, "You Lose (home = spacebar)", {fill: "#ffffff"});
    this.HomeKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    //Som BG
    this.music = game.add.audio('gameOverSongBG');
    //Som BG - Tocando
    this.music.play();
}

// update: o que fazer a cada quadro por segundo
LoseState.prototype.update = function() {
    if(this.HomeKey.isDown){
        //Som BG - Parar som
        this.music.stop();
        this.game.state.start('home');
    }
}