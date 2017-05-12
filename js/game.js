"use strict"; //sempre começar o arquivo com essa linha

//Atenção sempre: 
// - Letras maiúsculas e minúsculas: sempre usar os "cases" corretos;
// - Abrir e fechar parênteses: um esquecimento pode gerar um erro difícil de notar;
// - Abrir e fechar chaves: mesmo caso anterior
// - Sempre veja o console no navegador apertando F12 caso algo não funcione como deveria

//Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais: preload, create e update
//As funções sempre começam com NomeDoObjeto.prototype 
var GameState = function(game) {};

// preload: carregar todos os assets necessários para esta scene ou para as próximas
GameState.prototype.preload = function() {
    // Para carregar um sprite, basta dar um nome ao mesmo e dizer qual é o arquivo
    this.game.load.spritesheet('player', 'Assets/jonny.png', 73, 100, 2);
    this.game.load.image('enemy1', 'Assets/1.png');
    this.game.load.image('enemy2', 'Assets/2.png');
    this.game.load.image('enemy3', 'Assets/3.png');
    
    //Som BG
    this.game.load.audio('somBG','Assets/bgSound.ogg');
    
    //Chão
    this.game.load.image('background', 'Assets/chao (2).png');
}

var tilesprite;


// create: instanciar e inicializar todos os objetos dessa scene
GameState.prototype.create = function() {
    //this.game.add.tileSprite(0, 0, 800, 600, 'background');
    //Parallax, OBS: falta ajustar altura da movimentação
    // https://www.joshmorony.com/how-to-create-a-parallax-background-in-phaser/
    this.background = this.game.add.tileSprite(0, 
        0, 
        this.game.width , 
        this.game.height, 
        'background'
    );
    
    //Som BG
    this.music = game.add.audio('somBG');
    //Som BG - Tocando
    this.music.play();
    
    
    //physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    // Inicializando jogador
    this.createPlayer();
    
    this.createEnemies();
     //Create the inital on screen platforms
    this.initEnemies();
    
    //Create the score label
    this.createScore();

    //Add a platform every 2 seconds
    this.timer = this.game.time.events.loop(500, this.addEnemies, this);
    
    // Inicializando teclas
    // Para poder utilizar uma tecla do teclado, vamos guardar uma referência a uma tecla específica em uma variável
    // Lista de teclas disponíveis: https://photonstorm.github.io/phaser-ce/Phaser.KeyCode.html
    // Na chamada abaixo guardamos uma referência à tecla esquerda do teclado na variável this.leftKey, para uso posterior na função update()
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    /*this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);*/
}

GameState.prototype.createPlayer = function(){
    // Adicionando o sprite do jogador na posição (400, 300) usando o asset 'player'
    this.player = this.game.add.sprite(350, 320, 'player');
    this.player.animations.add('walk');
    this.player.animations.play('walk', 5, true);
    this.player.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this.player);
    this.player.body.setCircle(28);
    this.player.body.fixedRotation = true;

    //this.player.body.gravity.y = 0;
    this.player.body.collideWorldBounds = true;

}

// update: o que fazer a cada quadro por segundo
GameState.prototype.update = function() {
    
    //Make the sprite collide with the ground layer
    this.game.physics.arcade.collide(this.player, this.verticalObstacles);
    console.debug("Colidiu: " + this.player.body.checkCollision);
    // Movimentação do player
    // Para detectar se uma das teclas referenciadas foi pressionada,
    // basta verificar a variável .isDown da mesma
    // Caso seja a tecla para a esquerda, ajustar uma velocidade negativa
    // ao eixo X, que fará a posição X diminuir e consequentemente o jogador
    // ir para a esquerda;
    if(this.leftKey.isDown && this.player.x > 280){
        this.player.x -= 5;
        this.player.body.velocity.x = -10;
    }
    // De maneira análoga, caso seja a tecla para a direita, ajustar uma velocidade positiva no eixo X, aumentando a posição X com o tempo;
    else if(this.rightKey.isDown && this.player.x < 500){
        this.player.x += 5;
        this.player.body.velocity.x = 10;
    } /*else if(this.upKey.isDown && this.player.y<this.game.world.height - 100){
        this.player.y -= 5;
        this.player.body.velocity.y = -10;
    } else if(this.downKey.isDown && this.player.y > 100 ){
        this.player.y += 5;
        this.player.body.velocity.y = 10;
    }*/
    
    //Parallax background
    this.background.tilePosition.y += 1;
    
    //Check if the player is touching the bottom
    if(this.player.y >= this.game.world.height - 50){
        this.gameOver();
    }
}

