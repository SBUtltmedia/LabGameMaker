
<?

//date_default_timezone_set('America/New_York');
 include 'save_dom_items.php';
 require 'load_dom_items.php';
require 'vendor/autoload.php';
$app = new \Slim\Slim();
//print_r($app);


$app->post('/save_dom_items/', function () use ($app) {

    $json = $app->request->getBody();
    $data = json_decode($json);
    print_r($data);
   save_dom_items($data->gameName,$data->gameData);
});
$app->get('/load_dom_items/:gameName', function ($gameName) use ($app) {

    print_r(load_dom_items($gameName));
});
$app->run();

?>
