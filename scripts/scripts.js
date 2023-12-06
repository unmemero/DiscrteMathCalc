const calculate = document.getElementById('calculate');
calculate.onclick = () => {
    //Homework calculation
    let homeworkGrade = homeworkHandler(); 
    //Quiz calculation
    let quizGrade = quizHandler();
    //Exam calculation
    let examGrade = examHandler();
    //Participation calculation
    let participationGrade = participationHandler();
    //Total calculation
    total = calculateTotal(homeworkGrade, quizGrade, examGrade, participationGrade);
    displayTotal(total);
    let letter = letterGradeHandler(total);
    exportInformation(homeworkGrade, quizGrade, examGrade, participationGrade, total, letter);
};

function homeworkHandler(){
    let homeworksResult = 0;
    let hwString = 'hw';
    for(let i = 0; i<11;i++){
        hwString += i;
        if(document.getElementById(hwString).value != ''){
            homeworksResult += parseInt(document.getElementById(hwString).value);
        }
        hwString = 'hw';
    }
    document.getElementById("hwActual").innerHTML=homeworksResult;
    homeworkPercentage = Math.round((homeworksResult*35)/1100);
    document.getElementById("hwPercentage").innerHTML=homeworkPercentage+'%';
    return homeworkPercentage;
};

function quizHandler(){
    let quizResult = 0;
    let quizString = 'q';
    for(let i = 1; i<6;i++){
        quizString += i;
        if(document.getElementById(quizString).value!=''){
            quizResult += parseInt(document.getElementById(quizString).value);
        }
        quizString = 'q';
    }
    document.getElementById("qActual").innerHTML=quizResult;
    quizPercentage = Math.round((quizResult*20)/500);
    document.getElementById("qPercentage").innerHTML=quizPercentage+'%';
    return quizPercentage;
};

function examHandler() {
    let examResult = 0;
    let examString = 'e';
    for(let i = 1; i<3;i++){
        examString += i;
        if (document.getElementById(examString).value!=''){
            examResult += parseInt(document.getElementById(examString).value);
        }
        examString = 'e';
    }
    document.getElementById("eActual").innerHTML=examResult;
    examPercentage = Math.round((examResult*15)/200);
    document.getElementById("ePercentage").innerHTML=examPercentage+'%';
    return examPercentage;
};

function participationHandler() {
    let participationPercentage = 0;
    if(document.getElementById("p1").value != ''){
        participationPercentage = Math.round((parseInt(document.getElementById("p1").value)*30)/100);
    }
    document.getElementById("pPercentage").innerHTML=participationPercentage+'%';
    return participationPercentage;
};

function calculateTotal(hw,q,e,p){
    return hw+q+e+p;
};

function displayTotal(total){
    document.getElementById("percentageTotal").innerHTML=total+"%";
};

function letterGradeHandler(total){
    if(total>89){
        document.getElementById("letterGrade").innerHTML="A";
        return 'A';
    }
    else if(total<90 && total>79){
        document.getElementById("letterGrade").innerHTML="B";
        return 'B';
    }
    else if(total<80 && total>69){
        document.getElementById("letterGrade").innerHTML="C";
        return 'C';
    }
    else if(total<70 && total>59){
        document.getElementById("letterGrade").innerHTML="D";
        return 'D';
    }
    else{
        document.getElementById("letterGrade").innerHTML="F";
        return 'F';
    }
};
function exportInformation(hw,q,e,p,t,l){
    exportText = "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>My grades</title><style>body{color:green;background: black;display: flex;flex-direction: column;align-items: center;justify-content: center;}td,th{border:solid 1px white;padding: 10px;}</style></head><body><h1>My Grades Fall 2023 Math 2300</h1><table><tr><th>Criterion</th><th>Grade</th></tr><tr><th>Homework</th><td>"+hw+"%"+"</td></tr><tr><th>Quizzes</th><td>"+q+"%"+"</td></tr><tr><th>Exams</th><td>"+e+"%"+"</td></tr><tr><th>Participation</th><td>"+p+"%"+"</td></tr><tr><th>Total</th><td>"+t+"%"+"</td></tr><tr><th>Letter Grade</th><td>"+l+"</td></tr></table></body></html>";
    var blob = new Blob([exportText], {type: "text/html;charset=utf-8"});
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "grades.html";
    link.click();
}