GameState.prototype.createEnemies = function() {
    //this.verticalObstacles.add(this.game.add.sprite(game.rnd.integerInRange(0, 2)*80 + 320, 300, this.enemies[game.rnd.integerInRange(0, 2)]));
    //timer = game.time.now + speed;
    
    var me = this;

    //The spacing for the initial platforms
    me.spacing = 220;

    //Set the initial score
    me.score = 0;

    //Get the dimensions of the tile we are using
    me.tileWidth = 70;
    me.tileHeight = 100;

    //Add a platforms group to hold all of our tiles, and create a bunch of them
    this.verticalObstacles = this.game.add.group();
    this.verticalObstacles.enableBody = true;
    this.verticalObstacles1 = this.game.add.group();
    this.verticalObstacles.enableBody = true;
    this.verticalObstacles1.createMultiple(100, 'enemy1');
    this.verticalObstacles2 = this.game.add.group();
    this.verticalObstacles.enableBody = true;
    this.verticalObstacles2.createMultiple(100, 'enemy2');
    this.verticalObstacles.enableBody = true;
    this.verticalObstacles3 = this.game.add.group();
    this.verticalObstacles3.createMultiple(100, 'enemy3');
    this.verticalObstacles.addMultiple(this.verticalObstacles1);
    this.verticalObstacles.addMultiple(this.verticalObstacles2);
    this.verticalObstacles.addMultiple(this.verticalObstacles3);
    this.verticalObstacles.setAll('checkWorldBounds', true);
    this.verticalObstacles.setAll('outOfBoundsKill', true);
  
   
}

GameState.prototype.initEnemies = function() {

    var me = this,
    bottom = me.game.world.height - me.tileHeight,
    top = me.tileHeight;

    //Keep creating platforms until they reach (near) the top of the screen
    for(var y = bottom; y > top - me.tileHeight; y = y - me.spacing){
        me.addEnemies(y);
    }

}

GameState.prototype.createScore = function(){

    var me = this;

    var scoreFont = "100px Arial";

    me.scoreLabel = me.game.add.text((me.game.world.centerX), 100, "0", {font: scoreFont, fill: "#fff"}); 
    me.scoreLabel.anchor.setTo(0.5, 0.5);
    me.scoreLabel.align = 'center';

}

GameState.prototype.gameOver = function() {
    this.game.state.start('lose');
    //Som BG - Parar som ao perder
    this.music.stop();
    }

GameState.prototype.addEnemy = function(x, y) {
    var me = this;
    //Get a tile that is not currently on screen
    var tile = me.verticalObstacles.getAt( me.game.rnd.integerInRange(0, 300));

    //Reset it to the specified coordinates
    if(isNaN(tile))
    {
        tile.reset(x, y);
        tile.body.velocity.y = 150; 
        tile.body.immovable = true;
        //When the tile leaves the screen, kill it
        tile.checkWorldBounds = true;
        tile.outOfBoundsKill = true;	
    }
}

GameState.prototype.addEnemies = function(y) {    
    var me = this;
    //Work out how many tiles we need to fit across the whole screen
    var tilesNeeded = 2;
    
    if(typeof(y) == "undefined")
    {
        y = -me.tileHeight;
        //Increase the players score
        me.incrementScore();
    }

    //Add a hole randomly somewhere
    var hole = me.game.rnd.integerInRange(0, tilesNeeded);

    //Keep creating tiles next to each other until we have an entire row
    //Don't add tiles where the random hole is
    for (var i = 0; i <= tilesNeeded; i++){
        if (i != hole){
            this.addEnemy(i * me.tileWidth + 320, y); 
        } 	    	
    }
}

GameState.prototype.incrementScore = function(){
    var me = this;
    me.score += 1;   
    me.scoreLabel.text = me.score; 		

}