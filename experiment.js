/**
 * Author:
 * Bao H.-W.-S. (https://psychbruce.github.io)
 */


/* Global Variables */

const btn_html_timer =
    `<style onload="tid=setInterval(timer, 1000)"></style>
     <button onclick="clearInterval(tid)" class="jspsych-btn" disabled=true>%choice%</button>`

const feedback_right = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: green"> √ </span>`

const feedback_wrong = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: red"> X </span>`

const subID = jsPsych.randomization.randomID(8)
//0、1随机分配被试组别
const dors =  Math.round(Math.random())

/* Blocks: HTML DOM Settings */

var set_html_style = {
    type: 'call-function',
    func: function() {
        document.body.style.backgroundColor = 'rgb(250, 250, 250)' // background color
        document.body.style.color = 'black' // font color
        document.body.style.fontSize = '20pt'
        document.body.style.fontFamily = '微软雅黑'
        document.body.style.fontWeight = 'bold' // 'normal', 'bold'
        document.body.style.lineHeight = '1.6em' // line space
        document.body.style.cursor = 'default' // 'default', 'none', 'wait', ...
        document.body.onselectstart = function() { return false } // 禁止选中文字 <body oncontextmenu="return false">
        document.body.oncontextmenu = function() { return false } // 禁用鼠标右键 <body onselectstart="return false">
        document.onkeydown = function() {
            // 屏蔽键盘按键 (https://www.bejson.com/othertools/keycodes/)
            if ((event.keyCode in { 27: 'Esc', 116: 'F5', 123: 'F12' }) ||
                (event.ctrlKey && event.keyCode in { 85: 'U' })
            ) { return false }
        }
    },
}

var set_html_style_EAST = {
    type: 'call-function',
    func: function() {
        document.body.style.backgroundColor = 'black'
        document.body.style.color = 'white'
        document.body.style.fontSize = '32pt'
        document.body.style.fontFamily = '微软雅黑'
        document.body.style.fontWeight = 'normal'
        document.body.style.lineHeight = '1.2em'
        document.body.style.cursor = 'none'
    },
}


/* Blocks: Basics */

var open_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: true,
    message: `
    <p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
    <b>
    测验将在一个「全屏页面」开始，为确保最佳效果，请你：<br/>
    （1）在电脑上进行测验，并使用主流浏览器打开本网页<br/>
    &emsp;&emsp;（Chrome、Edge、Firefox、Safari等，不要用IE）<br/>
    （2）关掉电脑上其他正在运行的程序或将其最小化<br/>
    （3）将手机调至静音，并尽可能减少环境噪音干扰<br/>
    （4）在测验过程中不要退出全屏<br/>
    （5）务必认真作答<br/><br/>
    </b>
    如果你同意参与，并且清楚理解了上述要求，请点击开始：
    </p>`,
    button_label: '点击这里全屏开始',
    delay_after: 100
}

var welcome = {
    type: 'html-keyboard-response',
    stimulus: `
    <p style="font: bold 32pt 微软雅黑; color: #B22222">
    欢迎参与我们的实验</p>
    <p style="font: 20pt 微软雅黑; color: black"><br/>
    <按空格键继续><br/>
    <b>实验过程中请勿退出全屏</b><br/><br/></p>
    <p style="font: 20pt 华文中宋; color: grey">
    江西师范大学<br/>2021年</p>`,
    choices: [' '],
    post_trial_gap: 100
}

var warmup = {
    type: 'html-button-response',
    stimulus: `<p>在每一部分的问题前都有详细的指导语，请务必仔细阅读指导语后再进行作答。如果您遇到不能理解的问题，请随时示意主试。</p>
    <p>每个人的行为或想法都不一样，所以问题的答案没有好与坏之分，您只需要按照内心的直觉作答即可。如果不是理解错误导致的错选，您无需反复修改您的答案。</p>
    <p>您的每一个回答对本研究都是非常重要的，请您务必根据您内心的真实感受诚实作答。您的回答不会被用于除研究以外的其他用途或透露给与研究无关的人员，本研究也不会记录任何事后能将您与本问卷回答进行联系或追溯的个人信息，请放心作答。</p>
    <p>在实验结束后，请不要同未参加过本研究的人讨论实验内容，非常感谢您的合作。</p>`,
    choices: ['<span id="timer">15</span>秒后继续'],
    button_html: btn_html_timer
}

