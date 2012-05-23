/**
 * jQuery simple Slider plugin
 *
 * Copyright (c) 2012 miraoto
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */


/**
 * slider plugin
 *
 * @name $.simpleSilider();
 * @cat Plugins/Preload
 * @author miraoto
 *
 * @example $.simpleSilider();
 * @desc default setting
 */
(function($) {
  $.simpleSilider =function(element, options) {
    var defaults = {
          targetId  : 'slide',
          prevClass : 'prev',
          nextClass : 'next',
          easing    : 'linear',
          count     : 0,
          speed     : 500,
          slideUl   : '',
          slideList : '',
          mBottom   : '',
          maxCount  : ''
        }

    var plugin = this;
        plugin.settings = {}

    var $element = $(element),
        element = element;

    plugin.init = function() {
      plugin.settings    = $.extend({}, defaults, options);
      defaults.slideUl   = $('#' + defaults.targetId + ' > ul');
      defaults.slideList = $('li', defaults.slideUl);
      defaults.mBottom   = parseInt(defaults.slideList.css('margin-bottom'));
      defaults.maxCount  = defaults.slideList.length-2;
      defaults.slideAreaHeight     = parseInt($('#' + defaults.targetId).get(0).offsetHeight);
      defaults.slideContentsHeight = parseInt(defaults.slideUl.get(0).offsetHeight);

      $("." + defaults.prevClass).click(function(){
        if (defaults.count <= 0) return false;
        previewAction();
        return false;
      });
      $("." + defaults.nextClass).click(function(){
        if (defaults.count >= defaults.maxCount) return false;
        nextAction();
        return false;
      });
      sliderCallback();
    }

    /**
     * preview process action
     *
     */
    var previewAction = function() {
      defaults.count--;
      defaults.slideUl.animate({
        marginTop : parseInt(defaults.slideUl.css('margin-top'))+defaults.slideList.eq(defaults.count).get(0).offsetHeight+defaults.mBottom+'px'
      },defaults.speed,defaults.easing);
      sliderCallback();
    }

    /**
     * next process action
     *
     */
    var nextAction = function() {
      defaults.slideUl.animate({
        marginTop : parseInt(defaults.slideUl.css('margin-top'))-defaults.slideList.eq(defaults.count).get(0).offsetHeight-defaults.mBottom+'px'
      },defaults.speed,defaults.easing);
      defaults.count++;
      sliderCallback();
    }

    /**
     * slider callback method
     *
     * @param type (action type 'prev' or 'back')
     */
    var sliderCallback = function() {
    }
    plugin.init();
 }
 $.fn.simpleSilider = function(options) {
    return this.each(function() {
       if (undefined == $(this).data('simpleSilider')) {
          var plugin = new $.simpleSilider(this, options);
          $(this).data('simpleSilider', plugin);
       }
    });
 }
})(jQuery);