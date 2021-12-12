function sqlInjectionTautology(){
    document.getElementById("borderGrade").value="0 OR 1=1"
}

function sqlInjectionUnion(){
    document.getElementById("borderGrade").value="0 UNION SELECT id, NULL, name, NULL ,address from users"
}

function deserializeExploit(){
    document.getElementById("object").innerHTML='{"name":"_$$ND_FUNC$$_function (){originObj.send(\'<script>javascript:alert(\\"Uspio pokrenuti kod na serveru!\\");window.location.href=\\"/\\"</script>\');}()","age":24}'
}

function sqlInjectionProtectionOn(){
    document.getElementById("filterGradesForm").action="/filterGradesProtected"
    document.getElementById("protectionStatus").innerText="Zaštita protiv SQL umetanja: UKLJUČENA"

    document.getElementById("protectionStatusButton").innerText="ISKLJUČI"
    document.getElementById("protectionStatusButton").onclick=sqlInjectionProtectionOff
}

function sqlInjectionProtectionOff(){
    document.getElementById("filterGradesForm").action="/filterGrades"
    document.getElementById("protectionStatus").innerText="Zaštita protiv SQL umetanja: ISKLJUČENA"

    document.getElementById("protectionStatusButton").innerText="UKLJUČI"
    document.getElementById("protectionStatusButton").onclick=sqlInjectionProtectionOn
}

function xxeProtectionOn(){
    //document.getElementById("filterGradesForm").action="/filterGradesProtected"
    document.getElementById("protectionStatus").innerText="Zaštita protiv XXE: UKLJUČENA"

    document.getElementById("protectionStatusButton").innerText="ISKLJUČI"
    document.getElementById("protectionStatusButton").onclick=xxeProtectionOff
}

function xxeProtectionOff(){
    //document.getElementById("filterGradesForm").action="/filterGrades"
    document.getElementById("protectionStatus").innerText="Zaštita protiv XXE: ISKLJUČENA"

    document.getElementById("protectionStatusButton").innerText="UKLJUČI"
    document.getElementById("protectionStatusButton").onclick=xxeProtectionOn
}

function deserializationProtectionOff(){
    document.getElementById("deserializeForm").action="/deserialize"
    document.getElementById("protectionStatus").innerText="Zaštita protiv nesigurne deserijalizacije: ISKLJUČENA"

    document.getElementById("protectionStatusButton").innerText="UKLJUČI"
    document.getElementById("protectionStatusButton").onclick=deserializationProtectionOn
}

function deserializationProtectionOn(){
    document.getElementById("deserializeForm").action="/deserializeProtected"
    document.getElementById("protectionStatus").innerText="Zaštita protiv nesigurne deserijalizacije: UKLJUČENA"

    document.getElementById("protectionStatusButton").innerText="ISKLJUČI"
    document.getElementById("protectionStatusButton").onclick=deserializationProtectionOff
}