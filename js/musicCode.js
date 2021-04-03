function videoMute(){
    let audio=document.getElementById("musicVideo");
    
    if(audio.muted===false){
        audio.muted=true;
    }else{
        audio.muted=false;
    }
}

function videoStop() {
    let vid=document.getElementById("musicVideo");
    
    if (vid.paused) 
        vid.play(); 
    else 
        vid.pause(); 
}


///FREE MUSIC GENRE

function house(){
    let houseElement1=document.getElementById("audio1");
    let houseElement2=document.getElementById("audio2");
    
    houseElement1.className="audio2";
    houseElement2.className="audio1";  
}