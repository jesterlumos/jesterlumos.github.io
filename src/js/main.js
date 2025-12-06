/* IMPORT */
/* comment -- 
this fontawesome kit is what allows the icons to be used. you can visit fontawesome.com to look at other free icons you might want to use anywhere else in this template. 

this fontawesome kit link is my own - i recommend signing up to fontawesome.com and generating your own kit so you can manage your own icons. fontawesome kits also allow for you to upload your own custom icons! replace the link below with your own and continue to use the icons as normal
*/

importScripts('https://kit.fontawesome.com/2d3e659fe4.js');

/* change localization template */

/* comment --
the localization template lists the defaults used for the settings, saves, restart, error labels etc.

you are able to change the labels to whatever you want like below! e.g. instead of 'Save to Disk' (the default) i have changed it to 'Download Save'.

if you search strings localization in the Sugarcube 2 Documentation, it will lead you to an explanation about localization and the template on github where all the labels are listed. you can take any of the labels, copy and paste them into your javascript file (here!), and change the labels.
*/

l10nStrings.savesLabelExport = 'Download Save\u2026';
l10nStrings.savesLabelImport = 'Upload Save\u2026';

/* settings */

Setting.addHeader("Change Settings");

/* font type */

var settingFontNames = ["Serif", "Sans-Serif", "Open Dyslexic"];
var settingFontHandler = function () {
  var $html = $("html");
  
  $html.removeClass("eb-garamond-font rubik-font open-dyslexic-font");
  
  switch (settings.font) {
    case "Serif":
      $html.addClass("eb-garamond-font");
       break;
    case "Sans-Serif":
      $html.addClass("rubik-font");
      break;
    case "Open Dyslexic":
      $html.addClass("open-dyslexic-font");
      break;
  }
};

Setting.addList("font", {
  label    : "Change font style.",
  list     :settingFontNames,
  onInit   :settingFontHandler,
  onChange :settingFontHandler
});

/* font size */

var settingFontSizeNames = ["Small", "Medium", "Large"];
var settingFontSizeHandler = function () {
  var $html = $("html");
  
  $html.removeClass("fontsize-medium fontsize-large");
  
  switch (settings.fontsize) {
    case "Medium":
      $html.addClass("fontsize-medium");
      break;
    case "Large":
      $html.addClass("fontsize-large");
      break;
  }
};

Setting.addList("fontsize", {
  label    : "Change font size.",
  list     :settingFontSizeNames,
  onInit   :settingFontSizeHandler,
  onChange :settingFontSizeHandler
});

/* line height */

var settingLineHeight = ["1.75", "2", "2.25"];
var settingLineHeightHandler = function () {
	var $html = $("html");

	$html.removeClass("lineheight-2 lineheight-2-25");

	switch (settings.lineheight) {
		case "2":
			$html.addClass("lineheight-2");
			break;
		case "2.25":
			$html.addClass("lineheight-2-25");
			break;
	}
};

Setting.addList("lineheight", {
  label 	: "Change line height.",
  list		:settingLineHeight,
  onInit	:settingLineHeightHandler,
  onChange	:settingLineHeightHandler 
});

/* colour schemes */

var settingThemeNames = ["Dark", "Light"];
var settingThemeHandler = function () {
	var $html = $("html");

	$html.removeClass("light-theme");

	switch (settings.theme) {
      case "Light":
		$html.addClass("light-theme");
		break;
	}
};
Setting.addList("theme", {
	label    : "Choose a theme.",
	list     : settingThemeNames,
	onInit   : settingThemeHandler,
	onChange : settingThemeHandler
});

/* fullscreen */

var settingFullscreenHandler = function () {
	if (settings.fullscreen) {
		Fullscreen.request();
	}
	else {
		Fullscreen.exit();
	}
};
Setting.addToggle("fullscreen", {
  label    : "Toggle fullscreen.",
  desc     : "For desktop or laptop users only.",
  default  : false,
  onInit   : settingFullscreenHandler,
  onChange : settingFullscreenHandler
});

/* autosave */

Setting.addToggle("autoname", {
    label       : "Autoname Saves",
    desc        : "Automatically names save files.",
    default     : true,
});

Config.saves.autosave = true;
Config.saves.isAllowed = function () {
	if (tags().includes('noreturn')) {
		return false;
	}
	if (tags().includes('nosave')) {
		return false;
	}
	return true;
};

/* autoname saves */

Config.saves.descriptions = function (saveType) {
    switch (saveType) {
        case Save.Type.Auto: {
            return "Autosave: " + (State.getVar("$name") ? State.getVar("$name") : '???') + " - Puma Portfolio";
            break;
        }
        default: {
            if (settings.autoname) {
                return (State.getVar("$name") ? State.getVar("$name") : '???') + " - Puma Portfolio";
            }
            else {
                return prompt("Enter Save Name:", passage());
            }
        }
    }
};


/* notifications */

Setting.addToggle("notifs", {
  	label : "Toggle notifications.",
  	desc  : "For Autosaving and other prompts.",
  	default : true,
});

/* autoskip animations */
Setting.addToggle("autoskip", {
  	label : "Automatically skip animations.",
  	desc  : "Skip all animations after the first view.",
  	default : true,
});

/* indicators */

