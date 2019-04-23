function translateGel(laneSelect) {
  //Make helper function!!
  $("#gelTopView svg #Lane0 #weight1").attr('transform', 'translate(0 30) scale(1, 1) ');
  var lanes = [
    [
      [40, .8],
      [45, .8],
      [53, .8],
      [62, .8],
      [78, .8],
      [83, .8],
      [110, .8],
      [130, .8]
    ],
    [
      [42, .8],
      [57, .8],
      [65, .8],
      [80, .8],
      [87, .8],
      [110, .8],
      [115, .8],
      [128, .8]
    ],
    [
      [43, .8],
      [47, .8],
      [53, .8],
      [77, .8],
      [83, .8],
      [97, .8],
      [113, .8],
      [135, .8]
    ],
    [
      [42, .8],
      [52, .8],
      [63, .8],
      [85, .8],
      [88, .8],
      [107, .8],
      [112, .8],
      [128, .8]
    ],
    [
      [41, .8],
      [58, .8],
      [65, .8],
      [79, .8],
      [83, .8],
      [104, .8],
      [114, .8],
      [126, .8]
    ],
    [
      [47, .8],
      [56, .8],
      [66, .8],
      [82, .8],
      [89, .8],
      [108, .8],
      [123, .8],
      [127, .8]
    ],
    [
      [42, .8],
      [57, .8],
      [65, .8],
      [74, .8],
      [87, .8],
      [110, .8],
      [118, .8],
      [125, .8]
    ]
  ]
  lanes[laneSelect - 1] = lanes[0]
  // lanes[game.state.lane - 1] = lanes[0];
  lanes.forEach(function(val, idx) {
    setLane(idx, val)
  })
  function setLane(laneNum, weightArray) {
    weightArray.forEach(function(val, idx) {
      var selector = "#gelTopView svg #Lane" + laneNum + " #weight" + idx + "_" + laneNum + " rect"
      $(selector).attr('transform', 'translate(0 ' + val[0] + ') scale(1, ' + val[1] + ')');
    })
  }

}
