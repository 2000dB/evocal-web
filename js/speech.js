var femaleVoice = null;
var maleVoice = null;
var speech = null;

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
        //test();
        //speak("e vocal", maleVoice);
    }

}


function getVoices()
{
    var allVoices = speechSynthesis.getVoices();
    console.log(allVoices);

    femaleVoice = allVoices.filter(function (voice) {
        return voice.name == "Fiona";
    })[0];
    
    maleVoice = allVoices.filter(function (voice) {
        return voice.name == "Alex";
    })[0];
    
    // console.log(femaleVoice);
    // console.log(maleVoice);
}


// say a message
function speak(text, voice, callback) 
{
    speechSynthesis.cancel()
    
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
        currentSpeech = null;
    };
    
    speech.onerror = function (e) {
        currentSpeech = null;

    };

    speechSynthesis.speak(speech);
    return speech;
}


function test()
{
    // speak("male", maleVoice);
    // speak("female", femaleVoice);
}
