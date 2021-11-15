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


// const rdm_h = Math.round(Math.random())

/* Blocks: HTML DOM Settings */

var set_html_style = {
    type: 'call-function',
    func: function() {
        document.body.style.backgroundColor = 'rgb(250, 250, 250)' // background color
        document.body.style.color = 'black' // font color
        document.body.style.fontSize = '20pt'
        document.body.style.fontFamily = '微软雅黑'
        document.body.style.fontWeight = 'normal' // 'normal', 'bold'
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
    （4）在测验过程中不要退出全屏或刷新页面<br/>
    （5）务必认真作答<br/><br/>
    </b>
    如果你同意参与，并且清楚理解了上述要求，请点击开始：
    </p>`,
    button_label: '点击这里全屏开始',
    delay_after: 100
}

var welcome = {
    type: 'instructions',
    data: { RightNumber: new Date().toLocaleTimeString() },
    pages: [ `
    <p style="font: bold 32pt 微软雅黑; color: #B22222">
    欢迎参与我们的实验</p>
    <p style="font: 20pt 微软雅黑; color: black"><br/>
    <b>实验过程中请勿退出全屏</b><br/><br/></p>
    <p style="font: 20pt 华文中宋; color: grey">
    江西师范大学<br/>2021年</p>`],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续'
}

var warmup = {
    type: 'html-button-response',
    stimulus: `<p>在每一部分的问题前都有详细的指导语，请务必仔细阅读指导语后再进行作答。每个人的行为或想法都不一样，所以问题的答案没有好与坏之分，您只需要按照内心的直觉作答即可。如果不是理解错误导致的错选，您无需反复修改您的答案。</p><p>您的回答不会被用于除研究以外的其他用途或透露给与研究无关的人员，本研究也不会记录任何事后能将您与本问卷回答进行联系或追溯的个人信息，请放心作答。</p><p>遇到没有选择按钮时，请尝试使用滚轮向下查看。</p>`,
    choices: ['<span id="timer">10</span>秒后继续'],
    button_html: btn_html_timer
}

var close_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: false,
    delay_after: 0
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

var instr_mrt = {
    type: 'html-button-response',
    stimulus: `<p style="text-align: left;text-indent: 2em;"><b>指导语：</b>在所给的五个图形中，分割线左侧的图形（题干）与分割线右侧四个图形（选项）中的两个是同一个图形，由第一个图形旋转一定角度得到的，如选项图形中的第一个、第三个图形是由题干图形旋转而来，是同一个图形。请在下面的题目中选择与题干图形相同的<b style="color:#a70b0b;">两个图片，多选或少选均不得分</b>。</p><p style="text-align: left;text-indent: 2em;">此任务为限时测验，你只有7分钟来回答问题，请不要感到慌乱，尽力答题即可。</p><img src="https://s3.ax1x.com/2021/02/24/yXJGes.png"></img>`,
    choices: ['<span id="timer">20</span>秒后继续'],
    button_html: btn_html_timer
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

//实验处理任务

//中性回忆任务
var c_recall = {
    type: 'survey-text',
    data: { varname: 'recall',RightNumber: 1 },
    questions: [{
        prompt: `指导语：</br>请回忆一下这个校园生活中常遇到的场景：你打算在食堂吃饭，在点餐后找到了位置，就坐吃饭。请尽量生动具体地在脑海里想象这个过程，当你能成功地回忆这段经历时，请在下方写下这段经历。请尽量描述每一个细节，你不需要写成一段连贯的文字，也无需描述自己的心情，任何与之相关的细节都可以被记录下来，例如，人流量怎么样、你是如何挑选食物、座位的，等等。<b style="color:#a70b0b">请至少填写100字</b>`,
        placeholder: `请注意，请尽可能地描述日常大多数时候会发生的细节，而不是某几次偶然发生却给你留下深刻印象的细节`,
        rows: 10,
        columns: 120,
        required: true
    }],
    button_label: '继续',
    required_word:100,
    on_finish: function(data) { addRespFromSurvey(data) }
}
//空间旋转测验刻板印象唤起组
var exp_mrt = {
    type: 'html-button-response',
    data: { RightNumber: 0 },
    stimulus: `<p style="text-align: left;text-indent: 2em;">指导语：请仔细阅读下面这段话，在这之后将有一个空间认知任务。</p><p style="text-align: left;text-indent: 2em;">空间能力是智能的基本成分之一。空间认知能力有广义和狭义之分。广义的空间能力指非言语信息加工中的个体差异，狭义的则指在完成空间测验中的个体差异。一些科学家认为，空间能力上的性别差异主要是在于右脑空间认知能力功能定位化程度的不同，而男性在此方面的功能强于女性，因此男性的空间认知能力强于女性。以往研究调查表明，接下来的任务能准确反映出个体的空间认知能力。<b style="color:#a70b0b">且绝大部分研究结果显示，男性在此任务上的表现优于女性</b>。</p>`,
    choices: ['<span id="timer">20</span>秒后继续'],
    button_html: btn_html_timer
}

var test = {
    type:'serial-reaction-time',
    grid:[[1,2,5,4]],
    target:[1,1],
    choices:[[1,2,3,4]],
    grid_square_size:200,
    target_color:'red',
    trial_duration:400,
}

/* Blocks: Surveys */

var Height = {
    type: 'survey-html-form',
    data: { varname: 'Height' },
    preamble: '你的身高（cm）',
    html: `
    <p><input name="Q0" type="number" placeholder="140~200" min=140 max=200
    oninput="if(value.length>3) value=value.slice(0,3)" required style="font-size: 20px;width:100px;" /></p>`,
    button_label: '继续',
    on_finish: function(data) {
        pheigth = parseInt(JSON.parse(data.responses).Q0);
        addRespFromSurvey(data);
     }
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
    on_finish: function(data) { addRespFromSurvey(data);
    subName = data.responses }
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


var OpenEnded = {
    type: 'survey-text',
    data: { varname: 'OpenEnded' },
    questions: [{
        prompt: '实验已全部完成，你可以分享任何疑问、想法或是对实验目的的猜测：',
        placeholder: '欢迎说出你对实验的猜测',
        rows: 5,
        columns: 50,
        required: false
    }],
    button_label: '完成',
    on_finish: function(data) { addRespFromSurvey(data);data.RightNumber = new Date().toLocaleTimeString()  }
}

/* Combine Timelines */

var demographics = {
    timeline: [
        AName, Height, Age, Speciality,
    ]
}



    
/*instr_stex刻板印象危险检验指导语，STEX问卷内容。e_recall谦逊唤起任务。

*/

var main_timeline = [
    // set_html_style,
    open_fullscreen,
    // welcome,
    // warmup,
    test,
    // OpenEnded,
    // close_fullscreen,
]


/* Launch jsPsych */

jsPsych.init({
    timeline: main_timeline,
    on_finish: function() {
        jsPsych.data.get().localSave('csv', `data_${subName}.csv`) // download from browser
        document.getElementById('jspsych-content').innerHTML += '实验结束，请不要同未参加过本研究的人讨论实验内容，并提交下载的CSV文件至linqi19951102@126.com。非常感谢您的参与与合作！'
    }
})