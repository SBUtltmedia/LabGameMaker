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
          //check out https://jsfiddle.net/c9nyewfr/
          console.log(event.target.is)
          var viewWidth = parseInt($("#view").css("width"))
          var viewHeight = parseInt($("#view").css("height"))
          var itemWidth = parseInt($(`#${event.target.id}`).css("width"))
          var itemHeight = parseInt($(`#${event.target.id}`).css("height"))


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
          // The reason why it is shifting its position to top right a little bit is because it is moving between the div cabinet and stage.
          // Because its css is dependant on the percentage of its carrier, its sizes changes, and the position also changes because its position bases off the position of the carrier div.
          // We have to calculate the chages between them if we do not want them to shift, if not make the div sizes and locations equal to each other.

          // stage css top:0 , left: 10, width & height: 80%
          // cabinet css top:5 , left: 0, width & height: 100%



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
      var newLeft = parseInt($(`#${this.id}`).css("left")) / parseInt($("#view").css("width")) * 100 //css has px on values which make division annoying, need to remove non-digits
      var newTop = parseInt($(`#${this.id}`).css("top")) / parseInt($("#view").css("height")) * 100
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
  let payLoad={gameName:"testGame",domItems:newDomItems}
  $.post('api/index.php/save_dom_items',JSON.stringify(payLoad),function(response){

console.log(response)

}, "json");
    overlay.message("All your items have been saved. \n Please start creating each step.", "OK")
  })

})
