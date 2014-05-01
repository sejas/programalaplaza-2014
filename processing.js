/*
* Author: Antonio Sejas
* URL: http://antonio.sejas.es
* License: MIT
* Date: 2014.04.28
*
* Description: Get realtime tweets and they are showed in an artistic way. 
*
*/ 
int[][] colores = [[208,60,15], [26,140,150], [106,12,232], [73,98,255], [255,255,255], [255,255,255], [190, 188, 55], [232, 104, 0], [133, 227, 195], [237, 230, 84], [147, 114, 232], [232, 12, 130]];

int numBalls = 18;

float spring = 0.05;

float gravity = 0.03;
String[] tweetsTextos = [];
Ball[] balls = new Ball[numBalls];
int bolasi, timeout, vueltas = 0;
String ultimo_id, ultimo_idAux = "";

void recuperarTweets() {
  vueltas ++;
  //la variable getTime es para que no caché la consulta
  var query = 'http://antonio.sejas.es/proyectos/twitter/plaza/?vuelta='+(new Date()).getTime();
  $.getJSON( query,
  
    function(data) {
      tweets = data.statuses;
      tweetsTextos = new Array();
      for (unTweetI in tweets) {
        var unTweet= tweets[unTweetI];
        tweetsTextos.push(unTweet.text.replace(" #18sms","").replace("#18sms",""));
        ultimo_idAux = unTweet.id_str;
      }
      if (ultimo_id != ultimo_idAux || vueltas >= 4 ){
        //Si hay nuevos tetts actualizamos, con un máximo de 18 tweets
        numBalls = (tweets.length > 18)?18:tweets.length;
        setupBolas();
        ultimo_id = ultimo_idAux;
        vueltas = 0;
      } 
  });
}


void setupBolas(){
  for (bolasi = 0; bolasi < numBalls; bolasi++) {

    balls[bolasi] = new Ball(random(width), random(height), random(20, 40), bolasi, balls);

  }
}

void setup() 

{

 size (192,157);
 background(0);
  noStroke();

  smooth();
  
  recuperarTweets();

  setupBolas();
  


}



void draw() 

{

  background(0);
  frameRate(30);

  for (int i = 0; i < numBalls; i++) {

    balls[i].collide();

    balls[i].move();

    balls[i].display();  

  }
    var f = createFont("Arial",13,true);
    textFont(f);
    text("#18sms",73,13);
    var f = createFont("Arial",13,true);
    textFont(f);
    text("Tuits con hashtag",45,30);

    if (timeout % 300 == 0) {
     recuperarTweets();
     timeout = 0; 
    }
    timeout++;
}



class Ball {

  float x, y;
  float diameter;
  float vx = 0;
  float vy = 0;
  int id;
  string texto = "te quiero Ksenia";
  int[] micolor = [255,255,255];
  
  Ball[] others;
  Ball(float xin, float yin, float din, int idin, Ball[] oin) {

    x = xin;

    y = yin;

    diameter = din;

    id = idin;

    others = oin;

    //micolor = colores[(int)random(0,colores.length)];
    micolor = colores[idin % colores.length];

  } 

  

  void collide() {

    for (int i = id + 1; i < numBalls; i++) {

      float dx = others[i].x - x;

      float dy = others[i].y - y;

      float distance = sqrt(dx*dx + dy*dy);

      float minDist = others[i].diameter/2 + diameter/2;

      if (distance < minDist) { 

        float angle = atan2(dy, dx);

        float targetX = x + cos(angle) * minDist;

        float targetY = y + sin(angle) * minDist;

        float ax = (targetX - others[i].x) * spring;

        float ay = (targetY - others[i].y) * spring;

        vx -= ax;

        vy -= ay;

        others[i].vx += ax;

        others[i].vy += ay;

      }

    }   

  }

  

  void move() {

    vy += gravity;

    x += vx;

    y += vy;

    if (x + diameter/2 > width) {

      x = width - diameter/2;

      vx += -0.9; 

    }

    else if (x - diameter/2 < 0) {

      x = diameter/2;

      vx *= -0.9;

    }

    if (y + diameter/2 > height) {

      y = height - diameter/2;

      vy *= -0.9; 

    } 

    else if (y - diameter/2 < 0) {

      y = diameter/2;

      vy *= -0.9;

    }

  }

  

  void display() {

    fill(micolor[0],micolor[1],micolor[2]);

    //text(texto,x+1-((diameter)/2),y+4);
    if(tweetsTextos.length > id ){
      var f = createFont("Arial",(diameter/3 - tweetsTextos[id].length/30),true);
      textFont(f);
      text(tweetsTextos[id],x+1-((diameter)/2),y+4);
    }
    

  }
  
  

}