function Menu() {

  this.buildMenu = function(steps, parent) { //steps.id was coming up blank, added parent variable
    var defer = $.Deferred();
    if (steps.length) {
      var parentSelector = "#" + parent;
      for (var step of steps) {
        $(parentSelector).append($("<div>", {
          "id": step.id,
          "class": "stepPanelItem",
          "html": step.shortText,
        }))
        var groupRegEx = /group[0-9]+/i
        if (step.steps) {
          if (step.repeats) {
            $("#" + step.id).addClass("repeats")
            game.addToRepeats(step.id, step.repeats)
          }
          $(parentSelector).append(menu.buildMenu(step.steps, step.id))
        } else {
          game.addToSteps(step)
          game.addToGroup(step.id, parent)
          $("#" + step.id).addClass("baseStep").hide()
        }
      }
    }
    this.groupNames = Object.keys(game.groups)
    this.stepNames = []
    for (i = 0; i < game.steps.length; i++) {
      this.stepNames.push(game.steps[i].id)
    }




    // $(".stepPanelItem").on("click", function() {
    //
    //   $(this).addClass("spin")
    //   setTimeout(function() {
    //     $(this).removeClass("spin")
    //   }, 10)
    // })
  defer.resolve("Menu built")
    return defer.promise();
  }
  this.setMenuItem = function(stepNumber) {
    var group = game.getGroupMembership(stepNumber)
    $("#" + group + ">div").show(1000)
  }

  this.resetRepeatGroup = function(stepNumber) {
    var stepId = game.steps[stepNumber].id
    $("#" + stepId).parent().removeClass("completed")
    $("#" + stepId).siblings().removeClass("completed")
  }

  this.setGroupCompleted = function(groupSelector) {
    $("#" + groupSelector).addClass("completed").removeClass("activeGroup")
    $("#" + groupSelector + ">div").hide(500)
  }

  this.setItemCompleted = function(stepNumber) {
    $("#" + game.steps[stepNumber].id).addClass("completed")
  }

  this.highlightMenuItem = function(item) {
    var stepId = game.steps[item].id
    $('#stepList *').removeClass("highlight")
    $('#' + stepId).addClass("highlight")
    var group = game.getGroupMembership(item)
    $("#" + group).addClass("activeGroup")
  }

  this.hideGroups = function() {
    for (i of this.groupNames) {
      if (!$("#" + i).hasClass("activeGroup")) {
        $("#" + i + " *").hide()
      }
    }
  }
}
