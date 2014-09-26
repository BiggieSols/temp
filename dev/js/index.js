require.config({
  map: {
    '*': {
      'underscore': 'js/lodash',
      'jquery': 'js/jquery',
      'lodash': 'js/lodash'
    }
  }
});

define(function (require) {

  return {
    ready: function (components) {
      $(window).resize(function() {
        MR.resize();
      });
    },
    render: function (components) {

      var models = components['poll-content'].poll.collection.models;
      var leftPct = models[0].get('pct');
      var rightPct = models[1].get('pct');

      var updateLeft = function(pct) {
        var $pctLeft = $('.percent-left');
        var $progressLeft = $('.progress-percent.left');
        $pctLeft.text(pct);
        $progressLeft.width(pct);
        if (pct < 50) {
          $progressLeft.addClass('is-under-50');
        }
      };
      var updateRight = function (pct) {
        var $pctRight = $('.percent-right');
        $pctRight.text(pct);
      };

      var isIE = function () { 
        return ((navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null))); 
        //return $('html').hasClass('lt-ie10');
      };

      models[0].on('change:pct', function(e) {
        updateLeft(e.get('pct') + '%');
      });

      models[1].on('change:pct', function(e) {
        updateRight(e.get('pct') + '%');
      });

      updateLeft( (leftPct !== undefined && leftPct !== null ? leftPct : 50) + '%');
      updateRight( (rightPct !== undefined && rightPct !== null ? rightPct : 50) + '%');


      // give me facebook events!
      $('.tow-vote-btns a.facebook').attr('data-allow-propagation', "true");

      $('#poll-content').on('click', '.tow-vote-btns', function (e) {
        $('#poll-content').attr('data-selected', $(this).data('option-label'));
        // IE + Twitter = hearts
        if(isIE() && ($(e.target).hasClass('twitter') || $(e.target).parent('.twitter').length)){
          _.delay( function() {
            MR.ENV.instance.trigger('state:post-vote');
          }, 300);
        }
      });

      MR.ENV.instance.on("#poll-content:post-vote-rendered", function (e) {
        var $voteMssg = $(".vote-mssg");
        var userSelect = $('#poll-content').data('selected');
        $('.pcmax-tow').addClass('is-after-vote');
        $('.tow-option[data-option-label="' + userSelect + '"]').parent('.results-item').addClass('is-selected');
        $voteMssg.fadeOut();
      });

      MR.ENV.pipe('#template:state:pre-vote', '#poll-content:state:pre-vote');
      MR.ENV.pipe('#template:state:post-vote', '#poll-content:state:post-vote');

      // Some mobile stuff
      if($('html').hasClass('touch')) {
        $('.tow-option-btn-wrap').on('click', function (e) {
          $('.tow-option-btn-wrap').removeClass('is-toggled');
          $(this).addClass('is-toggled');
        });
      }
    }
  };
});