var instr_aftermrt = {
    type: 'instructions',
    pages: [
        `<p style="text-align: left">
        接下来，你将根据你在空间认知任务中的感受回答一些问题。现在请你认真回忆你在完成空间认知任务中的感受，选择与你感受最符合的答案。`,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续'
}

var instr_stex = {
    type: 'instructions',
    pages: [
        `<p style="text-align: left">
        指导语：<br/>
        认真阅读之后的句子，<br/>
        并选择你认为符合自己看法的按钮。<br/><br/>
        1 = 非常不符合<br/>
        2 = 比较不符合<br/>
        3 = 有点不符合<br/>
        4 = 不确定<br/>
        5 = 有点符合<br/>
        6 = 比较符合<br/>
        7 = 非常符合</p>`,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续'
}

var close_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: false,
    delay_after: 0
}


/* Blocks: Surveys */

var Sex = {
    type: 'html-button-response',
    data: { varname: 'Sex' },
    stimulus: '你的性别',
    choices: ['男', '女', '其他'],
    on_finish: function(data) { addRespFromButton(data) }
}

var Age = {
    type: 'survey-html-form',
    data: { varname: 'Age' },
    preamble: '你的年龄',
    html: `
    <p><input name="Q0" type="number" placeholder="15~99" min=15 max=99
    oninput="if(value.length>2) value=value.slice(0,2)" required style="font-size: 20px;" /></p>`,
    button_label: '继续',
    on_finish: function(data) { addRespFromSurvey(data) }
}

var AName = {
    type: 'survey-html-form',
    data: { varname: 'Name' },
    preamble: '你的姓名',
    html: `<p><input name="Q0" type="text
    " required style="font-size: 20px;" placeholder="姓名"></p>`,
    button_label: '继续',
    on_finish: function(data) { addRespFromSurvey(data) }
}

var e_recall = {
   type: 'survey-text',
    data: { varname: 'recall' },
    questions: [{
        prompt: `请回忆一个你本可以表现得很谦逊，但却没有那么做的经历。请尽量生动具体地在脑海里想象这个场景，当你能成功的回忆这段经历时，请在下一页中写下这段经历。<br>请尽量描述每一个细节，你不需要写成一段连贯的文字，任何与之相关的细节都可以被记录下来，例如，你做了什么，你本可以做的谦逊的部分是什么，如果你表现得谦逊结果会有什么改变，为什么你应该表现得更加谦逊，等等。`,
        placeholder: `请注意，在本研究中谦逊并不是指卑微或者受辱的事件。谦逊并不会让你感到羞耻、惭愧或者愚蠢。反而本研究所感兴趣的是那些能让你正确认识到你和他人之间关系的视角。就像一句名言所说的，谦逊并不是看轻自己，而是避免只想到自己。`,
        rows: 10,
        columns: 120,
        required: true
    }],
    button_label: '继续',
    on_finish: function(data) { addRespFromSurvey(data) }
}

var Speciality = {
    type: 'survey-html-form',
    data: { varname: 'Speciality' },
    preamble: '你的专业',
    html: `
    <p><select name="Q0" size=5 style="font-size: 20px;">
    <option>心理学类</option>
    <option>非心理学类</option>
    </select></p>`,
    button_label: '继续',
    on_finish: function(data) { addRespFromSurvey(data) }
}

/*var Language = {
    type: 'survey-multi-select',
    data: { varname: 'Language' },
    questions: [{
        prompt: '你会哪些语言？',
        options: ['汉语', '英语', '日语', '韩语', '西班牙语', '其他'],
        horizontal: false,
        required: false
    }],
    button_label: '继续',
    on_finish: function(data) { replaceComma(data) }
}*/

var AE1 = {
    type: 'html-slider-response',
    data: { varname: 'ae1' },
    on_load: function() { setSliderAttr() },
    stimulus: '总体而言，你在多大程度上喜欢自己的名字？<br/>（1 = 完全没有信心，7 = 很有信心）',
    labels: ['完全没有信心', '比较没信心', '有点没信心', '不确定', '有点信心', '比较有信心', '很有信心'],
    min: 1,
    max: 7,
    start: 4,
    prompt: '<b id="slider-value">_</b><br/><br/>',
    button_label: '继续',
    require_movement: true
}

var AE2 = {
    type: 'html-slider-response',
    data: { varname: 'ae2' },
    on_load: function() { setSliderAttr() },
    stimulus: '请评价自己对空间认知任务的喜欢程度。<br/>（1 = 非常不喜欢，7 = 非常喜欢）',
    labels: ['非常不喜欢', '比较不喜欢', '有点不喜欢', '不确定', '有点喜欢', '比较喜欢', '非常喜欢'],
    min: 1,
    max: 7,
    start: 4,
    prompt: '<b id="slider-value">_</b><br/><br/>',
    button_label: '继续',
    require_movement: true
}

var AE3 = {
    type: 'html-slider-response',
    data: { varname: 'ae3' },
    on_load: function() { setSliderAttr() },
    stimulus: '请评价空间认知任务的难度。<br/>（1 = 非常简单，7 = 非常难）',
    labels: ['非常简单', '比较简单', '有点简单', '一般', '有点难', '比较难', '非常难'],
    min: 1,
    max: 7,
    start: 4,
    prompt: '<b id="slider-value">_</b><br/><br/>',
    button_label: '继续',
    require_movement: true
}
var AE4 = {
    type: 'html-slider-response',
    data: { varname: 'ae4' },
    on_load: function() { setSliderAttr() },
    stimulus: '请评价你完成空间认知任务的努力程度。<br/>（1 = 完全不努力，7 = 非常努力）',
    labels: ['完全不努力', '比较不努力', '有点不努力', '一般', '有点努力', '比较努力', '非常努力'],
    min: 1,
    max: 7,
    start: 4,
    prompt: '<b id="slider-value">_</b><br/><br/>',
    button_label: '继续',
    require_movement: true
}
var AE5 = {
    type: 'html-slider-response',
    data: { varname: 'ae5' },
    on_load: function() { setSliderAttr() },
    stimulus: '请回忆你完成空间认知任务过程中的情绪。<br/>（1 = 非常差，7 = 非常好）',
    labels: ['非常差', '比较差', '有点差', '不确定', '有点好', '比较好', '非常好'],
    min: 1,
    max: 7,
    start: 4,
    prompt: '<b id="slider-value">_</b><br/><br/>',
    button_label: '继续',
    require_movement: true
}
var AE6 = {
    type: 'html-slider-response',
    data: { varname: 'ae6' },
    on_load: function() { setSliderAttr() },
    stimulus: '请评价空间认知能力对您的重要程度。<br/>（1 = 非常不重要，7 = 非常重要）',
    labels: ['非常不重要', '比较不重要', '有点不重要', '一般', '有点重要', '比较重要', '非常重要'],
    min: 1,
    max: 7,
    start: 4,
    prompt: '<b id="slider-value">_</b><br/><br/>',
    button_label: '继续',
    require_movement: true
}
var AE7 = {
    type: 'html-slider-response',
    data: { varname: 'ae7' },
    on_load: function() { setSliderAttr() },
    stimulus: '请评价完成空间认知相关任务对您的重要程度。<br/>（1 = 非常不重要，7 = 非常重要）',
    labels: ['非常不重要', '比较不重要', '有点不重要', '一般', '有点重要', '比较重要', '非常重要'],
    min: 1,
    max: 7,
    start: 4,
    prompt: '<b id="slider-value">_</b><br/><br/>',
    button_label: '继续',
    require_movement: true
}

//刻板印象威胁启动检验
var STEX = {
    timeline: [{
        type: 'html-slider-response',
        data: jsPsych.timelineVariable('data'),
        on_load: function() { setSliderAttr() },
        stimulus: jsPsych.timelineVariable('s'),
        prompt: '<b id="slider-value">_</b><br/><br/>',
        labels: ['非常不符合', '比较不符合', '有点不符合', '一般', '有点符合', '比较符合', '非常符合'],
        min: 1,
        max: 7,
        start: 4,
        button_label: '继续',
        require_movement: true
    }],
    timeline_variables: [
        { data: { i: 1 , varname: 'STEX1' }, s: '我担心我在测验中的表现会受到性别的影响。' },
        { data: { i: 2 , varname: 'STEX2' }, s: '我担心我表现得不好，别人会将我的表现不佳归咎于我的性别。' },
        { data: { i: 3 , varname: 'STEX3' }, s: '我总是担心自己的表现会验证人们的看法而感到焦虑，这可能会影响我的发挥。' },
    ],
    randomize_order: false
}

var multi_select_block = {
        type: 'test-multi-select',
        questions: [
          {
            prompt: "mrt/1.png", 
            options: ["mrt/1A.png", "mrt/1-1.png", "mrt/1C.png", "mrt/1-2.png"], 
            horizontal: true,
            required: false,
            name: 'n1',
            rof:"02"
          }, 
          {
            prompt: "mrt/2.png", 
            options: ["mrt/2A.png", "mrt/2-1.png", "mrt/2-2.png", "mrt/2D.png"], 
            horizontal: true,
            required: false,
            name: 'n2',
            rof:"03"
          }, 
          {
            prompt: "mrt/3.png", 
            options: ["mrt/3-1.png", "mrt/3B.png", "mrt/3-2.png", "mrt/3D.png"], 
            horizontal: true,
            required: false,
            name: 'n3',
            rof:"13"
          }, 
          {
            prompt: "mrt/4.png", 
            options: ["mrt/4-1.png", "mrt/4B.png", "mrt/4C.png", "mrt/4-2.png"], 
            horizontal: true,
            required: false,
            name: 'n4',
            rof:"12"
          }, 
          {
            prompt: "mrt/5.png", 
            options: ["mrt/5A.png", "mrt/5-2.png", "mrt/5C.png", "mrt/5-3.png"], 
            horizontal: true,
            required: false,
            name: 'n5',
            rof:"02"
          }, 
          {
            prompt: "mrt/6.png", 
            options: ["mrt/6A.png", "mrt/6-1.png", "mrt/6-2.png", "mrt/6D.png"], 
            horizontal: true,
            required: false,
            name: 'n6',
            rof:"03"
          }, 
          {
            prompt: "mrt/7.png", 
            options: ["mrt/7-1.png", "mrt/7B.png", "mrt/7-2.png", "mrt/7D.png"], 
            horizontal: true,
            required: false,
            name: 'n7',
            rof:"13"
          }, 
          {
            prompt: "mrt/8.png", 
            options: ["mrt/8-1.png", "mrt/8B.png", "mrt/8C.png", "mrt/8-2.png"], 
            horizontal: true,
            required: false,
            name: 'n8',
            rof:"12"
          }, 
          {
            prompt: "mrt/9.png", 
            options: ["mrt/9-1.png", "mrt/9B.png", "mrt/9-2.png", "mrt/9D.png"], 
            horizontal: true,
            required: false,
            name: 'n9',
            rof:"13"
          }, 
          {
            prompt: "mrt/10.png", 
            options: ["mrt/3-1.png", "mrt/3B.png", "mrt/10C.png", "mrt/10D.png"], 
            horizontal: true,
            required: false,
            name: 'n10',
            rof:"23"
          }, 
          {
            prompt: "mrt/11.png", 
            options: ["mrt/11-1.png", "mrt/11-2.png", "mrt/11C.png", "mrt/11D.png"], 
            horizontal: true,
            required: false,
            name: 'n11',
            rof:"23"
          }, 
          {
            prompt: "mrt/12.png", 
            options: ["mrt/12-2.png", "mrt/12B.png", "mrt/12C.png", "mrt/12-1.png"], 
            horizontal: true,
            required: false,
            name: 'n12',
            rof:"12"
          }, 
          {
            prompt: "mrt/13.png", 
            options: ["mrt/13-2.png", "mrt/13B.png", "mrt/13-1.png", "mrt/13D.png"], 
            horizontal: true,
            required: false,
            name: 'n13',
            rof:"13"
          }, 
          {
            prompt: "mrt/14.png", 
            options: ["mrt/14-2.png", "mrt/14B.png", "mrt/14-1.png", "mrt/14D.png"], 
            horizontal: true,
            required: false,
            name: 'n14',
            rof:"13"
          }, 
          {
            prompt: "mrt/15.png", 
            options: ["mrt/15-3.png", "mrt/15B.png", "mrt/15-1.png", "mrt/15D.png"], 
            horizontal: true,
            required: false,
            name: 'n15',
            rof:"13"
          }, 
          {
            prompt: "mrt/16.png", 
            options: ["mrt/16A.png", "mrt/16-1.png", "mrt/16-2.png", "mrt/16D.png"], 
            horizontal: true,
            required: false,
            name: 'n16',
            rof:"03"
          }, 
          {
            prompt: "mrt/17.png", 
            options: ["mrt/17-2.png", "mrt/17B.png", "mrt/17-1.png", "mrt/17D.png"], 
            horizontal: true,
            required: false,
            name: 'n17',
            rof:"13"
          }, 
          {
            prompt: "mrt/18.png", 
            options: ["mrt/18-1.png", "mrt/18B.png", "mrt/18C.png", "mrt/18-2.png"], 
            horizontal: true,
            required: false,
            name: 'n18',
            rof:"12"
          }, 
          {
            prompt: "mrt/19.png", 
            options: ["mrt/19A.png", "mrt/19-2.png", "mrt/19C.png", "mrt/19-1.png"], 
            horizontal: true,
            required: false,
            name: 'n19',
            rof:"02"
          }, 
          {
            prompt: "mrt/20.png", 
            options: ["mrt/20A.png", "mrt/20-1.png", "mrt/20-2.png", "mrt/20D.png"], 
            horizontal: true,
            required: false,
            name: 'n20',
            rof:"03"
          }, 
        ], 
        button_label:'提交',
        time_limit:7
    };

var OpenEnded = {
    type: 'survey-text',
    data: { varname: 'OpenEnded' },
    questions: [{
        prompt: '实验已全部完成，你可以分享任何疑问或想法：',
        placeholder: '非必答',
        rows: 5,
        columns: 50,
        required: false
    }],
    button_label: '完成',
    on_finish: function(data) { addRespFromSurvey(data) }
}

/* Combine Timelines */

var demographics = {
    timeline: [
        AName, Sex, Age, Speciality, 
    ]
}

var surveys = {
    timeline: [
        e_recall,/*instr_mrt,*/multi_select_block,instr_aftermrt,
        AE1,AE2,AE3,AE4,AE5,AE6,AE7,
        instr_stex, STEX,
    ]
}
/*instr_stex刻板印象危险检验指导语，STEX问卷内容。e_recall实验组谦虚回忆任务。
instr_mrt心理旋转测验指导语。multi_select_block心理旋转测验。instr_aftermrt测验后问卷指导语，AE1-7问卷题项。
*/

var main_timeline = [
    set_html_style,
    open_fullscreen,
    welcome,
    warmup,
    demographics,
    surveys,
    OpenEnded,
    close_fullscreen,
]


/* Launch jsPsych */

jsPsych.init({
    timeline: main_timeline,
    on_finish: function() {
        jsPsych.data.get().localSave('csv', `data_${dors+subID}.csv`) // download from browser
        document.getElementById('jspsych-content').innerHTML += '实验结束，感谢您的参与！'
    }
})