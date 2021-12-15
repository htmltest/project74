$(window).resize(function() {});
$(window).load(function() {});
$(window).scroll(function () {

    if ($(window).scrollTop() > $(".header-top").outerHeight()) {
      $(".main-menu").addClass("menu-fixed");
      $(".header-top").css("margin-bottom",$(".main-menu").height())
    } else {
      $(".main-menu").removeClass("menu-fixed");
      $(".header-top").css("margin-bottom",0)
    }

});

var hostname = document.location.protocol + '//' + document.location.hostname;

$(document).ready(function () {

  if ($(".course-program").length) {
    $(".course-program").courseProgram();
  }

  $(".clients-list .link").click(function() {
    if (!$(this).parents("li").hasClass("act")) {
      $(".clients-list li").removeClass("act");
      $(this).parents("li").addClass("act");
      $(".file-link-wrapper").hide();
      $(this).parents("li").find(".file-link-wrapper").slideDown(150);
    } else {
      $(this).parents("li").removeClass("act");
      $(this).parents("li").find(".file-link-wrapper").slideUp(150);
    }
  });

  if ($(".center-photos").length) {
    $(".center-photos .thumbs a").click(function() {
      $(this).parents(".center-photos").find(".big-pic img").attr("src",$(this).attr("href")).hide().fadeIn(150);
      $(this).parents(".thumbs").find("a").removeClass("act");
      $(this).addClass("act");
      return false;
    });
  }

  $(".program-list .link .ico").click(function() {
    var link = $(this).parents(".link");
    var popup = link.parents("li").find(".program-popup");
    popup.css("padding-top",0).css("padding-top",link.height() + 35);
    link.toggleClass("link-act");
    popup.fadeToggle(150);
  });

  handleReviews();

  $(".course-descr-finished .signup").click(function() {
    return false;
  });

  if ($(".course-gallery").length) {
    $(".course-gallery").courseGallery();
  }



  if (0) {

    //Thumbnailer.config.shaderOpacity = 1;
    var $course_gallery_1 = $('#course_gallery_1 .gallery').tn3({
      responsive: false,
      imageClick:"fullscreen",
      image:{
        maxZoom:1.5,
        crop:true,
        clickEvent:"dblclick"
      },
      thumbnailer:{
        overMove: false
      }
    }).data('tn3');

    $course_gallery_1.resize($(window).width(),$(window).height() - 200);

    $(window).resize(function() {
      $course_gallery_1.resize($(window).width(),$(window).height() - 200);
    })

    $(".course-gallery a").click(function() {

      var galId = $(this).parents(".course-gallery").attr("rel");

      var gal = $("#"+galId);

      gal.show($(this).prevAll("a").length);
      gal.css({
        left: 0,
      }).hide().fadeIn(150);


      return false;
    });

    $(".gallery-close").on("click",function() {
      $(".gallery-popup").fadeOut(150,function() {
        $(".gallery-popup").css("left",-20000);
      });
    });

    jQuery(document).keydown(function(e){
      if (e == null) { // ie
        keycode = event.keyCode;
      } else { // mozilla
        keycode = e.which;
      }



      if(keycode == 27){ // escape, close box
        $(".gallery-popup").fadeOut(150,function() {
          $(".gallery-popup").css("left",-20000);
        });
      }

    });


  }

  if (0) {

    //Thumbnailer.config.shaderOpacity = 1;
    var $course_gallery_2 = $('#course_gallery_2 .gallery').tn3({
      responsive: false,
      imageClick:"fullscreen",
      image:{
        maxZoom:1.5,
        crop:true,
        clickEvent:"dblclick"
      },
      thumbnailer:{
        overMove: false
      }
    }).data('tn3');

    $course_gallery_2.resize($(window).width(),$(window).height() - 200);

    $(window).resize(function() {
      $course_gallery_2.resize($(window).width(),$(window).height() - 200);
    })

    $(".course-gallery a").click(function() {

      var galId = $(this).parents(".course-gallery").attr("rel");

      var gal = $("#"+galId);

      gal.css({
        left: 0,
      }).hide().fadeIn(150);

      gal.find(".tn3-thumbs li").eq($(this).prevAll("a").length).click();

      return false;
    });

    $(".gallery-close").on("click",function() {
      $(".gallery-popup").fadeOut(150,function() {
        $(".gallery-popup").css("left",-20000);
      });
    });

    jQuery(document).keydown(function(e){
      if (e == null) { // ie
        keycode = event.keyCode;
      } else { // mozilla
        keycode = e.which;
      }



      if(keycode == 27){ // escape, close box
        $(".gallery-popup").fadeOut(150,function() {
          $(".gallery-popup").css("left",-20000);
        });
      }

    });


  }

  if ($("input:radio").length) {
    $("input:radio").iCheck();
  }

  $(".events-table tr").hover(function() {
    $(".hover-prev").removeClass("hover-prev");
    $(this).prev("tr").addClass("hover-prev");
  });

  // City selector

  citySelector();

	// Center - Load more photos

	$('.more-photos').bind('click', function(e){
		e.preventDefault();
		more_link = $(this);
		$(this).html('<img src="/layout/images/loader.gif" style="padding:24px" />');
		data = $(this).attr('id').split('_');
		$.ajax({
			url				: hostname + '/about/offices/offices_'+data[1]+'.html?template=28',
			dataType		: "html",
			error				: function(jqXHR, textStatus, errorThrown){
				alert('jqXHR - ' + jqXHR);
				alert('textStatus - ' + textStatus);
				alert('errorThrown - ' + errorThrown);
			},
			success		: function(msg){
				// more_link.parent().prev().remove();
				more_link.parent().parent().append(msg);
				more_link.parent().remove();
			}
		})
	})

	makeup();

	// Handling popups

	$(".popup-link").click(function() {
		openPopup($(this).attr("rel"))
	});

	// Toggling centers photos

	// $(".center-gallery .more-photos").click(function() {
		// $(this).hide();
		// $(this).prevAll(".hidden").fadeIn(150)
	// });

	// Toggling comment form

	$(".comment-body .reply-button").click(function() {
		$(this).parents(".comment-body").next(".comment-form").slideToggle(200)
	});

	// Separating news items by rows

	if ($(".teachers-list-compact").length) {
		$(".teachers-list-compact").not(".teachers-list-2").not(".teachers-list-3").each(function() {
			var list = $(this);

			var items = list.children(".teachers-list-item");

			for(var i = 0; i < items.length; i+=2) {
				items.slice(i, i+2)
				.wrapAll("<div class='teachers-row fc' />");
			}

			list.find(".teachers-row").first().addClass("first-row");
			list.find(".teachers-row").last().addClass("last-row");
		});
	}

	if ($(".teachers-list").length) {
		$(".teachers-list").not(".teachers-list-2").not(".teachers-list-3").each(function() {
			var list = $(this);

			var items = list.children(".teachers-list-item");

			for(var i = 0; i < items.length; i+=3) {
				items.slice(i, i+3)
				.wrapAll("<div class='teachers-row fc' />");
			}

			list.find(".teachers-row").first().addClass("first-row");
			list.find(".teachers-row").last().addClass("last-row");

		});
	}

	$(".main-menu .link").parents("li").hover(function() {
		$(this).find(".submenu").fadeIn(150);
	},function() {
		$(this).find(".submenu").fadeOut(150);
	});

	$(".more-reviews span").click(function() {
		$(".review-hidden").fadeIn(150)
	})

	$(".common-form select").customSelect();

  if ($(".upcoming-filter").length) {
    $(".upcoming-filter select").customSelect();
  }

	// Adding form field

	$(".common-form .add-field").click(function() {
		var adder = $(this);
		var newIndex = parseInt($(".form-item[rel='" + adder.attr("rel") + "']").length + 1);

		var newFormItem = $(".form-item[rel='" + adder.attr("rel") + "']").last().clone();

		newFormItem.find("input").attr("id",newFormItem.find("input").attr("id").replace("_"+parseInt(newIndex-1),"_"+newIndex));
		newFormItem.find("input").attr("name",newFormItem.find("input").attr("id").replace("_"+parseInt(newIndex-1),"_"+newIndex));

		newFormItem.insertAfter($(".form-item[rel='" + adder.attr("rel") + "']").last());
		newFormItem.find("label").html("");

	});

	validateForms();

	// custom input

	if ($(".common-form input:file").length) {
		$(".common-form input:file").nicefileinput({
			label : 'Выбрать файл'
		});
	}

	// Fancyboxes

	if ($(".fancybox").length) {

		$(".fancybox")
		.fancybox({
			nextEffect: 'fade',
			prevEffect: 'fade',
			beforeShow: function () {

				if (this.title) {
					// New line
					this.title += '';

					//this.title += '<div class="descr">'+$(this.element).children(".descr").html()+'</div>'

					this.title += '<div class="fancybox-counter">Фотография ' + (this.index + 1) + ' из ' + this.group.length +'</div>';

				}
			},
			afterShow: function() {
				// Render tweet button
				twttr.widgets.load();
			},
			helpers : {
				title : {
					type: 'inside'
				}
			}
		});

	}

	$(".hint .close").click(function() {
		$(this).parents(".hint").slideUp(150)
	});

	$(".course-manager .trigger, .manager-popup .name").click(function() {
		$(".manager-popup").fadeToggle(150)
	})

	$(".manager-popup,.course-manager h4").hover(function() {
		$(this).addClass("hover");
	},function() {
		$(this).removeClass("hover");
	});

	$(".manager-popup").bind("mouseout",function() {
		if (managerT) {
			cleadTimeout(managerT)
		}
		var managerT = setTimeout(function() {
			if (!$(".manager-popup").hasClass("hover") && !$(".course-manager h4").hasClass("hover")) {
				$(".manager-popup").fadeOut(250)
			}
		},500);
	});

	$(".course-program .ttl").click(function() {
		$(this).parents(".cp-item").find(".descr").slideToggle(250);
		$(this).parents(".cp-item").toggleClass("cp-open")
	});

	$(".course-docs .trigger").click(function() {
		$(this).next(".cont").slideToggle(150);
	});

	$(".expandable .trigger").click(function() {
		$(this).next(".cont").slideToggle(150);
	});

	// Tabbed content

	$(".tabbed-content").each(function() {
		var tabs = $(this).children(".tabs").find(".tab");
		var tabContents = $(this).children(".tabs-content").children(".tab-content");

		if (!tabs.hasClass("act")) {
			tabs.first().addClass("act");
		}

		tabContents.hide();
		tabContents.filter("[rel='"+tabs.filter(".act").attr("rel")+"']").show();

		tabs.click(function() {
		tabs.removeClass("act");
		$(this).addClass("act");

		tabContents.hide();

		tabContents.filter("[rel='"+$(this).attr("rel")+"']").fadeIn(250)

		});

	});

	// Events carousel

	if ($(".events-carousel").length) {
		$(".events-carousel").each(function() {
			$(this).jCarouselLiteCustom({
				btnNext: ".mainpage-events .next",
				btnPrev: ".mainpage-events .prev",
				visible: 4,
				circular: true,
				scroll: 2,
				speed:1000
			});
		});
	}

	// Books carousel

	if ($(".books-carousel").length) {
		$(".books-carousel .jcarousel").jcarousel({
			scroll:6,
			animation: 2000,
			initCallback: booksInit,
			buttonPrevCallback: booksPrev,
			buttonNextCallback: booksNext
		});
	}

	// Calendar carousel

	if ($(".calendar-carousel").length) {
		// $(".calendar-carousel .jcarousel").jcarousel({
			// scroll:1,
			// animation: 2000,
			// itemFirstInCallback: calendarFirstInCallback,
			// itemLastInCallback: calendarLastInCallback
		// });
	}

	$(".calendar-month-prev").click(function() {
		$(".calendar-carousel .jcarousel-prev").click();
		// return false;
	});

	$(".calendar-month-next").click(function() {
		$(".calendar-carousel .jcarousel-next").click();
		// return false;
	});

	// Partners carousel

	if ($(".partners-carousel").length) {
		$(".partners-carousel .jcarousel").jcarousel({
			scroll:5,
			animation: 1000
		});
	}

	// Login popup

	$(".login-popup-trigger").bind("click",function() {
		$(".login-popup").css("top",$(this).position().top - 9).css("left",$(this).position().left).fadeToggle(150);
	});

	$(".login-popup,.login-popup-trigger").hover(function() {
		$(this).addClass("hover");
	},function() {
		$(this).removeClass("hover");
	});

	$(".login-popup").bind("mouseout",function() {
		if (loginT) {
			cleadTimeout(loginT)
		}
		var loginT = setTimeout(function() {
			if (!$(".login-popup-trigger").hasClass("hover") && !$(".login-popup").hasClass("hover")) {
				$(".login-popup").fadeOut(250)
			}
		},500);
	});

	$(".input-wrapper").click(function() {
		var wrapper = $(this);
		$(this).children("input").focus();
		$(this).addClass("input-wrapper-focus");
		$(this).children("input").blur(function() {
			wrapper.removeClass("input-wrapper-focus");
		});
	});

	$('.sresponses').bind('change', function() {
		response_div = $(this).parent().parent().parent().next();
		response_div.html('');
		response_div.append('<img src="/layout/images/loaderb.gif" style="padding-left:6px" />')
		$.ajax({
			url				: hostname + '/corporate/responses/?template=28&isAjax=1&type=' + $(this).val(),
			dataType		: "html",
			error				: function(jqXHR, textStatus, errorThrown){
				alert('jqXHR - ' + jqXHR);
				alert('textStatus - ' + textStatus);
				alert('errorThrown - ' + errorThrown);
			},
			success		: function(msg){
				response_div.html('');
				response_div.append(msg);
			}
		})
	})

	$('.allcourses-main').change( function() {
		allcourses_div = $(this).next();
		allcourses_div.html('');
		allcourses_div.append('<div class="loader"><img src="/layout/images/loaderb.gif" style="padding-left:6px" /></div>');
		$.ajax({
			url				: hostname + '/course-series/courses/rcourses/?template=28&isAjax=1&nc_ctpl=280&SId=' + $(this).val(),
			dataType		: "html",
			error				: function(jqXHR, textStatus, errorThrown){
				alert('jqXHR - ' + jqXHR);
				alert('textStatus - ' + textStatus);
				alert('errorThrown - ' + errorThrown);
			},
			success		: function(msg){
				allcourses_div.html('');
				allcourses_div.html('');
				allcourses_div.append(msg);
			}
		})
	} );

	$('.allseminars-main').change( function() {
		allcourses_div = $(this).next();
		allcourses_div.html('');
		allcourses_div.append('<div class="loader"><img src="/layout/images/loaderb.gif" style="padding-left:6px" /></div>');
		$.ajax({
			url				: hostname + '/seminars-series/seminars/rseminars/?template=28&isAjax=1&nc_ctpl=281&SId=' + $(this).val(),
			dataType		: "html",
			error				: function(jqXHR, textStatus, errorThrown){
				alert('jqXHR - ' + jqXHR);
				alert('textStatus - ' + textStatus);
				alert('errorThrown - ' + errorThrown);
			},
			success		: function(msg){
				allcourses_div.html('');
				allcourses_div.html('');
				allcourses_div.append(msg);
			}
		})
	} );



});


