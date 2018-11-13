
// Declare VAR'S up here

var W;
var H;

var consoleVar;

var col;

var WORD;
var WORD_txt;
var KEY;
var KEYCODE;

var SizeOfText;

var lines;
var Y;
var lineHeight;

var moveDistEye;
var opacity2;

var linesOfTEXT;
var yDisplace;
var tempYDisplace;
var changeYDisplace;

var startMillis;
var currentMS;

var addLine;
var addLineNum;
var wordToCompare;

var clearScreen;

function initVars(){
	startMillis=millis();
	
	WORD = [[]];
  WORD_txt = [];
  KEY = "";
  KEYCODE;
	
  SizeOfText = consoleVar[1][1];
  	
  lines = 0;
  Y = H*0.6;
  lineHeight = 0.03*H;
	
  moveDistEye=[];
  opacity2=165;
	
  linesOfTEXT = [
	    {before:"Hello! Please press Enter:",after:"\n",lineExtra:0,cumulExtra:1},
	];
	
  yDisplace = 0;
  tempYDisplace = [];
  changeYDisplace = false;
  
  addLine = false;
  addLineNum = 0;
  wordToCompare;
}

function setup() {
  // put setup code here
  // Initialize VAR'S here (give them values)
  W = windowWidth;
  H = windowHeight;
  createCanvas(W, H);
  
  consoleVar = [["dev","T. CODES"],["textSize",round(0.02*H)],["colScheme",'1'],["font","Courier New"]];

  col = [{r:100,g:100,b:100},{r:252,g:252,b:252}];
 	
	initVars();	
	
	strokeCap(SQUARE);
	textFont(consoleVar[3][1],SizeOfText);
	angleMode(DEGREES);
}
function draw() {
	clearScreen = false;
	checkColour();
  SizeOfText = int(consoleVar[1][1]);
  background(col[1].r, col[1].g, col[1].b);
  ConsoleINFO();
  variableDisplay();
  fill(col[0].r, col[0].g, col[0].b);
	for (var i=0; i<linesOfTEXT.length; i+=1){
	   var inputIs = INPUT(linesOfTEXT[i].before,linesOfTEXT[i].after,KEY,KEYCODE,i);
	   
	   if (clearScreen){
		   break;
	   } else {
		   TXT(inputIs,i);
	   }
	}
  KEY="";
  
}

/** Type HELP for more help inside the console... **/

/*

You can modify any of the 4 predefined variables from within the console itself...

 Suggestions to try: 
 
    dev = [Your Name]
    textSize = 11
    colScheme = 2
    font = Avenir Next
    
 NOTE:
    dev : STRING
    textSize : INTEGER (1 <= textSize <= 26)
    colScheme : INTEGER (1 <= colScheme <= 5)
    font : STRING (A font already downloaded on your computer)

*/

function checkColour(){
    switch (consoleVar[2][1]){
        case '2': col[0].r = 250; col[0].g=250; col[0].b=255;
                  col[1].r = 70; col[1].g=90; col[1].b=110;break;
        case '3': col[0].r = 255; col[0].g=255; col[0].b=255;
                  col[1].r = 200; col[1].g=150; col[1].b=150;break;
        case '4': col[0].r = 110; col[0].g=90; col[0].b=90;
                  col[1].r = 255; col[1].g=245; col[1].b=245;break;
        case '5': col[0].r = 90; col[0].g=110; col[0].b=90;
                  col[1].r = 245; col[1].g=255; col[1].b=245;break;
        case '6': col[0].r = 252; col[0].g=252; col[0].b=252;
                  col[1].r = 50; col[1].g=50; col[1].b=50;break;
        default:  col[0].r = 100; col[0].g=100; col[0].b=100;
                  col[1].r = 252; col[1].g=252; col[1].b=252;
    }    
}
function replaceCharacter(TXT,Index,character){
    if (TXT.charAt(Index) === character ){
        TXT = TXT.slice(0,Index)+"#"+TXT.slice(Index+1);
    }
    return TXT;
}
function isVar(LHS,RHS){
    for (var i2=0; i2<consoleVar.length; i2+=1){
        if (consoleVar[i2][0]===LHS){
            RHS = consoleVar[i2][1];
        }
    }
    return RHS;
}
function varsToText(){
		var toReturn = '[';
		
		for (var i = 0; i < consoleVar.length; i+=1){
			if (i && i<consoleVar.length){
				toReturn+=', '
			}
			toReturn+='['
			toReturn+='"'+str(consoleVar[i][0])+'", ';
			if (Number.isInteger(consoleVar[i][1])){
				toReturn+=str(consoleVar[i][1]);
			} else {
				toReturn+='"'+str(consoleVar[i][1])+'"';
			}
			toReturn+=']';
		}
		return toReturn+']';
}

