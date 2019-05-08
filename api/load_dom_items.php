<?
function load_dom_items($gameName){
  $userDir="../games/${_SERVER['eppn']}/$gameName/";

return file_get_contents("$userDir/game.json");


}
?>
