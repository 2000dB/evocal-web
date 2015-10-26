var femaleVoice = null;
var maleVoice = null;
var speech = null;
var speaking = false;

var phrases = {
    "1" : [ 
        "e vocal",
        "language is a power law"
    ],
    "2" : [
        "a. e. i. o. u. y.",
        "the the the the the the the the the the the the the the the the the the the the the the the the the the the the the? the!",
        "There is a model of language as a literal virus",
    ],
    "3" : [
        "The Mechanism of the Larynx",
        "Cricothyroid, Posterior cricoarytenoid, Lateral cricoarytenoid, Transverse arytenoid, Oblique arytenoid, and, Thyroarytenoid"
    ],
    "4" : [
        "the word began as a biological virus that altered the throat structure of of protohumans",
        "symbols, associations and mutations",
        "infectious audio"
    ]
};



function initSpeech()
{
    if ('onvoiceschanged' in speechSynthesis) {
        speechSynthesis.onvoiceschanged = function()
        {
            getVoices();
            test();

        }
    } else {
        getVoices();
    }

}

function getVoices()
{
    var allVoices = speechSynthesis.getVoices();

    femaleVoice = allVoices.filter(function (voice) {
        return voice.name == "Fiona";
    })[0];
    
    maleVoice = allVoices.filter(function (voice) {
        return voice.name == "Alex";
    })[0];
}


// say a message
function speak(text, voice, callback) 
{
    speechSynthesis.cancel()
    
    speaking = true;
    speech = new SpeechSynthesisUtterance();
    speech.voice = voice;
    speech.text = text;
    speech.lang = 'en-US';
    speech.rate = 0.75;
    if(voice == maleVoice)
        speech.pitch = 0.3;
    else
        speech.pitch = 1.0;
    
    speech.onend = function () {
        speaking = null;
    };
    
    speech.onerror = function (e) {
        speaking = null;
    };

    speechSynthesis.speak(speech);
    return speech;
}


function initHovers() 
{
        // select all but vowels and place them between span tags so that they can be faded down on hover
        $('div.entry').each(function(){
            $("h1",this).html($("h1",this).html().replace(/[^aeiouyәṾӨȻΔ𐐉\s]+/gi, function func(x) {return ("<span>"+x+"</span>");}));
        });
        
        // fade out all non vowels
        $("div.entry h1").on("mouseenter", function() {
            $("span", this).stop();
            $("span", this).animate({
                opacity: 0.0
            }, 500);
        });

        // fade back in all non vowels
        $("div.entry h1").on("mouseleave", function() {
            $("span", this).stop();
            $("span", this).animate({
                opacity: 1.0
            }, 500);
        });

    $("div.speak h1").on("mouseenter", function() {
        var id = $(this).parent().parent().parent().attr("speech"); // ugly!
        if(!id)
            return;

        var num = Math.floor(Math.random()*phrases[id].length);
        speak(phrases[id][num], maleVoice);
    });
    
    $("div.speak h1").on("mouseleave", function() {
        lastHover = null;
    });

}

function moveCredit()
{
    $("#credit").each(function() {
        var offset = $(this).width();
        $(this).css("-webkit-transform", "translate("+offset+"px, 0%) rotate(270deg)");
    });
}

function intro()
{
    $("body").click(function() {    
        $(".logo").stop();            
        $(".splash").stop();
        $("div.wrapper").stop();
        $("div.wrapper").show();

        moveCredit();
        $(".logo").fadeOut(500);
        $(".splash").fadeOut(500);

    });

    // Intro animation 
    $(".logo").show();
    $(".splash").hide();
    $(".wrapper").hide();
    setTimeout(function(){
        setTimeout(function(){
            speak("e VOCAL", maleVoice);
        }, 1000);
        $(".splash").fadeIn(2000, function() {
            setTimeout(function(){
                $(".logo").hide();
        
                $("div.wrapper").show();
                moveCredit();
                
                $(".splash").fadeOut(2000, function() {
                });
            }, 2000);
        });
    }, 500);
    
}
