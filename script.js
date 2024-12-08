$(document).ready(function () {
  $(".card")
    .not("flipped")
    .on("click", function () {
      if (!$(this).parent().hasClass("future")) {
        if (!$(this).hasClass("flipped")) {
          $(this).addClass("flipped");
        }

        var $cookie = Cookies.get("day"),
          $this = $(this),
          $value = $this.parent().attr("data-day");

        if ($cookie != undefined) {
          Cookies.set("day", $cookie + "," + $value);
          var $cookie = Cookies.get("day");
        } else {
          Cookies.set("day", $value);
          var $cookie = Cookies.get("day");
        }
      }
    });

  $("#calendar-reset").on("click", function (e) {
    e.preventDefault();
    Cookies.remove("day");
    $(".card").removeClass("flipped");
  });

  $(".card.flipped").unbind("click");

  if (Cookies.get("day") != null) {
    var favoritesArray = Cookies.get("day").split(",");
  }

  if (typeof favoritesArray != "undefined") {
    $(".card").each(function () {
      var $this = $(this);

      if ($.inArray($this.parent().attr("data-day"), favoritesArray) !== -1) {
        $this.addClass("flipped");
      }
    });
  }

  var d = new Date();
  var day = d.getDate();

  $(".day").each(function () {
    var dayDate = parseInt($(this).attr("data-day"));
    if (dayDate === day) {
      $(this).addClass("active-day");
    } else if (dayDate > day) {
      $(this).addClass("future");
    }
  });

  $("#calendar-active").on("click", function (e) {
    e.preventDefault();
    $(".day").removeClass("future");
    $(".day").addClass("active-day");
  });

  $("#calendar-deactive").on("click", function (e) {
    e.preventDefault();
    $(".day").removeClass("active-day");
    $(".day").addClass("future");
  });
});