//cria as variaveis do jogo
var trex,solo,soloinvisivel,nuvem,cacto,escolherCacto,tempoJogo,
trexMorre,fimDeJogo,reiniciar

var grupoDeCacto,grupoDeNuvem

var trexCorrendo,imagemSolo,imagemnuvem,imagemreiniciar,imagemFim
var imagemCacto1,imagemCacto2,imagemCacto3,imagemCacto4,imagemCacto5,imagemCacto6;

var somSalto,somMorte,somCheckPoint


const jogar = 1
const fim = 0
var estadoJogo = jogar

//carega as imagem e animasoes
function preload(){
  
  
  
trexCorrendo = loadAnimation("trex1.png","trex2.png","trex3.png")
           imagemSolo = loadImage("ground2.png")  
  trexMorre = loadAnimation ("trex_collided.png")
  
  imagemFim = loadImage("gameOver.png")
  

  imagemreiniciar = loadImage("restart.png")
  
  
  imagemnuvem = loadImage("cloud.png")
  
  iagemCacto1 = loadImage("obstacle1.png")
  iagemCacto2 = loadImage("obstacle2.png")
  iagemCacto3 = loadImage("obstacle3.png")
  iagemCacto4 = loadImage("obstacle4.png")
  iagemCacto5 = loadImage("obstacle5.png")
  iagemCacto6 = loadImage("obstacle6.png")
  
  somSalto=loadSound("jump.mp3")
  somMorte=loadSound("die.mp3")
  somCheckPoint=loadSound("checkPoint.mp3")
}
function setup() {
 createCanvas(windowWidth,windowHeight)
  //cria o trex-coloca a animasao-diminui o tamanho 
  trex=createSprite(50,height-100,20,40)
  trex.addAnimation("correndo",trexCorrendo)
  trex.addAnimation("morre",trexMorre)
  trex.scale=0.5
  
  //cria o solo e define a posisao em X
  solo = createSprite(200,height-20,400,10)
  solo.addImage("solo",imagemSolo)
  solo.x = solo.width / 2
  
  //cria o solo invisivel - decha o chao invisivel
  soloinvisivel = createSprite(200,height-10,400,10)
  soloinvisivel.visible = false
  
  fimDeJogo = createSprite (width/2, height /2,40,40)
  fimDeJogo.addAnimation("gameOver",imagemFim)
  fimDeJogo.scale = 0.5
  
  
  reiniciar = createSprite (width/2, height /2 + 30,40,40)
  reiniciar.addAnimation("reiniciar",imagemreiniciar)
  reiniciar.scale =0.5
   tempoJogo = 0
 // trex.debug=true
  
  grupoDeNuvem = new Group()
   grupoDeCacto = new Group()
}

function draw() {
  background(180)
  text("Tempo:  "+ tempoJogo,500,30)
 
  if(estadoJogo == jogar){
    reiniciar.visible = false
    fimDeJogo.visible = false
     tempoJogo = tempoJogo + Math.round(frameCount / 60)
    
    if(tempoJogo>0 && tempoJogo%500==0){
      somCheckPoint.play();
    }
      
      
    
     solo.velocityX = -(5+tempoJogo/100)
    if(solo.x<0){
    solo.x = solo.width / 2
  }  
     trex.velocityY = trex.velocityY +0.5
    trex.setCollider("circle",0,0,40)      
    trex.debug = false
    
    gerarNuvens()
  gerarCacto()
    
    if  (  ( touches.length > 0 || keyDown("space")  )  && trex.y>height-40){
    trex.velocityY = -9
      somSalto.play();
      touches = []
  }
    if(grupoDeCacto.isTouching(trex)){
       estadoJogo = fim
   somMorte.play();
      
    }
    
     
    
    
    
  }else if(estadoJogo == fim){
    reiniciar.visible = true
    fimDeJogo.visible = true
    
     solo.velocityX = -0
     grupoDeNuvem.setVelocityXEach(0)
       grupoDeCacto.setVelocityXEach(0)
    
    grupoDeCacto.setLifetimeEach(-1)
    grupoDeNuvem.setLifetimeEach(-1)
    
    trex.changeAnimation("morre", trexMorre)
    trex.velocityY = 0
    
    
    
  }
  

  
  
  
 
  trex.collide(soloinvisivel)
  if(  touches.length > 0 ||  mousePressedOver(reiniciar)){
    restart()
    touches =[]
  }
  
 
 
 drawSprites();
  
  //trex colidir com o solo
  
}

function restart(){
  estadoJogo = jogar
   reiniciar.visible = false
    fimDeJogo.visible = false
   grupoDeCacto.destroyEach();
 grupoDeNuvem.destroyEach();
 trex.changeAnimation("correndo",trexCorrendo)
  tempoJogo = 0
  
  
}


function gerarCacto(){ 
    if(frameCount% 100 == 0){
       
        cacto = createSprite (width,height-35,10,40)
        cacto.velocityX = -(5+tempoJogo/100)
      
      var escolherCacto
      
      escolherCacto = Math.round(random(1,6))
      
    switch (escolherCacto){
        
        case 1: cacto.addImage("Imagem cacto",iagemCacto1)
            cacto.scale =0.7
      break; 
      
        case 2: cacto.addImage("Imagem cacto",iagemCacto2)
            cacto.scale = 0.7
      break; 
      
       case 3: cacto.addImage("Imagem cacto",iagemCacto3)
            cacto.scale = 0.7
      break; 
      
      case 4: cacto.addImage("Imagem cacto",iagemCacto4)
            cacto.scale = 0.6
      break;
      
       case 5: cacto.addImage("Imagem cacto",iagemCacto5)
            cacto.scale = 0.5
      break;
      
       case 6: cacto.addImage("Imagem cacto",iagemCacto6)
            cacto.scale = 0.5
      break;
      default :dreak
        
   
    } 
      cacto.lifetime = 350
     grupoDeCacto .add (cacto)
       }

}
                                                    
function gerarNuvens(){
  
  if(frameCount% 60 == 0 ){
       nuvem = createSprite(width,100,50,10)         
       nuvem.addImage("nuvem",imagemnuvem)
       nuvem.velocityX = -2 
       nuvem.y = Math.round(random(80,40))
       nuvem.depth = trex.depth
       trex.depth = trex.depth  +1
       nuvem.scale = 0.6
    nuvem.lifetime = width
    grupoDeNuvem.add(nuvem)
  }
  
}               