(function( $ ) {
  $.fn.customSelect = function() {
    var selects = $(this);
    selects.each(function () {
      var select = $(this);

      if (!$(this).next(".param-selector").length) {
        select.css("visibility","hidden").css("position","absolute").css("z-index","-1");
        select.after("<div class='param-selector' id='" + select.attr("id") + "-selector'>");
        var selector = select.next(".param-selector");

        if (select.is(":disabled")) {
          selector.addClass("selector-disabled")
        }


        selector.append("<div class='param-sel' />").append("<div class='dropdown' />");
        var dropdown = selector.find(".dropdown");
        // dropdown.append("<div class='top-border' />");
        var paramSel = selector.find(".param-sel");
        paramSel.addClass("initial");
        paramSel.append("<div class='arr' />");
        paramSel.append("<div class='sel-value' />");

        if (select.find("option[value=" + select.val() + "]").attr("flag")) {
          paramSel.find(".sel-value").html("<img src='" + select.find("option[value=" + select.val() + "]").attr("flag") + "' />" + select.find("option[value=" + select.val() + "]").html());
        } else {
          if (select.parents().hasClass("reviews-filter")) {
            paramSel.find(".sel-value").html("<span>" + select.find("option[value=" + select.val() + "]").html() + "</span>");
          } else {
            paramSel.find(".sel-value").html(select.find("option[value=" + select.val() + "]").html());
          }
        }

        select.find("option").each(function () {
          if ($(this).attr("flag")) {
            var flag = "<img src=" + $(this).attr("flag") + " />";
          } else {
            flag = "";
          }

          if (select.find("option").length > 2) {

            if ($(this).val() != select.val() /* || select.attr("ttl")*/) {
              if (select.parents().hasClass("reviews-filter")) {
                dropdown.append("<div val='" + $(this).attr("value") + "'><span>" + flag + $(this).html() + "</span></div>");
              } else {
                dropdown.append("<div val='" + $(this).attr("value") + "'>" + flag + $(this).html() + "</div>");
              }
            } else {
              if (select.parents().hasClass("reviews-filter")) {
                dropdown.append("<div style='display:none' val='" + $(this).attr("value") + "'><span>" + flag + $(this).html() + "</span></div>");
              } else {
                dropdown.append("<div style='display:none' val='" + $(this).attr("value") + "'>" + flag + $(this).html() + "</div>");
              }
            }

          } else {
            if (select.parents().hasClass("reviews-filter")) {
              dropdown.append("<div val='" + $(this).attr("value") + "'><span>" + flag + $(this).html() + "</span></div>");
            } else {
              dropdown.append("<div val='" + $(this).attr("value") + "'>" + flag + $(this).html() + "</div>");
            }
          }

        });


        paramSel.on("click",function() {
          $(this).parents(".common-form").find(".form-item").css("z-index",1);
          $(this).parents(".form-item").css("z-index",10);
          if (!select.is(":disabled")) {
            if (dropdown.css("display") != "block") {
              $(".dropdown").fadeOut(150);
              $(".param-open").removeClass("param-open");
              dropdown.fadeIn(150);
              selector.addClass("param-open");
              var maxWidth = 0;

              $(this).parents(".form-item").prevAll(".form-item").css("z-index","100");
              $(this).parents(".form-item").css("z-index","1000");
              $(this).parents(".form-item").nextAll(".form-item").css("z-index","100");

              dropdown.find("div").each(function () {
                if ($(this).width() >= maxWidth) {
                  maxWidth = $(this).width();
                }
                if (paramSel.width() >= maxWidth) {
                  maxWidth = paramSel.width() + 1;
                }
              });

              //paramSel.css("width", maxWidth + "px");
              // dropdown.find("div").css("width", maxWidth + "px");
              // dropdown.css("width", maxWidth);

              // ddOverflow = $("html").height() - (dropdown.offset().top + dropdown.height());
              // if (ddOverflow < 0) {
                // dropdown.css("margin-top", -30 - dropdown.height());
              // }

              //dropdown.css("top",paramSel.position().top + paramSel.height());

            } else {
              dropdown.fadeOut(150);
              selector.removeClass("param-open");
            }
          }
        });

        dropdown.find("div").on("click",function () {
          selector.removeClass("param-sel-error");
          paramSel.removeClass("initial");
          var div = $(this);
          paramSel.find(".sel-value").html($(this).html());
          if ($(this).attr("flag")) {
            paramSel.find(".sel-value").attr("flag",$(this).attr("flag"));
          }
          select.val($(this).attr("val")).change();
          if (select.hasClass("hide-ttl")) {
            //select.find("option[value='']").remove();
            dropdown.find("div[val='']").remove();
          }
          dropdown.fadeOut(150, function () {
            dropdown.find("div").show().removeClass("selected");
            div.addClass("selected");
            div.parents(".param-open").removeClass("param-open");
          });
          if ($(this).attr("val")) {
            selector.parents(".form-item").find(".error-wrapper").remove();
          }
        });

      }
    });

  };
})( jQuery );


