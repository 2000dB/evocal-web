function initSpeech(){"onvoiceschanged"in speechSynthesis?speechSynthesis.onvoiceschanged=function(){getVoices(),test()}:getVoices()}function getVoices(){var a=speechSynthesis.getVoices();console.log(a),femaleVoice=a.filter(function(a){return"Fiona"==a.name})[0],maleVoice=a.filter(function(a){return"Alex"==a.name})[0]}function speak(a,b,c){return speechSynthesis.cancel(),speaking=!0,speech=new SpeechSynthesisUtterance,speech.voice=b,speech.text=a,speech.lang="en-US",speech.rate=.75,b==maleVoice?speech.pitch=.3:speech.pitch=1,speech.onend=function(){speaking=null},speech.onerror=function(a){speaking=null},speechSynthesis.speak(speech),speech}function test(){}function initHovers(){$("div.entry").each(function(){$("h1",this).html($("h1",this).html().replace(/[^aeiouyәṾӨȻΔ𐐉\s]+/gi,function(a){return"<span>"+a+"</span>"}))}),$("div.entry h1").on("mouseenter",function(){$("span",this).stop(),$("span",this).animate({opacity:0},500)}),$("div.entry h1").on("mouseleave",function(){$("span",this).stop(),$("span",this).animate({opacity:1},500)}),$("div.speak h1").on("mouseenter",function(){var a=$(this).parent().parent().parent().attr("speech");if(a){var b=Math.floor(Math.random()*phrases[a].length);speak(phrases[a][b],maleVoice)}}),$("div.speak h1").on("mouseleave",function(){lastHover=null})}function moveCredit(){$("#credit").each(function(){var a=$(this).width();$(this).css("-webkit-transform","translate("+a+"px, 0%) rotate(270deg)")})}function intro(){$("body").click(function(){$(".logo").stop(),$(".splash").stop(),$("div.wrapper").stop(),$("div.wrapper").show(),moveCredit(),$(".logo").fadeOut(500),$(".splash").fadeOut(500)}),$(".logo").show(),$(".splash").hide(),$(".wrapper").hide(),setTimeout(function(){setTimeout(function(){speak("e VOCAL",maleVoice)},1e3),$(".splash").fadeIn(2e3,function(){setTimeout(function(){$(".logo").hide(),$("div.wrapper").show(),moveCredit(),$(".splash").fadeOut(2e3,function(){})},2e3)})},500)}var femaleVoice=null,maleVoice=null,speech=null,speaking=!1,phrases={1:["e vocal","language is a power law"],2:["a. e. i. o. u. y.","the the the the the the the the the the the the the the the the the the the the the the the the the the the the the? the!","There is a model of language as a literal virus"],3:["The Mechanism of the Larynx","Cricothyroid, Posterior cricoarytenoid, Lateral cricoarytenoid, Transverse arytenoid, Oblique arytenoid, and, Thyroarytenoid"],4:["the word began as a biological virus that altered the throat structure of of protohumans","symbols, associations and mutations","infectious audio"]};