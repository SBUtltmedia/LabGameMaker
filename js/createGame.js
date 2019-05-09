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

  $.get("json/equipment.json", function(items) {


    let recursiveBuild = (currentItem, itemIndex) => {
      currentItem.parent = "#cabinet"
      item.buildItem(currentItem).then(

        () => {
          $(`#${currentItem.itemId}`).addClass("referenceItem")
          item.addItemToList(currentItem)
          let nextItem = items[itemIndex++]

          if (nextItem) {
            recursiveBuild(nextItem, itemIndex)
          } else {
            addDrags()

          }

        })
    }
    recursiveBuild(items[0], 0)


  })

  function addDrags() {

    $("#cabinet > div").draggable({
      //  use a helper-clone that is append to 'body' so is not 'contained' by a pane
      revert: 'invalid',
      helper: function() {
        return $(this).clone().appendTo('#cabinet').css({
          'zIndex': 5
        });
      },
      cursor: 'move',
      containment: "document"
    });

    $('#view').droppable({
      activeClass: 'ui-state-hover',
      accept: '.ui-draggable',
      drop: function(event, ui) {
        var position = $(this).position()

        if (!ui.draggable.hasClass("dropped"))

          var clone = $(ui.draggable).clone().addClass("dropped").draggable({
            revert: 'invalid'
          });
        if (clone) {
          var origId = clone.attr('id')
          clone.removeAttr('id')
          clone.css({
            'left': (ui.position.left - position.left),
            'top': (ui.position.top - position.top),
            // 'left': (ui.position.left - position.left) / $("#view").width() * 100 + "%",
            // 'top': (ui.position.top - position.top) / $("#view").height() * 100 + "%",
            position: "absolute",
          }).attr({
            id: `${origId}_${Date.now()}`
          })
          $(this).append(clone);
        }
      }
    });

    $('#trashForUnuse').droppable({
      activeClass: 'ui-state-hover',
      accept: '.ui-draggable',
      drop: function(event, ui) {
        var position = $(this).position()

        if (ui.draggable.hasClass("dropped")) {
          $(ui.draggable).remove();
        }
      }
    });




  }

  function viewPxToPercent(postion) {

    var left = parseInt(position.x) / parseInt($("#view").css("width")) * 100

  }


  $("#saveButton").on("click", function(evt) {
    var domItems = []
    $("#view >div").each(function() {

      // var itemNumber = this.id.split(/[^\d]+/)[1]
      //
      // var newLeft = parseInt($(this).css("left")) / $("#view").width() * 100
      // var newTop = parseInt($(this).css("top")) / $("#view").height() * 100

      domItems.push({
        id: this.id,
        css: {
          left: this.style.left,
          top: this.style.top,
        },
      })
    })

    steps: {}
    let payload = {
      gameName: "testGame",
      gameData: {
        domItems,
        steps
      }
    }

    $.post('api/index.php/save_dom_items', JSON.stringify(payload), function(response) {



    }, "json");
    overlay.message("All your items have been saved. \n Please start creating each step.", "OK")
  })
  $("#loadButton").on("click", function(evt) {
    $("#view").html("")
    $.get('api/index.php/load_dom_items/testGame', function(data) {

      game = JSON.parse(data);


      for (i of game.domItems) {
        itemName = i.id
        referenceItem = item.itemList[itemName.split("_")[0]]
        referenceItem.classes += " item"
        toBuild = Object.assign(referenceItem, {
          parent: "#view",
          itemId: itemName,
          css: i.css
        })
        item.buildItem(toBuild)
      }
    })
    overlay.message("All your items have been loaded.", "OK")
  })





})
