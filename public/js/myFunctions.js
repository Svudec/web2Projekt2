function sqlInjectionTautology(){
    document.getElementById("borderGrade").value="0 OR 1=1"
}

function sqlInjectionUnion(){
    document.getElementById("borderGrade").value="0 UNION SELECT id, NULL, name, NULL ,address from users"
}