//理工心理学研究方法课作业

/* Global Variables */
const btn_html_timer =
    `<style onload="tid=setInterval(timer, 1000)"></style>
     <button onclick="clearInterval(tid)" class="jspsych-btn" disabled=true>%choice%</button>`

// const feedback_right = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: green"> √ </span>`

// const feedback_wrong = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: red"> X </span>`

//0、1随机分配被试组别，0为两两比较，1为单独比较
// const condition = Math.round(Math.random())
/* Blocks: HTML DOM Settings */

var level = 1

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

// var set_html_style_EAST = {
//     type: 'call-function',
//     func: function() {
//         document.body.style.backgroundColor = 'black'
//         document.body.style.color = 'white'
//         document.body.style.fontSize = '32pt'
//         document.body.style.fontFamily = '微软雅黑'
//         document.body.style.fontWeight = 'normal'
//         document.body.style.lineHeight = '1.2em'
//         document.body.style.cursor = 'none'
//     },
// }


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
    </b>
    如果你同意参与，并且清楚理解了上述要求，请点击开始：
    </p>`,
    button_label: '点击这里全屏开始',
    delay_after: 100
}

// var welcome = {
//     type: 'instructions',
//     pages: [ `
//     <p style="font:32pt 微软雅黑; color: #B22222">
//     假设你现在是一个小型发展中国家的政府官员，现在你需要对四项提案进行评定。两项提案分别涉及到国民就业问题、国家交通运输问题，另两项提案是对巴基斯坦的人道援助。<br>
//     这四项提案的预计投入金额相近。</p>
    
//     <p style="font: 20pt 华文中宋; color: grey">
//     接下来，你将对这四项提案进行评判。</p>`],
//     show_clickable_nav: true,
//     allow_backward: false,
//     button_label_previous: '返回',
//     button_label_next: '开始'
// }


var welcome = {
    type: 'instructions',
    pages: [`
    <p style="font: bold 32pt 微软雅黑; color: #B22222">
    欢迎参与我们的实验</p>
    <b>实验过程中请勿退出全屏</b><br/><br/></p>
    <p style="font: 20pt 华文中宋; color: grey">
    浙江理工大学<br/>2021年</p>`],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '开始'
}

var warmup = {
    type: 'html-button-response',
    stimulus: `<p style="text-align: left;text-indent: 2em;">在每一部分的问题前都有详细的指导语，请务必仔细阅读指导语后再进行作答。每个人的行为或想法都不一样，所以问题的答案没有好与坏之分，您只需要按照内心的直觉作答即可。如果不是理解错误导致的错选，您无需反复修改您的答案。</p>`,
    choices: ['<span id="timer">5</span>秒后继续'],
    button_html: btn_html_timer
}

