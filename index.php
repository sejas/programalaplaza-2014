<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

ini_set('error_reporting', E_ALL);
error_reporting(E_ALL);
function getlatestsTweets(){
    require 'tmhOAuth/tmhOAuth.php';
    $arrTweets = array();
    $tmhOAuth = new tmhOAuth(array(
  'consumer_key'    => '',
  'consumer_secret' => '',
  'user_token'      => '',
  'user_secret'     => '',
    ));

    $code = $tmhOAuth->request('GET', $tmhOAuth->url('1.1/search/tweets'), array('q' => '#18sms'));
    //$code = $tmhOAuth->request('GET', $tmhOAuth->url('1.1/statuses/user_timeline'), array( 'screen_name' => 'movistar_next'));

    if ($code == 200){
        $tweets = json_decode($tmhOAuth->response['response'], true);
    } else {
        $tweets = array('No hay Tweets para mostrar :(', 'Te quiero Ksenia!');
    }
return $tweets;
}
function getKseniaTweets() {
        $mensajes = Array('Ksu!!','TE QUIERO', 'Muchiiiiisimo','Love You', 'mucho', 'mucho', 'mucho', 'te quiero', 'te quiero',
                        'Mi Amor!', 'Mi princesa!');
        $mensajesTemp = Array();
        foreach($mensajes as $unMensaje){
                $mensajesTemp[] = Array('text'=>$unMensaje, 'id_str'=>md5($unMensaje),);
        }

        $tweets = Array('statuses'=>
      $mensajesTemp
                );

        return $tweets;
}


echo json_encode(getlatestsTweets());