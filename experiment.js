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
//0、1随机分配被试组别，0为实验，1为控制
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
    choices: ['<span id="timer">10</span>秒后继续'],
    button_html: btn_html_timer
}


//指导语合集
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
//空间旋转测验刻板印象唤起组
var exp_mrt = {
    type: 'html-button-response',
    stimulus: `<p style="text-align: left;text-indent: 2em;">
        指导语：请仔细阅读下面这段话，在这之后将有一个空间认知任务。</p>
        <p style="text-align: left;text-indent: 2em;">
        空间能力是智能的基本成分之一。空间认知能力有广义和狭义之分。广义的空间能力指非言语信息加工中的个体差异，狭义的则指在完成空间测验中的个体差异。一些科学家认为，空间能力上的性别差异主要是在于右脑空间认知能力功能定位化程度的不同，而男性在此方面的功能强于女性，因此男性的空间认知能力强于女性。以往研究调查表明，接下来的任务能准确反映出个体的空间认知能力。且绝大部分研究结果显示，男性在此任务上的表现优于女性。
        `,
    choices: ['<span id="timer">10</span>秒后继续'],
    button_html: btn_html_timer
}

//空间旋转测验刻板印象无效组
var control_mrt = {
    type: 'html-button-response',
    timulus: `<p style="text-align: left;text-indent: 2em;">
        指导语：请仔细阅读下面这段话，在这之后将有一个空间认知任务。</p>
        <p style="text-align: left;text-indent: 2em;">
        空间能力是智能的基本成分之一。空间认知能力有广义和狭义之分。广义的空间能力指非言语信息加工中的个体差异，狭义的则指在完成空间测验中的个体差异。一些科学家认为，空间能力上的性别差异主要是在于右脑空间认知能力功能定位化程度的不同，男性在此方面强于女性；而另一些科学家则认为是具体任务类型的不同，在特定任务上，男性优于女性，但在某些任务中，女性要优于男性。接下来的任务在绝大部分研究结果中显示男性与女性表现相近。
        `,
    choices: ['<span id="timer">10</span>秒后继续'],
    button_html: btn_html_timer
}