var instr_trust = {
    type: 'instructions',
    pages: [
        `<p style="text-align: left;text-indent:2em;">
        接下来，你讲与一名搭档共同完成一项投资游戏。现在你有100元初始资金，决定投资一些钱给你的搭档去完成某个项目。你投资的金额可以是0～100元(具体投资多少，由你自己决定) 。在你投资N元给你的搭档之后，对方会获得<span style="color:red;font-weight:bold">3N</span>元的收益。你的搭档在得到收益之后，会选择返还一些钱给你作为分红(具体返还多少，由你的搭档自己决定) 。</p><p style="text-align: left;text-indent:2em;">例如: 如果你决定投资50元给你的搭档，对方将得到150元的收益。随后，他可以选择返还0～150的任何数量的金钱给你作为分红，具体返还多少钱由他决定!下面将提供你的搭档资料，请你根据信息完成投资。`,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续'
}



var money = 0
//亲疏、善意、阶层
var partner = [{ data: { i: 1 }, s: '他与你素未谋面，很少关心朋友的近况，处于位于社会阶层梯子第' ,n:-2,f:111 },
    { data: { i:2  }, s: '他与你素未谋面，从不参加公益活动，处于位于社会阶层梯子第',n:2,f:113 },
    { data: { i: 3 }, s: '他与你素未谋面，对于他人的求助尽力而为，处于位于社会阶层梯子第',n:-2,f:121 },
    { data: { i: 4 }, s: '他与你素未谋面，定期志愿献血，处于位于社会阶层梯子第' ,n:2,f:123 },
    { data: { i: 5 }, s: '他是你母亲的亲兄弟，很少关心家人的情况，处于位于社会阶层梯子第',n:-2,f:211 },
    { data: { i: 6}, s: '他是你母亲的亲兄弟，对别人的求助敷衍了事，处于位于社会阶层梯子第',n:2,f:213 },
    { data: { i: 7 }, s: '他是你父亲的亲兄弟，经常参加社区义工，处于位于社会阶层梯子第',n:-2,f:221 },
    { data: { i: 8 }, s: '他是你母亲的亲兄弟，很重视他人的需求和愿望，处于位于社会阶层梯子第',n:2,f:223 },
    { data: { i: 9 }, s: '他与你素未谋面，从不会让别人难堪，处于位于社会阶层梯子第',n:0,f:122 },
    { data: { i: 10 }, s: '他是你父亲的亲兄弟，经常刁难别人，处于位于社会阶层梯子第',n:0,f:212 },
    { data: { i: 11 }, s: '他是你父亲的亲兄弟，会用尽方法帮助别人，处于位于社会阶层梯子第',n:0,f:222 },
    { data: { i: 12 }, s: '他与你素未谋面，对别人利益熟视无睹，处于位于社会阶层梯子第',n:0,f:112 },
    ]

var trustgame = {
    timeline_variables: partner,
    timeline:[
        {
        type: 'html-range-response',
        stimulus:function(){
            var ssstr = '<p>请你阅读下面的信息，想象一个符合的对象作为你投资的搭档:<br>'+jsPsych.timelineVariable("s")+(level+jsPsych.timelineVariable("n"))+'层。</p><p>请决定你的投资金额。</p>';
            return ssstr;
        },
        min:0,
        max:100,
        step:1,
        range_width: 300,
        range_start:0,
        button_label:'确定',
        on_finish: function(data) {data.value = data.response;money = 3*data.value;data.varname = jsPsych.timelineVariable("f")}
        },
        {
        type: 'html-range-response',
        button_label:'确定',
        stimulus:function(){
            var sstr =  '你的搭档获得了' + money.toString() + '元的投资收益，你认为他会分给你多少。';
            return sstr;
            },
        min:0,
        max:function(){
            return money;
        },
        range_width: 300,
        range_start:0,
        step:1,
        on_finish: function(data) {data.value = data.response;data.varname = jsPsych.timelineVariable("f")}
        }
    ],
    randomize_order: true,
}

var close_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: false,
    delay_after: 0
}

// var instr_ms = {
//     type: 'survey-text',
//     data: { varname: 'moral'},
//     questions: [{
//         prompt:`<p>指导语：请你仔细阅读以下文字，并回想一个相类似的经历，让你感到自己是个没有道德感的人，请尽量生动具体地在脑海里想象这个场景，当你能成功地回忆这段经历时，请在下方写下这段经历。请至少填写150字。</p><p>我在街上碰到一个好像是癫痫的病人发病，没有上前去帮助他。当时看到时，第一反应是应该把他扶起来，叫救护车或把他送往医院，却没有实施，只是在远远地看着……所幸是有人帮他做了一些急救措施，而且叫了救护车。我就在想我是否就是所谓的道德缺失的人。</p>`,
//         placeholder: `请尽量描述每一个细节，你不需要写成一段连贯的文字，任何与之相关的细节都可以被记录下来.`,
//         rows: 10,
//         columns: 120,
//         required: true
//     }],
//     button_label: '继续',
//     required_word:150,
//     on_finish: function(data) { data.value = data.response.Q0 }
// }

/* Blocks: Surveys */

var Sex = {
    type: 'html-button-response',
    data: { varname: 'Sex' },
    stimulus: '你的性别',
    choices: ['男', '女'],
    on_finish: function(data) { data.value = addRespFromButton(data) }
}

var Age = {
    type: 'survey-html-form',
    data: { varname: 'Age' },
    preamble: '你的年龄',
    html: `
    <p><input name="Q0" type="number" placeholder="15~99" min=15 max=99
    oninput="if(value.length>2) value=value.slice(0,2)" required style="font-size:20px;width:4em;" /></p>`,
    button_label: '继续',
    on_finish: function(data) { data.value = data.response.Q0 }
}

var AName = {
    type: 'survey-html-form',
    data: { varname: 'Name' },
    preamble: '你的姓名',
    html: `<p><input name="Q0" type="text" required style="font-size: 20px;" placeholder="姓名"></p>`,
    button_label: '继续',
    on_finish: function(data) { data.value = data.response.Q0 }
}