function concatenation(TXT){
    if (!TXT){
        TXT = WORD_txt[lines];  
    }
    var VALS = [];
    for (var j=0; j<TXT.split(",").length; j+=1){
        VALS.push(TXT.split(",")[j].toString());
    }
    
    for (var k=0; k<VALS.length; k+=1){
        for  (var i3=0; i3<consoleVar.length; i3+=1){
            if (consoleVar[i3][0]===VALS[k]){
                VALS[k] = consoleVar[i3][1].toString();
                break;
            }
        }
    }
    return VALS.join("");
}
function arithmeticConsole(sign,TXT){
    if (!TXT){
        TXT=WORD_txt[lines];
    }
    var first = TXT.split(sign)[0];
    var second = TXT.split(sign)[1];
    
    var VAL1 = parseInt(first,10);
    var VAL2 = parseInt(second,10);
    for  (var i3=0; i3<consoleVar.length; i3+=1){
        if (consoleVar[i3][0]===first){
            VAL1 = parseInt(consoleVar[i3][1],10);
            break;
        }
    }
    for  (var i3=0; i3<consoleVar.length; i3+=1){
        if (consoleVar[i3][0]===second){
            VAL2 = parseInt(consoleVar[i3][1],10);
            break;
        }
    }
    
    
    var RESULT;
    
    switch (sign){
       case "+":RESULT = VAL1+VAL2; break;
       case "-":RESULT = VAL1-VAL2; break;
       case "*":RESULT = VAL1*VAL2; break;
       case "/":RESULT = VAL1/VAL2; break;
    }
    return [VAL1,VAL2,RESULT.toString()];
}
function logicConsole(sign,TXT){

    if (!TXT){
        TXT=WORD_txt[lines].split(":")[1];
    }
    
    var VAL1 = TXT.split(sign)[0].toString();
    var VAL2 = TXT.split(sign)[1].toString();
    for  (var i3=0; i3<consoleVar.length; i3+=1){
        if (consoleVar[i3][0]===VAL1){
            VAL1 = consoleVar[i3][1];
            break;
        }
    }
    for  (var i3=0; i3<consoleVar.length; i3+=1){
        if (consoleVar[i3][0]===VAL2){
            VAL2 = consoleVar[i3][1];
            break;
        }
    }
    
    
    var RESULT = false;
    
    switch (sign){
       case ">":if (VAL1 > VAL2){RESULT = true;}break;
       case "<":if (VAL1 < VAL2){RESULT = true;}break;
       case "===":if (VAL1 === VAL2){RESULT = true;}break;
       case ">=":if (VAL1 >= VAL2){RESULT = true;}break;
       case "<=":if (VAL1 <= VAL2){RESULT = true;}break;
       case "!==":if (VAL1 !== VAL2){RESULT = true;}break;
       default: RESULT = "Incorrect Notation";
    }
    return [VAL1,VAL2,RESULT];
}

