/**
 * jspsych-test-multi-select
 * a jspsych plugin for multiple choice test questions
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['test-multi-select'] = (function() {
  var plugin = {};
  mt = 0;

  plugin.info = {
    name: 'test-multi-select',
    description: '',
    parameters: {
      questions: {
        type: jsPsych.plugins.parameterType.COMPLEX,
        array: true,
        pretty_name: 'Questions',
        nested: {
          prompt: {
            type: jsPsych.plugins.parameterType.IMAGE,
            pretty_name: 'Prompt',
            default: undefined,
            description: 'The strings that will be associated with a group of options.'
          },
          options: {
            type: jsPsych.plugins.parameterType.IMAGE,
            pretty_name: 'Options',
            array: true,
            default: undefined,
            description: 'Displays options for an individual question.'
          },
          horizontal: {
            type: jsPsych.plugins.parameterType.BOOL,
            pretty_name: 'Horizontal',
            default: false,
            description: 'If true, then questions are centered and options are displayed horizontally.'
          },
          rof:{
            type: jsPsych.plugins.parameterType.STRING,
            pretty_name: 'RightOrfalse',
            array: false,
            default: undefined,
            description: '问题的正确答案序号.'
          },
          required: {
            type: jsPsych.plugins.parameterType.BOOL,
            pretty_name: 'Required',
            default: false,
            description: 'Subject will be required to pick at least one option for this question.'
          },
          name: {
            type: jsPsych.plugins.parameterType.STRING,
            pretty_name: 'Question Name',
            default: '',
            description: 'Controls the name of data values associated with this question'
          }
        }
      },
      time_limit:{
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'time limit',
        default: 0,
        description: 'If not 0, the time limit will be the minutes of you put'
      },
      randomize_question_order: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Randomize Question Order',
        default: false,
        description: 'If true, the order of the questions will be randomized'
      },
      preamble: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Preamble',
        default: null,
        description: 'HTML formatted string to display at the top of the page above all the questions.'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        description: 'Label of the button.'
      },
      required_message: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Required message',
        default: 'You must choose at least one response for this question',
        description: 'Message that will be displayed if required question is not answered.'
      }
    }
  }
  plugin.trial = function(display_element, trial) {
    var plugin_id_name = "jspsych-test-multi-select";
    var plugin_id_selector = '#' + plugin_id_name;
    var _join = function( /*args*/ ) {
      var arr = Array.prototype.slice.call(arguments, _join.length);
      return arr.join(separator = '-');
    }

    // inject CSS for trial
    var cssstr = ".jspsych-test-multi-select-question { margin-top: 2em; margin-bottom: 2em; text-align: center; }"+
      ".jspsych-test-multi-select-text span.required {color: darkred;}"+
      ".jspsych-test-multi-select-horizontal .jspsych-test-multi-select-text {  text-align: center;}"+
      ".jspsych-test-multi-select-option { line-height: 2; }"+
      "#jspsych-test-multi-select-form { text-align:center; }"+
      ".jspsych-btn { padding: 6px 12px;font-size: 14px;cursor: pointer;line-height: 1.4;text-align: center;white-space: nowrap;border: 1px solid transparent;border-radius: 4px;color: #333;background-color: #fff;border-color: #ccc; }"+
      ".jspsych-test-multi-select-horizontal .jspsych-test-multi-select-option {  display: inline-block;  margin-left: 1em;  margin-right: 1em;  vertical-align: top;}"+
      "label.jspsych-test-multi-select-text input[type='checkbox'] {margin-right: 1em;}"
    display_element.innerHTML = '<style id="jspsych-test-multi-select-css">' + cssstr + '</style>';
    if (trial.time_limit != 0) {
      display_element.innerHTML += '<div id="timelimit" style="text-align:center;font-size:15px;"></div>';
      mt = trial.time_limit*60;
      timelimit = setInterval("countdown()",1000);
    }
    // form element
    var trial_form_id = _join(plugin_id_name, "form");
    display_element.innerHTML += '<form id="'+trial_form_id+'"></form>';
    var trial_form = display_element.querySelector("#" + trial_form_id);
    trial_form.setAttribute("index",trial.questions.length)
    // show preamble text
    var preamble_id_name = _join(plugin_id_name, 'preamble');
    if(trial.preamble !== null){
      trial_form.innerHTML += '<div id="'+preamble_id_name+'" class="'+preamble_id_name+'">'+trial.preamble+'</div>';
    }
    // generate question order. this is randomized here as opposed to randomizing the order of trial.questions
    // so that the data are always associated with the same question regardless of order
    var question_order = [];
    for(var i=0; i<trial.questions.length; i++){
      question_order.push(i);
    }

    if(trial.randomize_question_order){
      question_order = jsPsych.randomization.shuffle(question_order);
    }
    // add multiple-select questions
    for (var i = 0; i < trial.questions.length; i++) {
      var question = trial.questions[question_order[i]];
      var question_id = question_order[i];
      // create question container
      var question_classes = [_join(plugin_id_name, 'question')];
      if (question.horizontal) {
        question_classes.push(_join(plugin_id_name, 'horizontal'));
      }
      //所有题目在一个页面但是同时只能一个可见。
      if (i != 0) {
        trial_form.innerHTML += '<div id="'+_join(plugin_id_name, question_id)+'" data-name="'+question.name+'" class="hidden '+question_classes.join(' ')+'" rof="'+question.rof+'"></div>';
      }else
        trial_form.innerHTML += '<div id="'+_join(plugin_id_name, question_id)+'" data-name="'+question.name+'" class="'+question_classes.join(' ')+'" rof="'+question.rof+'"></div>';
      var question_selector = _join(plugin_id_selector, question_id);

      // add question text
      display_element.querySelector(question_selector).innerHTML += '<p>第'+(i+1).toString()+'题</p><img id="test-question" class="' + plugin_id_name +'-img test-multi-select"'+'src="'+ question.prompt+'" style="padding-right:20px;border-right:black 3px solid;">' + '</img>';

      // create option check boxes
      for (var j = 0; j < question.options.length; j++) {
        var option_id_name = _join(plugin_id_name, "option", question_id, j);

        // add check box container
        display_element.querySelector(question_selector).innerHTML += '<div id="'+option_id_name+'" onclick="getElementById(\''+option_id_name+'\').children[1].click()" class="'+_join(plugin_id_name, 'option')+'"></div>';

        // add label and question text
        var form = document.getElementById(option_id_name)
        var input_name = _join(plugin_id_name, 'response', question_id);
        var input_id = _join(plugin_id_name, 'response', question_id, j);
        var label = document.createElement('label');
        label.setAttribute('class', plugin_id_name+'-text');
        label.setAttribute('for', input_id)
        var img = document.createElement('img')
        img.setAttribute('src',question.options[j])
        img.setAttribute('style','display:block;height:200px;')
        // create  checkboxes
        var input = document.createElement('input');
        input.setAttribute('type', "checkbox");
        input.setAttribute('name', input_name);
        input.setAttribute('id', input_id);
        input.setAttribute('value', j)
        form.appendChild(label)
        form.insertBefore(img, label)
        form.insertBefore(input, label)
      }
    }
    // add submit button
    trial_form.innerHTML += '<div class="fail-message"></div>'
    
    // add next nad previous page button
    trial_form.innerHTML += '<input type="button" onclick="prequestion()"  value="上一题" class="jspsych-btn hidden" index="" id="preq">';
    trial_form.innerHTML += '<button id="'+plugin_id_name+'-next" class="'+plugin_id_name+' jspsych-btn hidden">'+trial.button_label+'</button>';
    trial_form.innerHTML += '<input type="button" onclick="nextquestion()" value="下一题" class="jspsych-btn" index="0" id="nextq">';

    // validation check on the data first for custom validation handling
    // then submit the form
    display_element.querySelector('#jspsych-test-multi-select-next').addEventListener('click', function(){
      for(var i=0; i<trial.questions.length; i++){
        if(trial.questions[i].required){
          if(display_element.querySelector('#jspsych-test-multi-select-'+i+' input:checked') == null){
            display_element.querySelector('#jspsych-test-multi-select-'+i+' input').setCustomValidity(trial.required_message);
          } else {
            display_element.querySelector('#jspsych-test-multi-select-'+i+' input').setCustomValidity('');
          }
        }
      }
      trial_form.reportValidity();
    })
    trial_form.addEventListener('submit', function(event) {
      event.preventDefault();
      // measure response time
      var endTime = performance.now();
      var response_time = endTime - startTime;
      clearInterval(timelimit);
      // create object to hold responses
      var question_data = {};
      var has_response = [];
      var correct = 0
      for(var index=0; index<trial.questions.length; index++){
        var match = display_element.querySelector('#jspsych-test-multi-select-'+index);
        var ra = match.getAttribute("rof")
        var val = [];
        var thisriht = 0;
        var inputboxes = match.querySelectorAll("input[type=checkbox]:checked")
        for(var j=0; j<inputboxes.length; j++){
          currentChecked = inputboxes[j];
          val.push(currentChecked.value)
          if(ra.indexOf(currentChecked.value)>=0){
          thisriht += 1
          }
          
        }
        correct += thisriht
        var id = 'Q' + index
        var obje = {};
        var name = id;
        if(match.attributes['data-name'].value !== ''){
          name = match.attributes['data-name'].value;
        }
        obje[name] = val;
        Object.assign(question_data, obje);
        if(val.length == 0){ has_response.push(false); } else { has_response.push(true); }
      }

      // save data
      var trial_data = {
        "RightNumber": correct,
      };
      display_element.innerHTML = '';

      // next trial
      jsPsych.finishTrial(trial_data);
      
    });

    var startTime = performance.now();
  };

  return plugin;
})();