var settingIndicatorHandler = function () {
	if (settings.indicator) {
		$("html").removeClass("indicator");
	}
	else {
		$("html").addClass("indicator");
	}
};
Setting.addToggle("indicator", {
	label: "Toggle choice indicators.",
  	desc : 'For <i class="fa-solid fa-heart" alt="saves"></i> suggested choices and <i class="fa-solid fa-star" alt="saves"></i> significant achievements.',
	default: true,
	onInit: settingIndicatorHandler,
	onChange: settingIndicatorHandler
});

/* passage transition */

var settingTransitionHandler = function () {
	if (settings.transition) {
		$("html").removeClass("transition");
	}
	else {
		$("html").addClass("transition");
	}
};
Setting.addToggle("transition", {
	label    : "Toggle passage fade transition.",
  	desc     : "For transitions between passages.",
	default  : true,
	onInit   : settingTransitionHandler,
	onChange : settingTransitionHandler
});

/* ChapelR macros */
/* continue */

// continue.min.js, for SugarCube 2, by Chapel
// v1.0.1, 2022-07-21, 3bdbdfbe5ae47a46e4f4e52766d78701939ae9a6
;!function(){"use strict";var n=["a",":button",'*[role="button"]',".continue-macro-ignore","#ui-bar","#ui-dialog"],t=0;function o(){$(document).on("click.continue-macro keyup.continue-macro",n.join(", "),(function(n){n.stopPropagation()}))}function e(){if(State.length>0)return!1;var t=[].slice.call(arguments).flatten();return n=n.concat(t),!0}function c(n,o){var e=function(){var n="."+Date.now().toString(36)+"-"+t;return t++,n}();if(o&&"function"==typeof o){var c="click.continue-macro"+e;n&&(c=c+" keyup.continue-macro"+e),$(document).one(c,(function(){o.call(),$(document).off(e)}))}}prehistory["%%continue-expiration"]=function(){t=0},$(document).one(":passagerender",(function(){o()})),Macro.add("ignore",{handler:function(){if(!e(this.args))return this.error("the <<ignore>> macro should only be run from StoryInit or equivalent.")}}),Macro.add("cont",{tags:null,handler:function(){var n,t=this.args.includes("append"),o=this.args.includesAny("key","keypress","press","button"),e=this.payload[0].contents;t&&(n=$(document.createElement("span")).addClass("macro-"+this.name).appendTo(this.output)),c(o,this.createShadowWrapper((function(){t&&n&&n instanceof $?n.wiki(e):$.wiki(e)})))}}),setup.cont=c,setup.cont.ignore=e,setup.cont.reset=function(){var t=[].slice.call(arguments).flatten();n=n.concat(t),$(document).off(".continue-macro"),o()},window.cont=window.cont||setup.cont}();
// end continue.min.js

/* fade-in fade-out */

// fading-macro-set.min.js, for SugarCube 2, by Chapel
// v1.1.0, 2022-07-21, 3bdbdfbe5ae47a46e4f4e52766d78701939ae9a6
;Macro.add("fadein",{tags:null,handler:function(){var t,a,s=$(document.createElement("span")),e=this.payload[0].contents;if(0===this.args.length)return this.error("no arguments given");t=Util.fromCssTime(this.args[0]),a=this.args.length>1?Util.fromCssTime(this.args[1]):0,s.wiki(e).addClass("macro-"+this.name).appendTo(this.output).hide().delay(a).fadeIn(t)}}),Macro.add("fadeout",{tags:null,handler:function(){var t,a,s=$(document.createElement("span")),e=this.payload[0].contents;if(0===this.args.length)return this.error("no arguments given");t=Util.fromCssTime(this.args[0]),a=this.args.length>1?Util.fromCssTime(this.args[1]):0,s.wiki(e).addClass("macro-"+this.name).appendTo(this.output).delay(a).fadeOut(t)}});
// end fading-macro-set.min.js

/* notify */

// notify.min.js, for SugarCube 2, by Chapel
// v1.1.1, 2022-07-21, 3bdbdfbe5ae47a46e4f4e52766d78701939ae9a6
;!function(){var s=/\d+m?s$/;function e(s,e,t){"string"==typeof s&&("number"!=typeof e&&(e=!1),$(document).trigger({type:":notify",message:s,delay:e,class:t||""}))}$(document.body).append("<div id='notify'></div>"),$(document).on(":notify",(function(s){s.message&&"string"==typeof s.message&&(s.message.trim(),s.class?"string"==typeof s.class?s.class="open macro-notify "+s.class:Array.isArray(s.class)?s.class="open macro-notify "+s.class.join(" "):s.class="open macro-notify":s.class="open macro-notify",s.delay?("number"!=typeof s.delay&&(s.delay=Number(s.delay)),Number.isNaN(s.delay)&&(s.delay=2e3)):s.delay=2e3,$("#notify").empty().wiki(s.message).addClass(s.class),setTimeout((function(){$("#notify").removeClass()}),s.delay))})),Macro.add("notify",{tags:null,handler:function(){var t=this.payload[0].contents,a=!1,n=!1;if(this.args.length>0){var i=s.test(this.args[0]);"number"==typeof this.args[0]||i?(a=i?Util.fromCssTime(this.args[0]):this.args[0],n=this.args.length>1&&this.args.slice(1).flatten()):n=this.args.flatten().join(" ")}e(t,a,n)}}),setup.notify=e}();
// end notify.min.js

