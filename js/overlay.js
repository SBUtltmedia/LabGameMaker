function Overlay() {
  this.message = function(textMessage, textButton) {
    textMessage = textMessage.replace("\n", "<br>")
    this.showOverlay()
    $("#messageText").html(textMessage)
    $("#messageButton").html(textButton)
    $('#messageBox').show();
    $('#messageButton').on("click", function() {
      $('#messageBox').hide();
      overlay.hideOverlay()
    })

  }
  this.showOverlay = function() {
    $("#overlay").show();
  }
  this.hideOverlay = function() {
    setTimeout(function() {
      $("#overlay").hide();
    }, 500);
  }
}