function ConsoleInputs(){
    var type = "";
    var toAppend = {before:"",after:"",lineExtra:0,cumulExtra:0};
    var inQuotes = false;
    for (var i=0; i<WORD_txt[lines].length; i+=1){
        if (WORD_txt[lines][i]==="'"||WORD_txt[lines][i]==='"'){
            if (inQuotes){
                inQuotes=false;    
            } else {
                inQuotes=true;    
            }
            WORD_txt[lines] = replaceCharacter(WORD_txt[lines],i,'"');
            WORD_txt[lines] = replaceCharacter(WORD_txt[lines],i,"'");
        }
        if (!inQuotes){
            WORD_txt[lines] = replaceCharacter(WORD_txt[lines],i,' ');
        }
    }
    WORD_txt[lines] = WORD_txt[lines].replace(/#/g, '');
    for (var i=0; i<WORD_txt[lines].length; i+=1){
        if (WORD_txt[lines].substr(0, 3)==="IS:"){
            type = 'condition';
            var sign = '';
            var condition = WORD_txt[lines].split(":")[1];
            for (var i2=0; i2<condition.length; i2+=1){
                if (condition[i2]==="="&&condition[i2+1]==="="&&condition[i2+2]==="="){
                    sign="==="; break;
                } else if (condition[i2]===">"&&condition[i2+1]!=="="){
                    sign=">"; break;
                } else if (condition[i2]===">"&&condition[i2+1]==="="){
                    sign=">="; break;
                } else if (condition[i2]==="<"&&condition[i2+1]!=="="){
                    sign="<"; break;
                } else if (condition[i2]==="<"&&condition[i2+1]==="="){
                    sign="<="; break;
                } else if (condition[i2]==="!"&&condition[i2+1]==="="&&condition[i2+2]==="="){
                    sign="!=="; break;
                }
            }
            toAppend = {before:"  -> "+ logicConsole(sign,condition)[2],after:"",lineExtra:0,cumulExtra:0};
            
        }
        if (WORD_txt[lines].substr(0, 6)==="PRINT:"){
            // println(WORD_txt[lines].split(":")[1].replace(/ /g, '_'));
            type = 'output';
            var VAL = WORD_txt[lines].split(":")[1];
            var includes = "";
            for (var i2=0; i2<WORD_txt[lines].split(":")[1].length; i2+=1){
                switch (WORD_txt[lines].split(":")[1][i2]){
                    case ",": if (!inQuotes){includes=",";} break;
                }
            }
            switch (includes){
                case ",": VAL = concatenation(VAL); break;
                default: VAL = isVar(VAL,VAL);
            }
            
            toAppend = {before:"  -> "+ VAL,after:"",lineExtra:0,cumulExtra:0};
            
        }
        if (WORD_txt[lines][i]==="=" && type!=='condition' && type!=='output'){
            type='assignement';
            var VAL = WORD_txt[lines].split("=")[1];
            var includes = "";
            for (var i2=0; i2<WORD_txt[lines].split("=")[1].length; i2+=1){
                switch (WORD_txt[lines].split("=")[1][i2]){
                    case "+": includes="+"; break;
                    case "-": includes="-"; break;
                    case "*": includes="*"; break;
                    case "/": includes="/"; break;
                    case ",": includes=","; break;
                    default: includes=""; break;
                }
                if (includes){
                    break;
                }
            }
            switch (includes){
                case "+":VAL = arithmeticConsole("+",WORD_txt[lines].split("=")[1])[2]; break;
                case "-":VAL = arithmeticConsole("-",WORD_txt[lines].split("=")[1])[2]; break;
                case "*":VAL = arithmeticConsole("*",WORD_txt[lines].split("=")[1])[2]; break;
                case "/":VAL = arithmeticConsole("/",WORD_txt[lines].split("=")[1])[2]; break;
                case ",":VAL = concatenation(WORD_txt[lines].split("=")[1]); break;
                default: for (var i2=0; i2<consoleVar.length; i2+=1){if (consoleVar[i2][0]===VAL){VAL = consoleVar[i2][1];}}
            }
            
            var VAR = WORD_txt[lines].split("=")[0];
            var exist=false;
            for (var i2=0; i2<consoleVar.length; i2+=1){
                if (consoleVar[i2][0]===VAR){
                    if (VAL === "NONE"&&i2>3){
                        consoleVar.splice(i2,1);
                    } else {
                        exist=true;
                    }
                    break;
                }
            }
            if (exist){
                switch (i2){
                    case 1: if (VAL.toString() !== (parseInt(VAL, 10)).toString()){VAL=consoleVar[1][1];} break;
                    case 2: if (VAL.toString() !== (parseInt(VAL, 10)).toString()){VAL=consoleVar[2][1];} break;   
                }
                consoleVar[i2][1] = VAL;
            } else if (!exist && VAL!=="NONE") {
                consoleVar.push([VAR,VAL]);
            }
        }
        if (type !== "assignement" && type!=='condition' && type!=='output'){
            if (WORD_txt[lines][i]==="?"){
                var VAR = WORD_txt[lines].split("?")[0];
                var VAL = "NONE";
                VAL = isVar(VAR,VAL);
                toAppend = {before:"  -> "  + VAL,after:"",lineExtra:0,cumulExtra:0};
            }
            switch (WORD_txt[lines][i]){
                case "+": toAppend = {before:arithmeticConsole("+")[0] + " + " + arithmeticConsole("+")[1] + " = " + arithmeticConsole("+")[2]+" ",after:"",lineExtra:0,cumulExtra:0}; break;
                case "-": toAppend = {before:arithmeticConsole("-")[0] + " - " + arithmeticConsole("-")[1] + " = " + arithmeticConsole("-")[2]+" ",after:"",lineExtra:0,cumulExtra:0}; break;
                case "*": toAppend = {before:arithmeticConsole("*")[0] + " * " + arithmeticConsole("*")[1] + " = " + arithmeticConsole("*")[2]+" ",after:"",lineExtra:0,cumulExtra:0}; break;
                case "/": toAppend = {before:arithmeticConsole("/")[0] + " / " + arithmeticConsole("/")[1] + " = " + arithmeticConsole("/")[2]+" ",after:"",lineExtra:0,cumulExtra:0}; break;
                case ",": toAppend = {before:concatenation()+" ",after:"",lineExtra:0,cumulExtra:0}; break;
            }
        }
    }
    switch (WORD_txt[lines]){
        case "HELP": toAppend = {before:"Help : \n  -  HELP_Variables\n  -  HELP_Arithmetic\n  -  HELP_Logic\n  -  HELP_Commands\n",after:"",lineExtra:0,cumulExtra:4}; break;
        case "HELP_Variables": toAppend = {before:"Variables : \n  -  [var]=[value]\n  -  [var]?\n",after:"",lineExtra:0,cumulExtra:2}; break;
        case "HELP_Arithmetic": toAppend = {before:"Arithmetic : \n  -  [var1]+[var2]\n  -  [value1]*[value2]\n  -  [var1] = [var2]/[var3]\n  -  [ +  -  *  / ]\n",after:"",lineExtra:0,cumulExtra:4}; break;
        case "HELP_Logic": toAppend = {before:"Logic : \n  -  IS: [var1]===[var2]\n  -  IS: [value1]>[value2]\n  -  [ ===  >  <  >=  <=  !== ]\n",after:"",lineExtra:0,cumulExtra:3}; break;
        case "HELP_Commands": toAppend = {before:"Commands : \n  -  RESET\n  -  CLEAR\n  -  RESET_ALL\n  -  SAVE\n  -  [var] = NONE\n",after:"",lineExtra:0,cumulExtra:5}; break;
        case "RESET": consoleVar = [["dev","T. CODES"],["textSize",round(0.02*H)],["colScheme",'1'],["font","Courier New"]]; break; 
				case "CLEAR": clearScreen = true; break; 
				case "RESET_ALL": consoleVar = [["dev","T. CODES"],["textSize",round(0.02*H)],["colScheme",'1'],["font","Courier New"]];
				case "SAVE": alert(varsToText());
    }

    return toAppend;
}

function Text_BAR(){
    var bar = "|";
    if (sin(millis()/2)>0){
        bar = "";    
    }
    return bar;
}
function INPUT(before,after,theKey,theKeyCode,LineNum){
    tempYDisplace=[];
    changeYDisplace = false;
    if (LineNum===lines){
        if (theKey){
	        	addLine = false
            switch (theKeyCode){
                case 13: 
                		addLineNum = 0;
                    yDisplace=0;
                    tempYDisplace = '';
                    WORD_txt.push(WORD[lines].join("")); 
                    // (/ /g) is the global selector for " "
                    linesOfTEXT.push(ConsoleInputs());
                    if (!clearScreen){
	                    linesOfTEXT[lines].cumulExtra/=2;
	                    for (var i=lines; i>=0; i-=1){
	                        linesOfTEXT[i].lineExtra+=1;
	                        linesOfTEXT[i].cumulExtra+=linesOfTEXT[lines].cumulExtra;
	                    }
	                    lines+=1; 
											WORD.push([]);
											KEY="";
	                  } else {
		                  initVars();
	                  }
                    break;
                case 8: if (WORD[lines].length){WORD[lines].pop();} break;
                case 27: break;
                case 16: break;
                case 38: 
                    if (yDisplace>(-lines)){
                        yDisplace-=1; 
                        changeYDisplace = true;
                    }break;
                case 40: 
                    if (yDisplace<0){
                        yDisplace+=1; 
                        changeYDisplace = true;
                    }break;
                default:WORD[lines].push(theKey);
            }
        }
    }
    
    if (!clearScreen){
	    if (changeYDisplace){
	        tempYDisplace = WORD[lines+yDisplace]; 
	        WORD[lines] = [];
	        for (var i=0; i<tempYDisplace.length; i+=1){
	            WORD[lines].push(tempYDisplace[i]);
	        }
	        changeYDisplace = false;    
	    }
    
    
	    if (LineNum<=lines){
		    	var theWord = WORD[LineNum].join("");
		    	if (addLineNum === 0){
			    	wordToCompare = textWidth(before + theWord.substring(theWord.lastIndexOf("\n") + 1) + after);
		    	} else {
			    	wordToCompare = textWidth(theWord.substring(theWord.lastIndexOf("\n") + 1) + after);
		    	}
	        if (wordToCompare>0.75*W && !addLine){
	            for (var i=0; i<=lines; i+=1){
	                linesOfTEXT[i].lineExtra+=1;
	                addLineNum += 1;
	            }
	            
	            addLine = true;
	            WORD[LineNum].pop();
	            WORD[LineNum].push("\n  ");
	            WORD[LineNum].push(KEY);
	        }
	//         oldHeight = textAscent(before+WORD[LineNum].join("")+after);
	        if (LineNum===lines){
	            return before+WORD[LineNum].join("")+Text_BAR()+after;
	        }
	        else{
	            return before+WORD[LineNum].join("")+after;
	        }
	    }
    }
   
}

function TXT(TEXT,LineNum){
    var TXT_p = "  "+TEXT;
    var withCumulExtra = linesOfTEXT[LineNum].cumulExtra;
    if (LineNum===lines){
        TXT_p = "> "+TEXT;
        withCumulExtra = 0;
    } else if (LineNum===lines+yDisplace){
        TXT_p = "- "+TEXT;    
    }
    

    if (LineNum<=lines){
        text(TXT_p,50,Y-((linesOfTEXT[LineNum].lineExtra+withCumulExtra)*lineHeight));
    }
}
function ConsoleINFO(){
    currentMS = millis()-startMillis;
    var opacity;
    var di;
    var HAdj = 1/10*W;
    textAlign(CENTER);
    switch (lines){
        case 0: opacity = 100; break;
        case 1: opacity = 70; break;
        case 2: opacity = 50; break;
        case 3: opacity = 30; break;
        case 4: opacity = 10; break;
    }
    if (lines < 5) {
        if (opacity2>0){
            moveDistEye=[(2*sin(currentMS/5)),(5*sin(currentMS/5))];
        }
        if (currentMS>15000){
            if (opacity2>0){
                opacity2-=1;    
            } else {
                moveDistEye=[0,0];
            }
        }
        stroke(col[0].r, col[0].g, col[0].b,opacity);
        strokeWeight(4);
        noFill();
        arc(0.235*W,0.29*W-HAdj,0.09*W,0.1*W,39,313);
        bezier(0.55275*W,0.25*W-HAdj,0.51*W,0.2175*W-HAdj,0.4778*W,0.2805*W-HAdj,0.5295*W,0.28875*W-HAdj);
        bezier(0.501*W,0.323*W-HAdj,0.5415*W,0.363*W-HAdj,0.5845*W,0.301*W-HAdj,0.5295*W,0.28875*W-HAdj);
        strokeJoin(BEVEL);
        beginShape();
        vertex(0.3975*W,0.3375*W-HAdj);
        vertex(0.3975*W,0.24*W-HAdj);
        vertex(0.47*W,0.3375*W-HAdj);
        vertex(0.47*W,0.24*W-HAdj);
        endShape();
        beginShape();
        vertex(0.69*W,0.24*W-HAdj);
        vertex(0.69*W,0.3325*W-HAdj);
        vertex(0.7425*W,0.3325*W-HAdj);
        endShape();
        beginShape();
        vertex(0.7975*W,0.245*W-HAdj);
        vertex(0.76*W,0.245*W-HAdj);
        vertex(0.76*W,0.335*W-HAdj);
        vertex(0.7975*W,0.335*W-HAdj);
        endShape();
        line(0.762*W,0.2875*W-HAdj,0.78*W,0.2875*W-HAdj);
        strokeWeight(2);
        ellipse(0.3275*W,0.2925*W-HAdj,0.09*W,0.1*W);
        ellipse(0.62*W,0.2925*W-HAdj,0.09*W,0.1*W);
        
        strokeWeight(W*(10-moveDistEye[0])/400);
        stroke(col[0].r, col[0].g, col[0].b,opacity2);
        point(W*(134-moveDistEye[0])/400,W*(124-moveDistEye[1])/400-HAdj);
        point(W*(251-moveDistEye[0])/400,W*(124-moveDistEye[1])/400-HAdj);
        stroke(col[1].r, col[1].g, col[1].b);
        strokeWeight(W*(2)/400);
        point(W*(132-moveDistEye[0])/400,W*(123-moveDistEye[1])/400-HAdj);
        point(W*(249-moveDistEye[0])/400,W*(123-moveDistEye[1])/400-HAdj);
    }
    noStroke();
    fill(col[0].r, col[0].g, col[0].b,130);
    textAlign(RIGHT);
    textFont("Microsoft Sans Serif",13);
    text(consoleVar[0][1],W-30,30);
    textAlign(LEFT);
    textFont(consoleVar[3][1],SizeOfText);
}


function variableDisplay(){
    stroke(col[0].r, col[0].g, col[0].b,150);
    strokeWeight(1);
    line(0,Y+100,W,Y+100);
    fill(col[0].r,col[0].r,col[0].r,200);
    textSize(0.02*height);
    var x=0;
    for (var i=0; i<consoleVar.length; i+=1){
        if (i-(x*4)>=4){
            x+=1;
        }
        text(consoleVar[i][0] + " : "+consoleVar[i][1],50+(0.33*W)*(x), Y+100 + (lineHeight)*(i+2-(x*4)));
    }
    textSize(SizeOfText);
}
function keyReleased(){
    KEY=key;
    KEYCODE = keyCode;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  W = windowWidth;
  H = windowHeight;
  lineHeight = 0.03*H;
  Y = H*0.6;
}
