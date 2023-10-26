Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:100
})

camera = document.getElementById("camera")
Webcam.attach("camera")

function clicking()
{
    Webcam.snap(function(data_uri) {
        console.log(data_uri)
        document.getElementById("result").innerHTML = "<img id='captured_img' src='"+data_uri+"'>"
})
}

prediction_1 = "";
prediction_2 = "";
console.log("ml5version", ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/4ScLAWZZF/model.json', model_Loaded)

function model_Loaded()
{
    console.log("Model Loaded!")
}
function check()
{
    img = document.getElementById("captured_img")
    classifier.classify (img, gotResult)
}
function gotResult(error, result)
{
    if (error) 
    {
        console.error(error)
    } 
    else 
    {
        console.log(result)
        
        prediction_1 = result[0].label
        prediction_2 = result[1].label

        document.getElementById("emotion_name1").innerHTML = prediction_1
        document.getElementById("emotion_name2").innerHTML = prediction_2

        speak()

        if (prediction_1 == "Happiness") 
        {
            document.getElementById("update_emoji1").innerHTML = "&#128515;"
        } 
        else if (prediction_1 == "Cry")
        {
            document.getElementById("update_emoji1").innerHTML = "&#128546;"
        }
        else if (prediction_1 == "Sad")
        {
            document.getElementById("update_emoji1").innerHTML = "&#128532"
        }


        if (prediction_2 == "Happiness") 
        {
            document.getElementById("update_emoji2").innerHTML = "&#128515;"
        } 
        else if (prediction_2 == "Cry")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128546;"
        }
        else if (prediction_2 == "Sad")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128532"
        }
    }
}
function speak()
{
    var synth = window.speechSynthesis
    speak_data1 = "The first prediction is" + prediction_1
    speak_data2 = "And the second prediction is" + prediction_2
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2)
    synth.speak(utterThis)
}