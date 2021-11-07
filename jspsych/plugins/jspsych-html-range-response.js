/**
 * jspsych-html-range-response
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['html-range-response'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'html-range-response',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The HTML string to be displayed'
      },
      min: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Min range',
        default: 0,
        description: 'Sets the minimum value of the range.'
      },
      max: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Max range',
        default: 100,
        description: 'Sets the maximum value of the range',
      },
      range_start: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'range starting value',
        default: 50,
        description: 'Sets the starting value of the range',
      },
      step: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Step',
        default: 1,
        description: 'Sets the step of the range'
      },
      range_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name:'range width',
        default: null,
        description: 'Width of the range in pixels.'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        array: false,
        description: 'Label of the button to advance.'
      },
      require_movement: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Require movement',
        default: false,
        description: 'If true, the participant will have to move the range before continuing.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show the trial.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when user makes a response.'
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    // half of the thumb width value from jspsych.css, used to adjust the label positions
    var half_thumb_width = 7.5; 

    var html = '<div id="jspsych-html-range-response-wrapper" style="margin: 100px 0px;">';
    html += '<div id="jspsych-html-range-response-stimulus">' + trial.stimulus + '</div>';
    html += '<div class="jspsych-html-range-response-container" style="position:relative; margin: 0 auto 3em auto; ';
    if(trial.range_width !== null){
      html += 'width:'+trial.range_width+'px;';
    } else {
      html += 'width:auto;';
    }
    html += '">';
    html += '<span>'+trial.min+'</span>'
    html += '<input type="range" onchange="addRangeValue()" class="jspsych-range" value="'+trial.range_start+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" id="jspsych-html-range-response-response" style="width:'+(trial.range_width-70)+'px;"></input>';
    html += '<span>'+trial.max+'</span>'
    html += '<input id="range-value" type="number" min="0" max="'+trial.max+'" required="true" style="font-size:20px;width:4em;" onkeyup="if(value>'+trial.max+')value='+trial.max+'setRangeValue()">'
    html += '</div>';
    html += '<button id="jspsych-html-range-response-next" class="jspsych-btn" '+ (trial.require_movement ? "disabled" : "") + '>'+trial.button_label+'</button>';
    html += '</div>';

    // add submit button

    display_element.innerHTML = html;

    var response = {
      rt: null,
      response: null
    };

    if(trial.require_movement){
      display_element.querySelector('#jspsych-html-range-response-response').addEventListener('click', function(){
        display_element.querySelector('#jspsych-html-range-response-next').disabled = false;
      });
    }

    display_element.querySelector('#jspsych-html-range-response-next').addEventListener('click', function() {
      // measure response time
      var endTime = performance.now();
      response.rt = endTime - startTime;
      response.response = display_element.querySelector('#jspsych-html-range-response-response').valueAsNumber;

      if(trial.response_ends_trial){
        end_trial();
      } else {
        display_element.querySelector('#jspsych-html-range-response-next').disabled = true;
      }

    });

    function end_trial(){ 

      jsPsych.pluginAPI.clearAllTimeouts();

      // save data
      var trialdata = {
        rt: response.rt,
        stimulus: trial.stimulus,
        range_start: trial.range_start,
        response: response.response
      };

      display_element.innerHTML = '';

      // next trial
      jsPsych.finishTrial(trialdata);
    }

    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-html-range-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

    var startTime = performance.now();
  };

  return plugin;
})();
