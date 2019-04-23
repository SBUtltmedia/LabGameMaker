function animate(selector, delay, method, param, inputs = [], callback = () => {}) {


  return new Promise(function(resolve, reject) {


    function anim_resolve() {
      setTimeout(() => {

        resolve("anim_anim_resolved")


      }, 0)


    }



    if (game.testMode) {
      delay = 0
    }

    if (method == "keyframe") {
      var animation = makeAnimation(param, inputs)
      var keyframe = animation.keyframes

      //    $(selector).resetKeyframe(callback);

      if (game.testMode) {
        $(selector).css(keyframe["100%"])
        //  callback();

        anim_resolve("keyframetestmode")

      }
      // if ($(selector + ':visible').length == 0) {
      //     setTimeout(function () {
      //         $(selector).show();
      //         $(selector).removeClass("opClass");
      //         $(selector).css("visibility", "visible");
      //     }, delay)
      // }
      else {



        var randParam = param + Date.now();
        var animDef = {
          name: randParam,
          ...animation.keyframes
        }
        var propDef = `${randParam} ${animation.props}`



        setTimeout(function() {
          $.keyframe.define(animDef)
          $(selector).playKeyframe(propDef, function() {

            $(selector).css(keyframe["100%"])
            $(selector).resetKeyframe(function() {

              var style = $(selector).attr("style");
              // var keyframe = animation.keyframes
              if (style) {
                style = style.replace(/animation:[^;]*;/g, "")
                $(selector).attr("style", style);
              }
              anim_resolve(method)
            });
          });
          // callback();
        }, delay)
      }
    } else if (method == "null") {
      anim_resolve(method)
    } else if (method == "css") {
      setTimeout(function() {
        $(selector).css(...param);
        // callback();
        anim_resolve("css")
      }, delay)
      anim_resolve(method)
      //$(selector).delay(delay).playKeyframe(param, function () {});
    }




    //$(selector).attr("style","")

    //$(selector).delay(delay).playKeyframe(param, function () {});
    else if (method == "addClass" || method == "removeClass") {
      setTimeout(function() {
        $(selector)[method](param);
        // callback();
        anim_resolve(method)
      }, delay)
    } else if (method == "attr") {
      setTimeout(function() {
        $(selector).attr(param[0], param[1]);
        // callback();
        anim_resolve(method)
      }, delay)
    } else if (method == "animate") {
      if (game.testMode) {
        $(selector).css(...param)
        anim_resolve(method)
      } else {
        setTimeout(function() {
          anim_resolve(method)

          $(selector).animate(...param);
        }, delay)
      }
      //$(selector).delay(delay).playKeyframe(param, function () {});
    } else if (typeof(method) == "function") {
      if (method.name == "zoom" && game.testMode) {
        zoomInstant(param[0], param[1], param[2])
        // callback()
        anim_resolve(method)

      } else {
        $(selector).delay(delay).queue(function() {
          method(...param, game.testMode)
          $(this).dequeue();
          // callback();
          anim_resolve(method)
        })
      }


    }




  })
}
