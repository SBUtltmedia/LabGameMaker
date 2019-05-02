<?

//date_default_timezone_set('America/New_York');

require 'vendor/autoload.php';
$app = new \Slim\Slim();
//print_r($app);


$app->post('/save_dom_items/', function () use ($app) {
  require 'save_dom_items.php';
    $json = $app->request->getBody();
    $data = json_decode($json);
    print_r($data);
   save_dom_items($data->domItems,$data->gameName);
});

$app->run();

?>