function makeup() {

	if (!$(".post-comments .first").length) {
		$(".post-comments .comment").first().addClass("first")
	}

	$("ol li").each(function() {
		if (!$(this).find("span.li-cont").length && !$(this).parents(".gallery").length) {
			$(this).html("<span class='li-cont'>"+$(this).html()+"</span>");
		}
	});

	if ($(".events-table-2").length) {
		$(".events-table-2 .name a").each(function() {
			if ($(this).height() > 50) {
				$(this).css("font-size","18px").css("line-height","18px");
			}
		});
	}

	if ($(".upcoming-courses").length) {
		$(".upcoming-courses .ttl a").each(function() {
			if ($(this).height() < 55) {
				$(this).css("font-size","36px").css("line-height","36px");
			}
		});
	}

	if ($(".upcoming-courses-2").length) {
		$(".upcoming-courses-2 .ttl a").each(function() {
			if ($(this).height() < 70 && $(this).height() >= 32) {
				$(this).css("font-size","24px").css("line-height","24px");
			}
			if ($(this).height() < 32) {
				$(this).css("font-size","36px").css("line-height","36px");
			}
		});
	}

	if ($(".calendar-carousel").length) {
		$(".calendar-calendar").each(function() {
			var li = $(this);
			li.find(".calendar-day").each(function() {
				if ($(this).position().left > li.width()/2 && $(this).position().top < li.height()/2) {
					$(this).find(".calendar-day-view").addClass("calendar-day-view-left");
				}

				if ($(this).position().left > li.width()/2 && $(this).position().top >= li.height()/2) {
					$(this).find(".calendar-day-view").addClass("calendar-day-view-leftbtm");
				}

				if ($(this).position().left < li.width()/2 && $(this).position().top >= li.height()/2) {
					$(this).find(".calendar-day-view").addClass("calendar-day-view-btm");
				}
			});

			li.find(".calendar-day-byweek").each(function() {

				var dayCont = $(this);

				$(this).find(".calendar-day-event").each(function() {
					var eventCont = $(this);

					if (dayCont.position().left > li.width()/2 && eventCont.position().top < li.height()/2) {
						$(this).find(".calendar-day-view").addClass("calendar-day-view-left");
					}

					if (dayCont.position().left > li.width()/2 && eventCont.position().top >= li.height()/2) {
						$(this).find(".calendar-day-view").addClass("calendar-day-view-leftbtm");
					}

					if (dayCont.position().left < li.width()/2 && eventCont.position().top >= li.height()/2) {
						$(this).find(".calendar-day-view").addClass("calendar-day-view-btm");
					}
				});
			});
		});
	}

	if ($(".mainpage-education").length) {
		$(".mainpage-education .ttl").each(function() {
			$(this).css("padding-top",0);
			if ($(this).height() < 25) {
				$(this).css("padding-top",5);
			}
		});
	}

	$("input:text, textarea").focus(function() {
		$(this).parents("form").find(".form-item").css("z-index",2)
		$(this).parents(".form-item").css("z-index",3)
	});

	$("input:text, textarea").each(function() {
		if (!$(this).prev("label").length && $(this).attr("phvalue")) {
			$(this).before("<label for='"+$(this).attr("id")+"' class='placeholder'>"+$(this).attr("phvalue")+"</label>");
			$(this).addClass("initial");

			if ($(this).prop("tagName") == "INPUT") {
				// if (!$(this).parents(".input-wrapper").length) $(this).wrap("<div class='input-wrapper'></div>");
				$(this).focus(function() {
					$(this).removeClass("initial");
					$(this).parents(".form-item").find(".placeholder").hide();
				});
				$(this).blur(function() {
					$(this).prev().prev(".placeholder").hide();
					if (!$(this).val()) {
						$(this).addClass("initial");
						$(this).parents(".form-item").find(".placeholder").show();
					}
				});
			} else {
				$(this).focus(function() {
					$(this).removeClass("initial");
					$(this).parents(".form-item").find(".placeholder").hide();
				});
				$(this).blur(function() {
					if (!$(this).val()) {
						$(this).addClass("initial");
						$(this).parents(".form-item").find(".placeholder").show();
					}
				});
			}

			$(this).parents(".form-item").find(".placeholder").click(function() {
				$(this).focus();
			});
		} else if ($(this).prev("label").hasClass("placeholder")) {

			$(this).focus(function() {
				$(this).removeClass("initial");
				$(this).parents(".form-item").find(".placeholder").hide();
			});
			$(this).blur(function() {
				$(this).prev().prev(".placeholder").hide();
				if (!$(this).val()) {
					$(this).addClass("initial");
					$(this).parents(".form-item").find(".placeholder").show();
				}

			});
		}
	});



	$("ul,ol").each(function() {
		if (!$(this).children("li").first().hasClass("first") && !$(this).parents(".gallery").length) {
			$(this).children("li").last().addClass("last");
			$(this).children("li").first().addClass("first");
		}

	});

	$("ol li").each(function() {
		if (!$(this).find(".li-cont").length && !$(this).parents(".gallery").length) {
			$(this).html("<span class='li-cont'>"+$(this).html()+"</span>")
		}

	});

	$("table").each(function() {
		if (!$(this).find("tr").first().hasClass("first")) {
			$(this).find("tr").last().addClass("last");
			$(this).find("tr").first().addClass("first");
		}

	});

	$("input.button").each(function () {
		if ($(this)[0].tagName == "INPUT" && !$(this).next("div.form-submit").length) {
			var divBtn = $("<div></div>");
			var submit = $(this);
			divBtn.attr("class",$(this).attr("class")).attr("id",$(this).attr("id")).html("<span>" + $(this).val() + "</span>");

			$(this).after(divBtn);

			$(this).hide();
			divBtn.on("click",function () {
				submit.click();
			});
		}

	});

}

