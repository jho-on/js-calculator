const BUTTONS = document.getElementsByClassName("btn");
const DISPLAYTEXT = document.getElementById("displayText");
const OPERATIONS = ["-", "+", "/", "*"];
const APPROXIMATIONPRECISION = 100;

function endsWithOperation(){
    if(OPERATIONS.includes(DISPLAYTEXT.textContent.charAt(DISPLAYTEXT.textContent.length - 1))){
        return true;
    }
    return false;
}

function resolve(){
    if(String(eval(DISPLAYTEXT.textContent)).includes(".") && String(eval(DISPLAYTEXT.textContent)).split(".")[1].length >= 5){
        DISPLAYTEXT.textContent = Math.round((eval(DISPLAYTEXT.textContent)) * APPROXIMATIONPRECISION) / APPROXIMATIONPRECISION;
    }else{
        DISPLAYTEXT.textContent = eval(DISPLAYTEXT.textContent);
    }
}

function handleDot(displayText){
    if(displayText.textContent.length > 0 && ![".", ""].includes(displayText.textContent.slice(-1)) && !OPERATIONS.includes(displayText.textContent.slice(-1))){
        let a = (displayText.textContent.split(/[\+\*\/-]/));
        if(a[a.length - 1].includes(".")){
            return false;
        }
        return true;
    }else{
        return false;
    }
}

function addToDisplay(btnText, displayText){
    if(!["C", "Del", "="].includes(btnText)){
        if(OPERATIONS.includes(btnText)){
            if (displayText.textContent.length > 0 && !OPERATIONS.includes(displayText.textContent.slice(-1)) && displayText.textContent.slice(-1) != "."){
                displayText.textContent += btnText;
            }
        }else if(btnText != "."){
            displayText.textContent += btnText;

        }else if (handleDot(displayText)){
            displayText.textContent += btnText;
        }
    }
}

for(let i = 0; i < BUTTONS.length; i++){
    BUTTONS[i].onclick = function(){
        let btnText = BUTTONS[i].textContent;
        

        if(!endsWithOperation()){
            if(btnText == "="){
                resolve();
            }
        }

        switch(btnText){
            case "C":
                DISPLAYTEXT.textContent = ""
                break;
            case "Del":
                DISPLAYTEXT.textContent = DISPLAYTEXT.textContent.slice(0, -1) ;
                break;
        }

        addToDisplay(btnText, DISPLAYTEXT);
    }
}


