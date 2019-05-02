$(function() {

  $(document).on("DOMNodeInserted", function(e) {
    var classes = $(e.target).attr("class");
    if (classes && classes.match(/^hl_/)) {
      $(e.target).addClass("commented-selection")


    }
    // the new element
  });




  var item = new Item()
  var overlay = new Overlay()
  resizeWindow()
  overlay.message("Welcome to the TLL Lab Game Builder. \n Please select all items needed for the lab.")
  $("#stage").droppable({
    addClasses: false,
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
      $(`#cabinet *`).on("click", function(event) {
        console.log(event.target.id)
      })
      $(`#cabinet >div`).draggable({
        disabled: false,
        helper: "clone",
        stop: function(event, ui) {
          console.log(event.target.is)
          var viewWidth = $("#view").css("width").replace(/[^-\d\.]/g, '')
          var viewHeight = $("#view").css("height").replace(/[^-\d\.]/g, '')
          var itemWidth = $(`#${event.target.id}`).css("width").replace(/[^-\d\.]/g, '')
          var itemHeight = $(`#${event.target.id}`).css("height").replace(/[^-\d\.]/g, '')
          console.log(ui)
          if (ui.position.left < 0) {
            ui.position.left = 0
          } else if (ui.position.left / viewWidth > 0.95) {
            ui.position.left = viewWidth*0.95
          }
          if (ui.position.top < 0) {
            ui.position.top = 0
          } else if (ui.position.top / viewHeight > 0.95) {
            ui.position.top = viewHeight*0.95
          }
          newItem = item.itemList[event.target.id]
          newItem.itemId = event.target.id + Date.now()
          newItem.css = {
            left: `${ui.position.left}px`,
            top: `${ui.position.top}px`,
            position: "absolute"
          }
          newItem.parent = "#view"
          console.log(newItem)
          item.buildItem(newItem).then(() => {
            console.log(newItem.itemId)
            $(`#${newItem.itemId}`).draggable({
              revert: false,
              disabled: false,
              stop: function(event, ui) {
                console.log(ui)
                if (ui.position.left < 0) {
                  $(`#${event.target.id}`).css("left", "10px")
                } else if (ui.position.left / viewWidth >0.95) {
                  $(`#${event.target.id}`).css("left", `${viewWidth*0.95}px`)
                }
                if (ui.position.top < 0) {
                  $(`#${event.target.id}`).css("top", "10px")
                } else if (ui.position.top / viewHeight > 0.95) {
                  $(`#${event.target.id}`).css("top", `${viewHeight*0.95}px`)
                }
              }
            })
          })
        }
      })
    }, 1000)

  })
  $("#saveButton").on("click", function(evt) {
    var newDomItems = {}
    $("#view >div").each(function() {
      var referenceItem = this.id.split(/\d/)[0]
      var newLeft = ($(`#${this.id}`).css("left").replace(/[^-\d\.]/g, '')) / ($("#view").css("width").replace(/[^-\d\.]/g, '')) * 100 //css has px on values which make division annoying, need to remove non-digits
      var newTop = ($(`#${this.id}`).css("top").replace(/[^-\d\.]/g, '')) / ($("#view").css("height").replace(/[^-\d\.]/g, '')) * 100
      newDomItems[this.id] = {
        css: {
          left: `${newLeft}%`,
          top: `${newTop}%`,
        },
        classes: item.itemList[referenceItem].classes,
        resources: item.itemList[referenceItem].resources
      }
    })
    console.log(newDomItems)
    overlay.message("All your items have been saved. \n Please start creating each step.", "OK")
  })

})