function calendarFirstInCallback(carousel, item, idx, state) {
	carousel.list.find("li").removeClass("next").removeClass("prev");
	carousel.list.find("li[jcarouselindex='"+parseInt(idx+1)+"']").addClass("next");
	carousel.list.find("li[jcarouselindex='"+parseInt(idx-1)+"']").addClass("prev");
	if (carousel.list.find(".calendar-day-byweek").length) {
		$(".calendar-day-byweek").css("height",carousel.list.height());
	}
	if (idx > 1) {
		carousel.list.parents(".calendar-carousel").find(".calendar-month-prev span").html(carousel.list.find("li[jcarouselindex='"+parseInt(idx-1)+"']").find(".calendar-month-curr").html().split(",")[0]);
		carousel.list.parents(".calendar-carousel").find(".calendar-month-prev").show();
	} else {
		carousel.list.parents(".calendar-carousel").find(".calendar-month-prev span").html("")
		carousel.list.parents(".calendar-carousel").find(".calendar-month-prev").hide();
	}
	if (idx < carousel.list.find("li").length) {
		carousel.list.parents(".calendar-carousel").find(".calendar-month-next span").html(carousel.list.find("li[jcarouselindex='"+parseInt(idx+1)+"']").find(".calendar-month-curr").html().split(",")[0]);
		carousel.list.parents(".calendar-carousel").find(".calendar-month-next").show();
	} else {
		carousel.list.parents(".calendar-carousel").find(".calendar-month-next span").html("")
		carousel.list.parents(".calendar-carousel").find(".calendar-month-next").hide();
	}

};

