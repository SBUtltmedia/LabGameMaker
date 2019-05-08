$(function() {


  var item = new Item()
  var overlay = new Overlay()
  resizeWindow()
  overlay.message("Welcome to the TLL Lab Game Builder. \n Please select all items needed for the lab.")
  $("#view").droppable({
    activeClass: 'ui-state-hover',
    drop: function(event, ui) {
            if (!ui.draggable.hasClass("dropped"))

                var clone=jQuery(ui.draggable).clone().addClass("dropped").draggable();
                if(clone){
             clone.css({'left':ui.position.left,'top':ui.position.top,position:"absolute"});

                jQuery(this).append(clone);
            }
            }
  })
  $.get("json/equipment.json", function(items) {


let recursiveBuild = (currentItem,itemIndex)=>{
      currentItem.parent = "#cabinet"
      item.buildItem(currentItem).then(

()=>{

        item.addItemToList(currentItem)
        let nextItem=items[itemIndex++]
        console.log(nextItem)
        if(nextItem){recursiveBuild(nextItem,itemIndex) }
    })
  }
  recursiveBuild(items[0],0)
  })
  setTimeout(()=>{
  $('#cabinet>div').draggable({
        //  use a helper-clone that is append to 'body' so is not 'contained' by a pane
        helper: function() {
            return jQuery(this).clone().appendTo('body').css({
                'zIndex': 5
            });
        },
        cursor: 'move'

    });
},1000);


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
