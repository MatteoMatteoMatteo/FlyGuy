function kreisAnimation(){
    let kreis=document.getElementById("derCircle");
    let dreieckal=document.getElementById("dreieck");
    
    if(kreis.className="hinKreis"){
        kreis.setAttribute("class","zurueckKreis");
        dreieckal.setAttribute("class", "triangle2");
    }
}

function kreisAnimation1(){
    let kreis=document.getElementById("derCircle");
    let dreieckal=document.getElementById("dreieck");
    
    if(kreis.className="zurueckKreis"){
        kreis.setAttribute("class","hinKreis");
        dreieckal.setAttribute("class", "triangle1");
    }
}

function losKreis(){
    setTimeout(kreisAnimation,1000);
}


function loslosKreis(){
    setTimeout(kreisAnimation1,1000);
}

function allesStarten(){
    var los1 = setInterval(losKreis,10000);
    var los2 = setInterval(loslosKreis,20000);
    
    setTimeout(clear1,16000);
    setTimeout(clear2,16000);
    
    function clear1(){
        clearInterval(los1);
    }
    
    function clear2(){
        clearInterval(los2);
    }
}

function allesStarten1(){
    var los1 = setInterval(losKreis,10000);
    var los2 = setInterval(loslosKreis,20000);
    
    setTimeout(clear1,5000);
    setTimeout(clear2,5000);
    
    function clear1(){
        clearInterval(los1);
    }
    
    function clear2(){
        clearInterval(los2);
    }
}

function allesStarten2(){
    var los1 = setInterval(losKreis,10000);
    var los2 = setInterval(loslosKreis,20000);
    
    setTimeout(clear1,5000);
    setTimeout(clear2,5000);
    
    function clear1(){
        clearInterval(los1);
    }
    
    function clear2(){
        clearInterval(los2);
    }
}

if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)  { 
       allesStarten1();
}else if(window.navigator.userAgent.indexOf("Edge") > -1){
    allesStarten2();
}else{
    allesStarten();
}