function calendarLastInCallback(carousel, item, idx, state) {
	carousel.list.find("li").removeClass("next").removeClass("prev");
	carousel.list.find("li[jcarouselindex='"+parseInt(idx+1)+"']").addClass("next");
	carousel.list.find("li[jcarouselindex='"+parseInt(idx-1)+"']").addClass("prev");
};

function booksInit(carousel, state) {
	var cloneNext = carousel.list.parents(".books-carousel").find(".jcarousel-next").clone();
	var clonePrev = carousel.list.parents(".books-carousel").find(".jcarousel-prev").clone();
	carousel.list.parents(".books-carousel").append(clonePrev);
	carousel.list.parents(".books-carousel").append(cloneNext);
	cloneNext.click(function() {
		carousel.list.parents(".books-carousel").find(".jcarousel-next").click();
	});
	clonePrev.click(function() {
		carousel.list.parents(".books-carousel").find(".jcarousel-prev").click();
	});
};

function booksPrev(carousel, button, enabled) {
	if (!enabled) {
		carousel.list.parents(".books-carousel").children(".jcarousel-prev").addClass("jcarousel-prev-disabled");
	} else {
		carousel.list.parents(".books-carousel").children(".jcarousel-prev").removeClass("jcarousel-prev-disabled");
	}
};

function booksNext(carousel, button, enabled) {
	if (!enabled) {
		carousel.list.parents(".books-carousel").children(".jcarousel-next").addClass("jcarousel-next-disabled");
	} else {
		carousel.list.parents(".books-carousel").children(".jcarousel-next").removeClass("jcarousel-next-disabled");
	}
};

