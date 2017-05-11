"use strict"; //sempre começar o arquivo com essa linha

//Atenção sempre: 
// - Letras maiúsculas e minúsculas: sempre usar os "cases" corretos;
// - Abrir e fechar parênteses: um esquecimento pode gerar um erro difícil de notar;
// - Abrir e fechar chaves: mesmo caso anterior
// - Sempre veja o console no navegador apertando F12 caso algo não funcione como deveria

//Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais: preload, create e update
//As funções sempre começam com NomeDoObjeto.prototype 
var GameState = function(game) {};
var timer = 0;
var speed = 500;

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

// create: instanciar e inicializar todos os objetos dessa scene
GameState.prototype.create = function() {
    var me = this;
    // Cor de fundo - #0082bc é um tom de azul
    //this.game.stage.backgroundColor = "#0082bc";
    
    this.game.add.tileSprite(0, 0, 800, 600, 'background');
    
    //Som BG
    this.music = game.add.audio('somBG');
    //Som BG - Tocando
    this.music.play();
    
    //physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    // Inicializando jogador
    // Adicionando o sprite do jogador na posição (400, 300) usando o asset 'player'
    this.player = this.game.add.sprite(400, 300, 'player');
    this.player.animations.add('walk');
    this.player.animations.play('walk', 5, true);
    this.player.anchor.setTo(0.5, 0.5);
    
    //Add a platforms group to hold all of our tiles, and create a bunch of them
    /*https://www.joshmorony.com/how-to-create-an-infinite-climbing-game-in-phaser/
    me.enemys = me.game.add.group();
    me.enemys.enableBody = true;
    me.enemys.createMultiple(3, 'enemy1');*/
    
    this.enemies = ['enemy1', 'enemy2', 'enemy3'];
    
    this.verticalObstacles = this.game.add.group();
    this.verticalObstacles.enableBody = true;
    this.verticalObstacles.setAll('checkWorldBounds', true);
    this.verticalObstacles.setAll('outOfBoundsKill', true);
    
    // Inicializando teclas
    // Para poder utilizar uma tecla do teclado, vamos guardar uma referência a uma tecla específica em uma variável
    // Lista de teclas disponíveis: https://photonstorm.github.io/phaser-ce/Phaser.KeyCode.html
    // Na chamada abaixo guardamos uma referência à tecla esquerda do teclado na variável this.leftKey, para uso posterior na função update()
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    
 
    // Esta linha apenas imprime um número aleatório entre 1 e 10, no console do navegador (F12)
    // https://photonstorm.github.io/phaser-ce/Phaser.RandomDataGenerator.html
    console.debug(this.enemies[1]);
    
    //Parallax, OBS: falta ajustar altura da movimentação
    // https://www.joshmorony.com/how-to-create-a-parallax-background-in-phaser/
    this.background = this.game.add.tileSprite(0, 
        this.game.height - this.game.cache.getImage('background').height, 
        this.game.width , 
        this.game.cache.getImage('background').height, 
        'background'
    );
    
}

// update: o que fazer a cada quadro por segundo
GameState.prototype.update = function() {

    // Movimentação do player
    // Para detectar se uma das teclas referenciadas foi pressionada,
    // basta verificar a variável .isDown da mesma
    // Caso seja a tecla para a esquerda, ajustar uma velocidade negativa
    // ao eixo X, que fará a posição X diminuir e consequentemente o jogador
    // ir para a esquerda;
    if(this.leftKey.isDown && this.player.x>35){
        this.player.x -= 5;
    }
    // De maneira análoga, caso seja a tecla para a direita, ajustar uma velocidade positiva no eixo X, aumentando a posição X com o tempo;
    else if(this.rightKey.isDown && this.player.x<765){
        this.player.x += 5;
    }
    
    if (game.time.now > timer)
    {
         this.createEnemies();
    }
    
    
    //Parallax background
    this.background.tilePosition.y += 1;
}

GameState.prototype.createEnemies = function() {
    this.verticalObstacles.add(this.game.add.sprite(game.rnd.integerInRange(0, 2)*80 + 320, 300, this.enemies[game.rnd.integerInRange(0, 2)]));
    timer = game.time.now + speed;
}

