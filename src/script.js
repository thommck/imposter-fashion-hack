$(document).ready(function() {

  var animating = false;
  var cardsCounter = 0;
  var numOfCards = 1;
  var decisionVal = 80;
  var pullDeltaX = 0;
  var deg = 0;
  var $card, $cardReject, $cardLike;
  var userId = '';

  function pullChange() {
	  
    animating = true;
    deg = pullDeltaX / 10;
    $card.css("transform", "translateX("+ pullDeltaX +"px) rotate("+ deg +"deg)");

    var opacity = pullDeltaX / 100;
    var rejectOpacity = (opacity >= 0) ? 0 : Math.abs(opacity);
    var likeOpacity = (opacity <= 0) ? 0 : opacity;
    $cardReject.css("opacity", rejectOpacity);
    $cardLike.css("opacity", likeOpacity);
	
  };

  function release() {
	 
	var imageUrl = "url('https://storagefashionimposter.blob.core.windows.net/images/fasion-dress.jpg')";
	var productText = "Default Text";
	var swiped = "";
	 
    if (pullDeltaX >= decisionVal) {
      $card.addClass("to-right");
	  console.log("to right");
	  swiped = "Swiped right!";
    } else if (pullDeltaX <= -decisionVal) {
      $card.addClass("to-left");
	  console.log("to-left");
	  swiped = "Swiped left!";
    }

    if (Math.abs(pullDeltaX) >= decisionVal) {
      $card.addClass("inactive");

      setTimeout(function() {
        $card.addClass("below").removeClass("inactive to-left to-right");
        cardsCounter++;
        if (cardsCounter === numOfCards) {
          cardsCounter = 0;
          $(".demo__card").removeClass("below");
        }
      }, 300);
    }

    if (Math.abs(pullDeltaX) < decisionVal) {
      $card.addClass("reset");
    }

    setTimeout(function() {
	  console.log("Reset variables");
      $card.attr("style", "").removeClass("reset")
        .find(".demo__card__choice").attr("style", "");

      // Update the name of the product
	  $("#productname").text(productText);
	
	  // Update the image
	  $('.demo__card__img').css('background-image', imageUrl);
	  
	  // Update the way the user swiped
	  $("#swiped").text(swiped);
	  
      pullDeltaX = 0;
      animating = false;
    }, 300);	
  };

  $(document).ready(function() {
	//var imageUrl = "url('https://storagefashionimposter.blob.core.windows.net/images/fasion-dress.jpg')";
	var productText = "Default Text";
	var imageUrl = '';
	
	$.ajax('/.auth/me',
    {
      success: function (data, status, xhr) {
        console.log(JSON.stringify(data))
		userId = data.clientPrincipal.userId;
		alert(userId);
      }
    });
	
	$.ajax('/api/fakeapiget',
    {
      success: function (data, status, xhr) {
        console.log(JSON.stringify(data))
		imageUrl = data.url;
      }
    });
	  
	// Update the name of the product
	$("#productname").text(productText);
	
	// Update the image
	$('.demo__card__img').css('background-image', imageUrl);
	
  });

  $(document).on("mousedown touchstart", ".demo__card:not(.inactive)", function(e) {
    if (animating) return;

    $card = $(this);
    $cardReject = $(".demo__card__choice.m--reject", $card);
    $cardLike = $(".demo__card__choice.m--like", $card);
    var startX =  e.pageX || e.originalEvent.touches[0].pageX;

    $(document).on("mousemove touchmove", function(e) {
      var x = e.pageX || e.originalEvent.touches[0].pageX;
      pullDeltaX = (x - startX);
      if (!pullDeltaX) return;
      pullChange();
    });

    $(document).on("mouseup touchend", function() {
      $(document).off("mousemove touchmove mouseup touchend");
      if (!pullDeltaX) return; // prevents from rapid click events
      release();
    });
  });

});