function validateForms() {


	// Заказ, персональные данные


	var validatorPersonal = $("#personalForm").bind("invalid-form.validate", function() {


	}).validate({
		focusInvalid: false,
		sendForm : false,
		rules: {
			personal_email: {
				email: true
			}

		},
		messages: {
			personal_name_1: "&mdash; Обязательное для заполнения поле",
			personal_hotel: "&mdash; Обязательное для заполнения поле",
			personal_contactperson: "&mdash; Обязательное для заполнения поле",
			personal_email: "&mdash; Введите правильный адрес"

		},
		errorPlacement: function(error, element) {
			// element.parents(".input-wrapper").addClass("input-wrapper-error");
			error.insertAfter(element);
		},
		unhighlight: function(element, errorClass, validClass) {
			// $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
			$(element).removeClass(errorClass);
			$(element).next("label.error").remove();
		},
		invalidHandler: function(form, validatorPersonal) {
			var errors = validatorPersonal.numberOfInvalids();
			if (errors) {

				validatorPersonal.errorList[0].element.focus();
			}
		}


	});


	var validatorFeedback = $("#feedbackForm").bind("invalid-form.validate", function() {


	}).validate({
		focusInvalid: false,
		sendForm : false,
		rules: {
			feedback_email: {
				email: true,
				required: true
			}

		},
		messages: {
			feedback_name: "&mdash; Обязательное для заполнения поле",
			feedback_city: "&mdash; Выберите правильную опцию",
			feedback_region: "&mdash; Выберите правильную опцию",
			feedback_topic: "&mdash; Обязательное для заполнения поле",
			feedback_message: "&mdash; Не введен текст сообщения",
			feedback_email: "&mdash; Введите правильный адрес"

		},
		errorPlacement: function(error, element) {
			// element.parents(".input-wrapper").addClass("input-wrapper-error");
			error.insertAfter(element);
		},
		unhighlight: function(element, errorClass, validClass) {
			// $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
			$(element).removeClass(errorClass);
			$(element).next("label.error").remove();
		},
		invalidHandler: function(form, validatorfeedback) {
		var errors = validatorfeedback.numberOfInvalids();
			if (errors) {

				validatorfeedback.errorList[0].element.focus();
			}
		}


	});

}

function pupMakeup(popup) {
	var popup = popup;
	var pupTop = $(window).scrollTop() + ($(window).height() - popup.outerHeight(true))/2;
	if (pupTop < 20) pupTop = 20;
	$(".tint").css("height",$("body").height()).css("width",$("body").width());
	if (!popup.hasClass("price-popup")) {
		popup.css("top",pupTop).css("left",($(window).width()-popup.outerWidth(true))/2 - 20);
	} else {
		popup.css("margin-top",$(window).scrollTop() - popup.parent().offset().top - popup.parent().outerHeight(true) + ($(window).height()-popup.outerHeight(true))/2);
	}

}

function openPopup(pupId) {
	var popup = $("#"+pupId);
	popup.show().addClass("popup-act").fadeTo(0,1);
	$("body").append("<div class='tint' />");


	if (!popup.children(".popup-shadow").length) {
		popup.append("<div class='popup-shadow' />");
	}



	popup.fadeIn(250);
	pupMakeup(popup);
	$(".tint").fadeIn(250);
	jQuery(document).keydown(function(e){
		if (e == null) { // ie
			keycode = event.keyCode;
		} else { // mozilla
			keycode = e.which;
		}



		if(keycode == 27){ // escape, close box
			closePopup()
		}



	});


	$(".tint").on("click", function () {
		closePopup()
	});


	$(".popup .close").on("click", function () {
		closePopup()
	});
}

function closePopup() {
	$(".tint").remove();
	$(".popup").hide();
}

function citySelector() {
  if ($(".city-selector").length) {
    var csPopup = $(".city-selector");
    var csItems = csPopup.find(".cs-item");
    var cityTrigger = $(".city-trigger");


    csItems.filter("[cityid="+ cityTrigger.attr("curcity") +"]").addClass("selected");

    cityTrigger.click(function() {
      $(this).toggleClass("city-trigger-act");

      csPopup.fadeToggle(150);

    });

    csItems.click(function() {
      var th = $(this);

      cityTrigger.html($(this).find(".city-name").html());

      $(".header .contacts-address .address-text").html($(this).find(".address-html").html())
      $(".header-phone .phone").html($(this).find(".city-phone").html())

      cityTrigger.removeClass("city-trigger-act");

      csPopup.fadeOut(150,function() {
        csItems.removeClass("selected");
        th.addClass("selected");
      });

    })

  }
}

function handleReviews() {
  if ($(".course-reviews").length) {

    if ($(".course-reviews").hasClass("reviews-wide")) {
      var cHeight = 126;
      var dHeight = 314;
    } else {
      var cHeight = 200;
      var dHeight = 332;
    }

    $(".course-reviews-item .text-cont").each(function() {
      if ($(this).height() > cHeight) {
        $(this).parents(".course-reviews-item").find(".expand-trigger span").show();
      }
    });

    $(".course-reviews .expand-trigger span").click(function() {
      if (!$(this).hasClass("expanded")) {
        $(this).parents(".course-reviews-item").addClass("review-expanded");
        $(this).addClass("expanded").html("Свернуть")
        $(this).parents(".descr").css({
          height: "auto",
          zIndex: 200
        });
        $(this).parents(".cont").find(".text").css({
          height: "auto"
        });
      } else {
        $(this).parents(".course-reviews-item").removeClass("review-expanded");
        $(this).removeClass("expanded").html("Развернуть")
        $(this).parents(".descr").css({
          height: dHeight,
          zIndex: ""
        });
        $(this).parents(".cont").find(".text").css({
          height: cHeight
        });
      }
    });

  }
}

