function Game(steps) {

  this.stepEngine = new StepEngine();
  this.groups = {}
  this.steps = []
  this.currentGroup = 0
  this.iteration = 0
  this.testMode = false
  this.state = stateInit()
  if (location.hash) {
    [, this.hash, this.hashLoop] = location.hash.replace("_", "#").split("#")
  }
  if (this.hash) {
    this.testMode = true;
  }
  function stateInit() {
    const tipTrayRows = 8,
      tipTrayCols = 12;
    var state = {
      noCriteria: 0,
      tubesPressed: [0,0,0,0,0,0],
      totalTubesPressed: 0,
      microtubeState: 0,
      //state numbers for reference [0:"untouched", 1:"opened", 2:"closed", 3:"flicked", 4:"tapped", 5:"returned", 6:"exposed"]
      TipPosition: false,
      tipTray: Array(tipTrayRows * tipTrayCols).fill(0),
      wellPosition: Array(7).fill(0),
      voltage: 0,
      volume: 0,
      time: 0,
      tip: 0,
      score: 0
      // answerLane:

      // tipPositions: ,
    }
    $("#micropipette2").append($('#pipetteTip1'));
    $("pipetteTip1").addClass(".opClass")
    return state;
  }
  this.addToGroup = function(id, group) {
    this.groups[group] = this.groups[group] || {
      repeats: 0,
      steps: []
    }
    this.groups[group].steps = [...this.groups[group].steps, id]
  }
  this.addToRepeats = function(group, repeats) {
    this.groups[group] = {
      repeats: repeats,
      steps: []
    }
  }
  this.getGroupMembership = function(item) {
    if (typeof item == "number") {
      return Object.keys(this.groups).find((n) => {
        return this.groups[n].steps.indexOf(this.steps[item].id) != -1;
      })
    } else if (typeof item == "string") {
      var groupNames = Object.keys(game.groups)
      for (i = 0; i < groupNames.length; i++) {
        if (game.groups[groupNames[i]].steps.includes(item)) {
          return groupNames[i]
        }
      }
    }
  }
  this.addToSteps = function(item) {
    this.steps.push(item)
    this.steps[this.steps["length"] - 1].completed = "false"
  }
  // this.getSteps = function() {
  //   return this.steps
  // };
  this.nextStep = function(stepIndex) {
    var nextStepNum = ((stepIndex + 1) % this.steps.length)
    // var currentStep = this.steps[stepIndex]
    var prevStepNum = stepIndex - 1
    if (prevStepNum >= 0) {
      game.steps[prevStepNum].completed = "true"
      menu.setItemCompleted(prevStepNum)
    }
    if (nextStepNum == 0) {
      this.restartGame()
    }
    menu.setMenuItem(stepIndex)
    menu.highlightMenuItem(stepIndex)
 //try while item doesnt exist, add item
      buildStage(stepIndex).then(() => {game.stepEngine.startStep(stepIndex)})
  }
  this.restartGame = function() {
    $('#stepList *').removeClass("activeGroup")
    $('#stepList *').removeClass("completed")
    for (i = 0; i < this.steps.length; i++) {
      this.steps[i].completed = "false"
    }
  }
}
