<?
function save_dom_items($gameName,$json){
  $userDir="../games/${_SERVER['eppn']}/$gameName/";
if(!file_exists($userDir))
{
mkdir(  $userDir, 0777, true);
}
file_put_contents("$userDir/game.json",json_encode($json));


}
?>