(function( $ ) {
  $.fn.courseGallery = function() {

    $(this).each(function() {
      var galList = $(this);

      var galLinks = galList.children("a");

      var galId = galList.attr("rel");

      var $galPopup = $("<div id='"+galId+"' class='gallery-popup'>");

      $("body").append($galPopup);

      $galPopup.append('<div class="gallery-close"></div>');
      $galPopup.append('<div class="gallery"><div class="tn3 album"><ol></ol></div>');

      var $tn3Gallery = $galPopup.find(".gallery");
      var $tn3List = $galPopup.find("ol");

      galLinks.each(function() {
        $tn3List.append('<li><h4>'+$(this).find(".descr").html()+'</h4><div class="tn3 description"></div><a href="'+$(this).attr("hires")+'"><img src="'+$(this).children("img").attr("src")+'"/></a></li>');
      });

      var $courseGal = $tn3Gallery.tn3({
        responsive: false,
        imageClick:"fullscreen",
        image:{
          maxZoom:1.5,
          crop:true,
          clickEvent:"dblclick"
        },
        thumbnailer:{
          overMove: false
        }
      }).data('tn3');

      $courseGal.resize($(window).width(),$(window).height() - 200);

      $(window).resize(function() {
        $courseGal.resize($(window).width(),$(window).height() - 200);
      })

      $(".course-gallery a").click(function() {

        var $th = $(this);

        var galId = $(this).parents(".course-gallery").attr("rel");

        var gal = $("#"+galId);


        gal.css({
          left: 0,
          opacity:.1
        }).hide().show().animate({
          opacity:1
        },150);

        $courseGal.show($th.prevAll("a").length);

        return false;
      });

      $(".gallery-close").on("click",function() {
        $(".gallery-popup").fadeOut(150,function() {
          $(".gallery-popup").css("left",-20000);
        });
      });

      jQuery(document).keydown(function(e){
        if (e == null) { // ie
          keycode = event.keyCode;
        } else { // mozilla
          keycode = e.which;
        }

        if(keycode == 27){ // escape, close box
          $(".gallery-popup").fadeOut(150,function() {
            $(".gallery-popup").css("left",-20000);
          });
        }

      });


    });

  };
})( jQuery );

(function( $ ) {
  $.fn.courseProgram = function() {

    $(this).each(function() {

      var programCont = $(this);

      var $itemTtl = $(this).find("h3");

      $itemTtl.each(function() {
        $(this).addClass("cp-item-ttl");
        var $itemDescr = $(this).next("div").first();
        $itemDescr.hide().addClass("cp-item-descr");
        var num = parseInt($(this).prevAll("h3").length) + 1;
        $(this).html("<span>" + num + ". " + $(this).html() + "</span>");
        $(this).on("click",function() {
          $itemDescr.slideToggle(150);
          $(this).toggleClass("item-ttl-act");
        });
      });

    });

  };
})( jQuery );


$(document).ready(function() {

    var dateFormat = 'dd.mm.yy';
    $('.coupons-filter-input-date input').datepicker({
        dateFormat: dateFormat
    });

    $('body').on('click', '.coupons-item-window-close', function(e) {
        $('.coupons-item-window').removeClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.coupons-item-order').length == 0) {
            $('.coupons-item-window').removeClass('open');
        }
    });

    $('body').on('click', '.coupons-item-link', function(e) {
        var curWindow = $(this).parent().find('.coupons-item-window');
        if (curWindow.hasClass('open')) {
            curWindow.removeClass('open');
        } else {
            $('.coupons-item-window').removeClass('open');
            curWindow.addClass('open');
        }
        e.preventDefault();
    });

    $('.coupons-item-window-form form').each(function() {
        $(this).validate({
			rules: {
				comment: 'required'
			},
			messages: {
				comment: 'Для бронирования необходимо указать комментарий'
			}
        });
    });

    $('body').on('click', '.order-course-info-coupon-input-add', function(e) {
        var curValue = $('.order-course-info-coupon-input input').val();
        //  тут можно сделать ajax запрос
        if (curValue != '0') {
            $('.order-course-info-coupons-error').hide();
            $('.order-course-info-coupon-item').remove();
            $('.order-course-info-coupons').append('<div class="order-course-info-coupon-item">' + curValue + '<a href="#"></a></div>');
            $('.order-course-info-coupons-success').show();
            $('.order-course-info-coupons-success span').html('10');
        } else {
            $('.order-course-info-coupons-error').show();
            $('.order-course-info-coupons-success').hide();
        }
        e.preventDefault();
    });

    $('body').on('click', '.order-course-info-coupon-item a', function(e) {
        $(this).parent().remove();
        $('.order-course-info-coupons-success').hide();
        $('.order-course-info-coupon-item').remove();
        e.preventDefault();
    });

});

