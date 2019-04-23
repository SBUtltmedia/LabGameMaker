function Overlay() {

  this.message = (textMessage, textButton = "OK") =>{
    textMessage = textMessage.replace("\n", "<br>")
    this.showOverlay()
    $("#messageText").html(textMessage)
    $("#messageButton").html(textButton)
    $('#messageBox').show();
    $('#messageButton').on("click", () =>{
      $('#messageBox').hide();
      this.hideOverlay()
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
