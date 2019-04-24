$(function() {

  $( document ).on( "DOMNodeInserted", function( e ) {
  	var classes=$(e.target).attr("class");
  if(classes && classes.match(/^hl_/)){
  $(e.target).addClass("commented-selection")


  }
  	  // the new element
  });




  var item = new Item()
  var overlay = new Overlay()
  resizeWindow()
  overlay.message("Welcome to the TLL Lab Game Builder. \n Your build environment is assembling.")
  $("#stage").droppable({
    drop: function(event, ui) {

    }
  })
  $.get("json/equipment.json", function(items) {

    for (i of items) {
      i.parent = "#cabinet"
      console.log(i)
      item.buildItem(i)
      item.addItemToList(i)
    }
  }).then(function() {
    console.log("HELLO")
    setTimeout(function() {
      $(`#cabinet *`).on("click", function(event){
        console.log(event.target.id)
      })
      $(`#cabinet >div`).draggable({
        // revertDuration: 0,
        // revert: true,
        disabled: false,
        helper: "clone",
        stop: function(event, ui) {

          newItem = item.itemList[event.target.id]
          newItem.itemId = event.target.id + Date.now()
          newItem.css = {
            left: `${ui.position.left}px`,
            top: `${ui.position.top}px`,
            position: "absolute"
          }
          newItem.parent = "#view"
          console.log(newItem)
          item.buildItem(newItem)
          // $(`#${newItem.id}`).draggable({
          //   revert:false,
          //   disabled: true
          // })
        }
      })
    }, 1000)

  })

})