var Social_Rank = {
    type:'html-slider-response',
    stimulus:`<p style="text-align: left;text-indent:2em;">请看下图，请你想象梯子不同的层级代表不同人所处的社会阶层, 层级越高, 表示其社会阶层越高。你觉得自己当前位于1至10级的哪一层级</p><img src="images/ladder.png" style="height: 400px;">`,
    min:1,
    max:10,
    slider_start:1,
    slider_width:600,
    labels: ['1', '2', '3', '4', '5','6','7','8','9','10'],
    require_movement:true,
    button_label:'继续',
    step:1,
    on_finish: function(data) {
        level = data.response;
    }
}


/*var Email = {
    type: 'survey-html-form',
    data: { varname: 'Email' },
    preamble: '你的邮箱',
    html: '<p><input name="Q0" type="email" placeholder="非必填" /></p>',
    button_label: '继续',
    //此处需要注意name="Q0",下面这个语段是记录被试的回答，且只记录单个答案，且通过name="Q0"定位
    on_finish: function(data) { addRespFromSurvey(data) }
}*/



var instr_its = {
    type: 'instructions',
    pages: [
        `<p style="text-align: left">
        指导语：<br/>
        认真阅读之后的句子，<br/>
        并选择符合你内心感受的按钮。<br/><br/>
        1 = 完全不同意<br/>
        2 = 部分不同意<br/>
        3 = 既不同意也不反对<br/>
        4 = 部分同意<br/>
        5 = 完全同意<br/>`,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续'
}

var its = {
    timeline: [{
        type: 'html-slider-response',
        data: jsPsych.timelineVariable('data'),
        on_load: function() { setSliderAttr() },
        stimulus: jsPsych.timelineVariable('s'),
        labels: ['完全不同意', '部分不同意', '既不同意也不反对', '部分同意', '完全同意'],
        min: 1,   
        max: 5,
        slider_start: 3,
        slider_width:600,
        prompt: '<b id="slider-value">_</b><br/><br/>',
        button_label: '继续',
        require_movement: true,
    }],
    timeline_variables: [
        { data: { i: 1 }, s: '我们这个社会里虚伪的现象越来越多了。' },
        { data: { i: 2 }, s: '与陌生人打交道时，你最好小心，除非他们拿出可以证明其值得信任的证据。' },
        { data: { i: 3 }, s: '阻止多数人（做坏事）触犯法律的是恐惧、社会廉耻或惩罚而不是良心。' },
        { data: { i: 4 }, s: '考试时，老师不到场监考可能会导致更多的人作弊。' },
        { data: { i: 5 }, s: '不管人们口头上怎么说，最好还是认为多数人主要关心其自身幸福。' },
        { data: { i: 6 }, s: '如果真正了解到国际上正在发生的事件，那么公众将比现在更加担心。' },
        { data: { i: 7 }, s: '多数领导（官员）上任前的许诺是诚恳的。' },
        { data: { i: 8 }, s: '多数人如果说出自己的打算就一定会去实现。' },
        { data: { i: 9 }, s: '多数推销人员在描述他们的产品时是诚实的。' },
        { data: { i: 10 }, s: '多数维修人员即使认为你不懂其专业知识也不会多收费。' }    ],
    randomize_order: false,
    on_finish: function(data) { addRespFromButtonScale(data, 'ITS') },
    post_trial_gap: 100

}



var OpenEnded = {
    type: 'survey-text',
    data: { varname: 'OpenEnded' },
    questions: [{
        prompt: '实验已全部完成，你可以分享任何疑问、想法或是对实验目的的猜测：',
        rows: 5,
        columns: 50,
        required: false
    }],
    button_label: '完成',
    on_finish: function(data) { data.response = data.response.Q0;data.value = new Date().toLocaleTimeString() }
}



/* Combine Timelines */

var demographics = {
    timeline: [
       AName, Sex, Age, Social_Rank,
    ]
}

var main_timeline = [
    set_html_style,
    open_fullscreen,
    welcome,
    warmup,
    demographics,
    instr_its,its,
    instr_trust,
    trustgame,
    OpenEnded,
    close_fullscreen,
]

/* Launch jsPsych */

// jsPsych.init({
//     timeline: main_timeline,
//     on_finish: function() {
//         var resultJson = jsPsych.data.get().json();
//         document.getElementById('jspsych-content').innerHTML += '实验结束，感谢您的参与！'
//     }
// });

jatos.onLoad(function() {
    jsPsych.init({
    timeline: main_timeline,
    on_finish: function() {
        var resultJson = jsPsych.data.get().json();
        document.getElementById('jspsych-content').innerHTML += '实验结束，感谢您的参与！'
        jatos.submitResultData(resultJson, jatos.startNextComponent);
    }
});
});