$(document).ready(function() {
    $('.page-text table, .courses-list, .course-schedule, .events-table-3').each(function() {
        var curTable = $(this);
        curTable.addClass('table-mobile');
        curTable.find('tr.first th').each(function() {
            var curTH = $(this);
            var curIndex = curTable.find('tr.first th').index(curTH);
            curTable.find('tr:not(.first)').each(function() {
                $(this).find('td').eq(curIndex).prepend('<div class="td-mobile-title">' + curTH.html() + '</div>');
            });
        });
    });

    $('.coupons-list').each(function() {
        var curTable = $(this);
        curTable.find('.coupons-list-header').each(function() {
            var curTH = $(this);
            var curIndex = curTable.find('.coupons-list-header').index(curTH);
            curTable.find('.coupons-item').each(function() {
                $(this).find('.coupons-item-col').eq(curIndex).prepend('<div class="td-mobile-title">' + curTH.html() + '</div>');
            });
        });
    });

    $('.header-top .center-wrapper').prepend('<a href="#" class="mobile-menu-link"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 34 34" id="mobile-menu-link"><path d="M4.25 18.5H29.75" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /><path d="M4.25 8.5H29.75" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /><path d="M4.25 28.5H29.75" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 23" id="mobile-menu-close"><path d="M2.98438 2.48438L21.0156 20.5156" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /><path d="M21.0156 2.48438L2.9844 20.5156" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg></a>');
    $('.header-top .center-wrapper').append('<a href="#" class="mobile-search-link"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26"><path d="M11.5227 19.7955C16.0916 19.7955 19.7955 16.0916 19.7955 11.5227C19.7955 6.95383 16.0916 3.25 11.5227 3.25C6.95383 3.25 3.25 6.95383 3.25 11.5227C3.25 16.0916 6.95383 19.7955 11.5227 19.7955Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22.7647 22.7647L18.0375 18.0375" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 23" id="mobile-menu-close"><path d="M2.98438 2.48438L21.0156 20.5156" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /><path d="M21.0156 2.48438L2.9844 20.5156" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg></a>');
    if ($('.r-col').length == 1 && $('.mainpage-upcoming-events').length == 1 && $('.mainpage-upcoming-events').parents().filter('.courses-content').length == 0) {
        var cloneRCol = $('.r-col').clone(true);
        $('.r-col').addClass('hidden-mobile-add');
        $('.mainpage-upcoming-events').after('<div class="mobile-add-new"></div>');
        $('.mobile-add-new').append('<div class="r-col-title-mobile"><a href="#">Дополнительная информация</a></div>');
        $('.mobile-add-new').append(cloneRCol);
    } else {
        $('.r-col').before('<div class="r-col-title-mobile"><a href="#">Дополнительная информация</a></div>');
    }

    $('.mobile-menu-link').click(function(e) {
        $('.calendar-day-viewed .calendar-day-view-top a').trigger('click');
        if ($('html').hasClass('mobile-menu-open')) {
            $('html').removeClass('mobile-menu-open');
            $('.wrapper').css('margin-top', 0);
            $(window).scrollTop($('html').data('scrollTop'));
        } else {
            var curScroll = $(window).scrollTop();
            $('html').addClass('mobile-menu-open');
            $('html').data('scrollTop', curScroll);
            $('.wrapper').css('margin-top', -curScroll);
        }
        e.preventDefault();
    });

    $('.mobile-search-link').click(function(e) {
        $('.calendar-day-viewed .calendar-day-view-top a').trigger('click');
        if ($('html').hasClass('mobile-search-open')) {
            $('html').removeClass('mobile-search-open');
            $('.wrapper').css('margin-top', 0);
            $(window).scrollTop($('html').data('scrollTop'));
        } else {
            var curScroll = $(window).scrollTop();
            $('html').addClass('mobile-search-open');
            $('html').data('scrollTop', curScroll);
            $('.wrapper').css('margin-top', -curScroll);
        }
        e.preventDefault();
    });

    $('.header').append('<div class="header-mobile-contacts">' + $('.header-phone').html() + '</div>');
    $('.header-mobile-contacts').prepend('<div class="header-mobile-social">' + $('.footer-sn-links').html() + '</div>');
    $('.header-mobile-contacts .phone').prepend('<div class="header-mobile-contacts-mobile-title">Телефон</div>');
    $('.header-mobile-contacts .contacts-address').prepend('<div class="header-mobile-contacts-mobile-title">Адрес</div>');
    $('.header-mobile-contacts .contacts-address strong').before('<div class="header-mobile-contacts-mobile-title">Режим работы</div>');

    $('.tabbed-content').each(function() {
        var curTabbed = $(this);
        curTabbed.find('> .tabs-content > .tab-content').each(function() {
            var curTabContent = $(this);
            var curIndex = curTabbed.find('> .tabs-content > .tab-content').index(curTabContent);
            curTabContent.prepend('<div class="tab-content-mobile-title">' + curTabbed.find('> .tabs > .tab').eq(curIndex).html().replace('<br>', ' ') + '</div>');
        });
    });

    $('.tab-content-mobile-title').click(function() {
        $(this).parent().toggleClass('open');
    });

    $('.main-menu span.arr').click(function() {
        $(this).parent().parent().toggleClass('open');
        $('.main-menu').toggleClass('open');
    });

    $('.r-col-title-mobile a').click(function(e) {
        $('.r-col-title-mobile').toggleClass('open');
        $('.r-col').toggleClass('visible');
        e.preventDefault();
    });

    $('.footer h5').click(function() {
        $(this).parent().toggleClass('open');
    });

    $('body').append('<a href="#" class="up-link"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 15L12 9L6 15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg></a>');

    $('.up-link').click(function(e) {
        $('html, body').animate({'scrollTop': 0});
        e.preventDefault();
    });

    $('.tab-content').eq(0).addClass('open');

    $('.related-events h3').click(function() {
        $(this).parent().toggleClass('open');
    });

    $('body').on('click', '.calendar-day-active', function(e) {
        windowOpenHTML('<div class="window-calendar-day">' + $(this).find('.calendar-day-view-middle-container').html() + '</div>');
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close', function(e) {
        windowClose();
        e.preventDefault();
    });

});

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();
    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    var windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

    if (windowScroll > 0) {
        $('.header').addClass('fixed');
    } else {
        $('.header').removeClass('fixed');
    }

    if ($('.up-link').length == 1) {
        if (windowScroll > windowHeight) {
            $('.up-link').addClass('visible');
        } else {
            $('.up-link').removeClass('visible');
        }

        if (windowScroll + windowHeight > $('.footer').offset().top) {
            $('.up-link').css({'margin-bottom': (windowScroll + windowHeight) - $('.footer').offset().top});
        } else {
            $('.up-link').css({'margin-bottom': 0});
        }
    }
});

function windowOpenHTML(html) {
    if ($('.window').length == 0) {
        var curPadding = $('.top-wrap').width();
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-open');
        curPadding = $('.top-wrap').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        $('body').append('<div class="window"></div>')

        $('.top-wrap').css({'top': -curScroll});
        $('.top-wrap').data('curScroll', curScroll);
    }

    if ($('.window-container').length == 0) {
        $('.window').html('<div class="window-container">' + html + '<a href="#" class="window-close"></a></div>');
    } else {
        $('.window-container').html(html + '<a href="#" class="window-close"></a>');
    }
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
        $('.top-wrap').css({'top': 0});
        $(window).scrollTop($('.top-wrap').data('curScroll'));
    }
}