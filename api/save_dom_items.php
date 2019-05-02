<?
function save_dom_items($json,$game){
  $userDir="../games/${_SERVER['eppn']}/$game/";
if(!file_exists($userDir))
{
mkdir(  $userDir, 0777, true);
}
file_put_contents("$userDir/domItems.json",json_encode($json));


}
