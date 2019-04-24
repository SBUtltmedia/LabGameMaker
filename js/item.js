function Item() {

  this.itemList = {

  }
  this.buildItemById = function(itemId) {

    return this.buildItem(Object.assign({}, domItems[itemId], {
      itemId
    }))
  }


this.addItemToList = function(item) {
  this.itemList[item.itemId] = item
}
  this.buildItem = function({
    parent = "#view",
    itemId,
    css = {},
    classes = [],
    resources,
  })
  {
    var defer = $.Deferred();
    console.log(resources == false)
    if (resources) {
      $.ajax({
        url: "./resources/" + resources,
        dataType: "text",
        success: (data) => {

          this.makeDOMItem({
            parent,
            itemId,
            css,
            classes,
            data
          })


          defer.resolve("resource")




        },
        error: function() {

          defer.resolve("no found")
        }
      })
    } else {
      data = "";
      this.makeDOMItem({
        parent,
        itemId,
        css,
        classes,
        data

      })

      defer.resolve("no resource")


    }
    return defer.promise();
  }

  this.makeDOMItem = function({
    parent = "#cabinet",
    itemId,
    css = {},
    classes = [],
    data = ""

  }) {
    //
    //   {
    //     id: itemId,
    //     class: [...classes],
    //     html: data
    //   }
    // )
    var div = $('<div/>', {
      id: itemId,
      class: [...classes],
      html: data
    }).css(css)

    $(parent).append(div);

  }


  this.buildAllItems = function(domItemsIds) {
    var defer = $.Deferred();
    var _this = this;

    function buildItemsRecurse(itemIndex = 0) {

      //    itemIds = Object.keys(domItems)
      if (itemIndex < domItemsIds.length) {

        _this.buildItemById(domItemsIds[itemIndex]).then(() => {

          buildItemsRecurse(itemIndex + 1)
        }).fail(() => {
          defer.resolve("failed")
        })

      } else {
        //
        defer.resolve("done building item")
      }
    }
    buildItemsRecurse()
    return defer.promise()
  }
}