var instr_mrt = {
    type: 'instructions',
    pages: [
        `<p style="text-align: left;text-indent: 2em;">
        <b>指导语：</b>在所给的五个图形中，分割线左侧的图形（题干）与分割线右侧四个图形（选项）中的两个是同一个图形，由第一个图形旋转一定角度得到的，如题干图形和选项图形中的第一个和第三个图形是同一个图形。请在下面的题目中选择与题干图形相同的<span style="color:#d15323de;">两个选项，多选或少选均不得分</span>。</p>
        <p style="text-align: left;text-indent: 2em;">此任务为限时测验，你只有7分钟来回答问题，请不要感到慌乱，尽力答题即可。</p>
        <img src="https://s3.ax1x.com/2021/02/24/yXJGes.png"></img>
        `,
        /*mrt/mrt_instr11.png*/
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '开始测验'
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

var instr_humility = {
    type: 'instructions',
    pages: [
        `<p style="text-align: left">
        指导语：<br/>
        请根据你此时此刻的感受回答之后的问题，<br/>
        并选择你认为符合自己看法的按钮。<br/><br/>
        1 = 非常不同意<br/>
        2 = 比较不同意<br/>
        3 = 有点不同意<br/>
        4 = 既不同意也不反对<br/>
        5 = 有点同意<br/>
        6 = 比较同意<br/>
        7 = 非常同意</p>`,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续'
}

var instr_employ = {
    type: 'instructions',
    pages: [
        `<p style="text-align: left">
        指导语：<br/>
        假设你现在是江西银行南昌分行的人事负责人，你行正在招聘一名新员工，详细招聘公告见下图。<br/>
        之后你将依次看到3份简历，请仔细考虑后，评价每个求职者在这份工作上的胜任度。<br/><br/>
        <img src="https://s3.ax1x.com/2021/02/24/yO5sER.png"></img>
        `,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续'
}

var emp_211 = {
    type: 'html-slider-response',
    data: { varname: 'e211' },
    on_load: function() { setSliderAttr() },
    stimulus: `<img src="https://s3.ax1x.com/2021/02/24/yO5dvF.jpg"></img>
        <p style="text-align: left">请给这位求职者打分，1-7分，7分满分</p>`,
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    min: 1,
    max: 7,
    start: 4,
    prompt: '<b id="slider-value">_</b><br/><br/>',
    button_label: '继续',
    require_movement: true
}

var emp_00 = {
    type: 'html-slider-response',
    data: { varname: 'e00' },
    on_load: function() { setSliderAttr() },
    stimulus: `<img src="https://s3.ax1x.com/2021/02/24/yO5Db9.png"></img>
        <p style="text-align: left">请给这位求职者打分，1-7分，7分满分</p>`,
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    min: 1,
    max: 7,
    start: 4,
    prompt: '<b id="slider-value">_</b><br/><br/>',
    button_label: '继续',
    require_movement: true
}

var emp_985 = {
    type: 'html-slider-response',
    data: { varname: 'e985' },
    on_load: function() { setSliderAttr() },
    stimulus: `<img src="https://s3.ax1x.com/2021/02/24/yO50u4.png"></img>
        <p style="text-align: left">请给这位求职者打分，1-7分，7分满分</p>`,
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    min: 1,
    max: 7,
    start: 4,
    prompt: '<b id="slider-value">_</b><br/><br/>',
    button_label: '继续',
    require_movement: true
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
    choices: ['男', '女'],
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
        prompt: `指导语：</br>请回忆一个你本可以表现得很谦逊，但却没有那么做的经历。请尽量生动具体地在脑海里想象这个场景，当你能成功的回忆这段经历时，请在下一页中写下这段经历。请尽量描述每一个细节，你不需要写成一段连贯的文字，任何与之相关的细节都可以被记录下来，例如，你做了什么，你本可以做的谦逊的部分是什么，如果你表现得谦逊结果会有什么改变，为什么你应该表现得更加谦逊，等等。`,
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

var instr_firm = {
    type: 'html-button-response',
    data: { varname: 'instr_firm' },
    stimulus: '最后一题：以往的研究显示，刚才的空间认知任务，男性的表现与女性的表现如何？',
    choices: ['男性优于女性', '两者接近', '女性优于男性'],
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

//谦虚测量
var humility = {
    timeline: [{
        type: 'html-slider-response',
        data: jsPsych.timelineVariable('data'),
        on_load: function() { setSliderAttr() },
        stimulus: jsPsych.timelineVariable('s'),
        prompt: '<b id="slider-value">_</b><br/><br/>',
        labels: ['非常不同意', '比较不同意', '有点不同意', '不同意也不反对', '有点同意', '比较同意', '非常同意'],
        min: 1,
        max: 7,
        start: 4,
        button_label: '继续',
        require_movement: true
    }],
    timeline_variables: [
        { data: { i: 1 , varname: 'hum1' }, s: '总的来说，我觉得和一般人相比，我并没有更优秀或更差劲。' },
        { data: { i: 2 , varname: 'hum2' }, s: '我认为自己既有许多优点，也有很多缺点。' },
        { data: { i: 3 , varname: 'hum3' }, s: '我觉得自己不值得获得比别人更多的尊重。' },
        { data: { i: 4 , varname: 'hum4' }, s: '老实说，我觉得自己比大多数人优秀。' },
        { data: { i: 5 , varname: 'hum5' }, s: '我觉得我应该获得比任何人都多的尊重。' },
        { data: { i: 6 , varname: 'hum6' }, s: '我觉得自己没有太多的不足之处。' },
    ],
    randomize_order: false
}

var mrt_test = {
        type: 'test-multi-select',
        questions: [
          {
            prompt: "https://s3.ax1x.com/2021/02/24/yO5agU.png", 
            options: ["https://s3.ax1x.com/2021/02/24/yO564x.png", "https://s3.ax1x.com/2021/02/24/yO5BDJ.png", "https://s3.ax1x.com/2021/02/24/yO5gC6.png", "https://s3.ax1x.com/2021/02/24/yO5yU1.png"], 
            horizontal: true,
            required: false,
            name: 'n1',
            rof:"02"
          }, 
          {
            prompt: "https://s3.ax1x.com/2021/02/24/yO528K.png", 
            options: ["https://s3.ax1x.com/2021/02/24/yO54DH.png", "https://s3.ax1x.com/2021/02/24/yO5RgO.png", "https://s3.ax1x.com/2021/02/24/yO5WvD.png", "https://s3.ax1x.com/2021/02/24/yO5oVA.png"], 
            horizontal: true,
            required: false,
            name: 'n2',
            rof:"03"
          }, 
          {
            prompt: "https://s3.ax1x.com/2021/02/24/yO575t.png", 
            options: ["https://s3.ax1x.com/2021/02/24/yO5TUI.png", "https://s3.ax1x.com/2021/02/24/yO5q8f.png", "https://s3.ax1x.com/2021/02/24/yO5bPP.png", "https://s3.ax1x.com/2021/02/24/yO5L28.png"], 
            horizontal: true,
            required: false,
            name: 'n3',
            rof:"13"
          }, 
          {
            prompt: "https://s3.ax1x.com/2021/02/24/yO5OxS.png", 
            options: ["https://s3.ax1x.com/2021/02/24/yO5jKg.png", "https://s3.ax1x.com/2021/02/24/yOISVs.png", "https://s3.ax1x.com/2021/02/24/yOIpan.png", "https://s3.ax1x.com/2021/02/24/yO5xbj.png"], 
            horizontal: true,
            required: false,
            name: 'n4',
            rof:"12"
          }, 
          {
            prompt: "https://s3.ax1x.com/2021/02/24/yOI95q.png", 
            options: ["https://s3.ax1x.com/2021/02/24/yOIF2T.png", "https://s3.ax1x.com/2021/02/24/yOIPP0.png", "https://s3.ax1x.com/2021/02/24/yOIkxU.png", "https://s3.ax1x.com/2021/02/24/yOIiGV.png"], 
            horizontal: true,
            required: false,
            name: 'n5',
            rof:"02"
          }, 
          {
            prompt: "https://s3.ax1x.com/2021/02/24/yOIEMF.png", 
            options: ["https://s3.ax1x.com/2021/02/24/yOImZ9.png", "https://s3.ax1x.com/2021/02/24/yOIVr4.png", "https://s3.ax1x.com/2021/02/24/yOIZqJ.png", "https://s3.ax1x.com/2021/02/24/yOInaR.png"], 
            horizontal: true,
            required: false,
            name: 'n6',
            rof:"03"
          }, 
          {
            prompt: "https://s3.ax1x.com/2021/02/24/yOIuI1.png", 
            options: ["https://s3.ax1x.com/2021/02/24/yOIMPx.png", "https://s3.ax1x.com/2021/02/24/yOIQG6.png", "https://s3.ax1x.com/2021/02/24/yOIlRK.png", "https://s3.ax1x.com/2021/02/24/yOI1xO.png"], 
            horizontal: true,
            required: false,
            name: 'n7',
            rof:"13"
          }, 
          {
            prompt: "https://s3.ax1x.com/2021/02/24/yOI8MD.png", 
            options: ["https://s3.ax1x.com/2021/02/24/yOIJqH.png", "https://s3.ax1x.com/2021/02/24/yOItZd.png", "https://s3.ax1x.com/2021/02/24/yOINdA.png", "https://s3.ax1x.com/2021/02/24/yOIGse.png"], 
            horizontal: true,
            required: false,
            name: 'n8',
            rof:"12"
          }, 
          {
            prompt: "https://s3.ax1x.com/2021/02/24/yOIUII.png", 
            options: ["https://s3.ax1x.com/2021/02/24/yOIdit.png", "https://s3.ax1x.com/2021/02/24/yOI0Rf.png", "https://s3.ax1x.com/2021/02/24/yOIwJP.png", "https://s3.ax1x.com/2021/02/24/yOIBz8.png"], 
            horizontal: true,
            required: false,
            name: 'n9',
            rof:"13"
          }, 
          {
            prompt: "https://s3.ax1x.com/2021/02/24/yOIrQS.png", 
            options: ["https://s3.ax1x.com/2021/02/24/yOIssg.png", "https://s3.ax1x.com/2021/02/24/yOIyLQ.png", "https://s3.ax1x.com/2021/02/24/yOIcZj.png", "https://s3.ax1x.com/2021/02/24/yOIgds.png"], 
            horizontal: true,
            required: false,
            name: 'n10',
            rof:"23"
          }, 
          {
            prompt: "https://s3.ax1x.com/2021/02/24/yOI2on.png", 
            options: ["https://s3.ax1x.com/2021/02/24/yOIWiq.png", "https://s3.ax1x.com/2021/02/24/yOIfJ0.png", "https://s3.ax1x.com/2021/02/24/yOIhWV.png", "https://s3.ax1x.com/2021/02/24/yOI4zT.png"], 
            horizontal: true,
            required: false,
            name: 'n11',
            rof:"23"
          }, 
          {
            prompt: "https://s3.ax1x.com/2021/02/24/yOIIQU.png", 
            options: ["https://s3.ax1x.com/2021/02/24/yOITL4.png", "https://s3.ax1x.com/2021/02/24/yXGwqA.png", "https://s3.ax1x.com/2021/02/24/yXGdrd.png", "https://s3.ax1x.com/2021/02/24/yOIoyF.png"], 
            horizontal: true,
            required: false,
            name: 'n12',
            rof:"12"
          }, 
          {
            prompt: "https://s3.ax1x.com/2021/02/24/yXGaKH.png", 
            options: ["https://s3.ax1x.com/2021/02/24/yXGt2D.png", "https://s3.ax1x.com/2021/02/24/yXGBVI.png", "https://s3.ax1x.com/2021/02/24/yXGNxe.png", "https://s3.ax1x.com/2021/02/24/yXGDat.png"], 
            horizontal: true,
            required: false,
            name: 'n13',
            rof:"13"
          }, 
          {
            prompt: "https://s3.ax1x.com/2021/02/24/yXGrIP.png", 
            options: ["https://s3.ax1x.com/2021/02/24/yXG6G8.png", "https://s3.ax1x.com/2021/02/24/yXGcRS.png", "https://s3.ax1x.com/2021/02/24/yXGyPf.png", "https://s3.ax1x.com/2021/02/24/yXGgxg.png"], 
            horizontal: true,
            required: false,
            name: 'n14',
            rof:"13"
          }, 
          {
            prompt: "https://s3.ax1x.com/2021/02/24/yXGRMQ.png", 
            options: ["https://s3.ax1x.com/2021/02/24/yXGfqs.png", "https://s3.ax1x.com/2021/02/24/yXG4Zn.png", "https://s3.ax1x.com/2021/02/24/yXGWrj.png", "https://s3.ax1x.com/2021/02/24/yXG5aq.png"], 
            horizontal: true,
            required: false,
            name: 'n15',
            rof:"13"
          }, 
          {
            prompt: "https://s3.ax1x.com/2021/02/24/yXGII0.png", 
            options: ["https://s3.ax1x.com/2021/02/24/yXGHRU.png", "https://s3.ax1x.com/2021/02/24/yXGTiV.png", "https://s3.ax1x.com/2021/02/24/yXG7GT.png", "https://s3.ax1x.com/2021/02/24/yXGLM4.png"], 
            horizontal: true,
            required: false,
            name: 'n16',
            rof:"03"
          }, 
          {
            prompt: "https://s3.ax1x.com/2021/02/24/yXGLM4.png", 
            options: ["https://s3.ax1x.com/2021/02/24/yXGXL9.png", "https://s3.ax1x.com/2021/02/24/yXGvZR.png", "https://s3.ax1x.com/2021/02/24/yXGOsJ.png", "https://s3.ax1x.com/2021/02/24/yXGxd1.png"], 
            horizontal: true,
            required: false,
            name: 'n17',
            rof:"13"
          }, 
          {
            prompt: "https://s3.ax1x.com/2021/02/24/yXJpi6.png", 
            options: ["https://s3.ax1x.com/2021/02/24/yXJPzD.png", "https://s3.ax1x.com/2021/02/24/yXJFQe.png", "https://s3.ax1x.com/2021/02/24/yXJksH.png", "https://s3.ax1x.com/2021/02/24/yXJCRO.png"], 
            horizontal: true,
            required: false,
            name: 'n18',
            rof:"12"
          }, 
          {
            prompt: "https://s3.ax1x.com/2021/02/24/yXJALd.png", 
            options: ["https://s3.ax1x.com/2021/02/24/yXJeot.png", "https://s3.ax1x.com/2021/02/24/yXJVeA.png", "https://s3.ax1x.com/2021/02/24/yXJnFP.png", "https://s3.ax1x.com/2021/02/24/yXJZdI.png"], 
            horizontal: true,
            required: false,
            name: 'n19',
            rof:"02"
          }, 
          {
            prompt: "https://s3.ax1x.com/2021/02/24/yXJuJf.png", 
            options: ["https://s3.ax1x.com/2021/02/24/yXJlQg.png", "https://s3.ax1x.com/2021/02/24/yXJKW8.png", "https://s3.ax1x.com/2021/02/24/yXJQSS.png", "https://s3.ax1x.com/2021/02/24/yXJ1yQ.png"], 
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
        AName, Sex, /*Age, Speciality,*/ 
    ]
}

//svs_mrt包括instr_mrt心理旋转测验指导语。mrt_test心理旋转测验。instr_aftermrt测验后问卷指导语，AE2-7问卷题项。0表示实验，1控制
if (dors == 0) {
    var svs_mrt = {
    timeline: [
        exp_mrt,instr_mrt,mrt_test,instr_aftermrt, AE2,AE3,AE4,AE5,AE6,AE7,
    ]}
}
else {
    var svs_mrt = {
    timeline: [
        control_mrt,instr_mrt,mrt_test,instr_aftermrt, AE2,AE3,AE4,AE5,AE6,AE7,
    ]}
}

var employ = {
    timeline: [instr_employ,emp_211,emp_00,emp_985,
    ]
}

/*var surveys = {
    timeline: [
        e_recall,svs_mrt,instr_stex, STEX,instr_firm,instr_humility, humility,employ,
    ]
}*/
//预实验1阶段的测验内容，上面是正式实验的测验内容
var surveys = {
    timeline: [
        instr_mrt,mrt_test,e_recall,instr_humility, humility,employ,
    ]
}
/*instr_stex刻板印象危险检验指导语，STEX问卷内容。e_recall谦逊唤起任务。

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
        document.getElementById('jspsych-content').innerHTML += '实验结束，请将您浏览器下载的CSV文件发送至邮箱：linqi19951102@126.com，感谢您的参与！'
    }
})