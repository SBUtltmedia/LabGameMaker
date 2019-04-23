$(function() {
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
    }

    $(`#cabinet *`).draggable({
      revertDuration: 0,
      revert: true,
      disabled: false,
      stop: function(event, ui) {
        var newItem = {}
        newItem.parent = "#view"
        newItem.classes = event.target.className //Need to find way to get classes
        newItem.resources = "" //Need to find way to check svg/forms/whatever
        console.log(event, ui)
        newItem.itemId = event.target.id + Date.now()
        console.log(ui.position.top)
        newItem.css = {
          left: `${ui.position.left}px`,
          top: `${ui.position.top}px`,
          position: "absolute"
        }
        console.log(newItem)
        item.buildItem(newItem)
      }
    })
  })

})
