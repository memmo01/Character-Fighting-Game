$(document).ready(function() {
const characters={
    "Dragon Breathe":{
        name:"Dragon Breathe",
        age:103,
        attack:40,
        img:"./images/char1.JPG",
        defense:10,
        health:50
},"Quick Jack":{
        name:"Quick Jack",
        age:20,
        attack:30,
        img:"./images/char2.JPG",
        defense:40,
        health:50
    },"Leaping Laura":{
        name:"Leaping Laura",
        age:30,
        attack:60,
        img:"./images/char3.JPG",
        defense:20,
        health:50
    },"Powerful Czar":{
        name:"Powerful Czar",
        age:50,
        attack:50,
        img:"./images/char4.JPG",
        defense:10,
        health:50
    }}

    let selectedCharacter;
    let enemyCharacter;
    let enemyArr=[]



    let renderOne= function(charObj,areaDisplay,status){
        console.log(charObj.name)
        let char = $("<div class='character' data-name='"+charObj.name+"'>");
        let charName=$("<div class='character-name'>").text(charObj.name);
        let charAge=$("<div class='character-age'>").text("Age: "+charObj.age);
        let charAttack = $("<div class='character-attack'>").text("attack "+charObj.attack);
        let charDefense= $("<div class='character-defense'>").text("Defense: "+charObj.defense);
        let charHealth= $("<div class='character-health'>").text("Health: "+charObj.health);

        let charImg=$("<img src="+charObj.img+" alt='Character Image' class='charImage'>")

     
                $(char).append(charName).append(charImg).append(charAge).append(charAttack).append(charDefense).append(charHealth);
                $(areaDisplay).append(char)

                if(status==="selectedCharacter"){
                    $(char).attr("class","selectedCharacter")
                }
                if(status==="updateSelect"){
                    $(areaDisplay).html(char)
                    $(".character").css("margin-left","0")
                    $(".character").css("border","none")
                     
                }
                if(status === "enemy"){
                    $(char).attr("class","enemies")
                }
                if(status === "updateEnemy"){
                    $(areaDisplay).html(char)
                }
                if(status === "selectedEnemy"){
                    $(char).attr("class","selectedEnemy");
                    $("#Vs").css("display","block")
                   
                 
                    
                   

                }
    }



    let renderChar = function(charObj, areaDisplay,status){
        if(areaDisplay === "#characterList"){
            for(let key in charObj){
                renderOne(charObj[key],areaDisplay,"")
            }
        }

        else if(areaDisplay === "#selectedCharacter"){
           
            renderOne(charObj,areaDisplay,"selectedCharacter")

        }
        else if(areaDisplay === "#available-enemies"){
            for(let i=0;i<enemyArr.length;i++){
                renderOne(enemyArr[i],"#available-enemies",status)
            }
        }
        else if(areaDisplay === "enemyCharacter"){
            renderOne(charObj, "#selectedEnemy","")
        }



        $(".character").on("click",function(){
            $("#title").html("<h3>Choose Your Enemy</h3>")
            let name=$(this).data("name");
            if(!selectedCharacter){
                selectedCharacter = characters[$(this).data("name")]
               
            }
            console.log(selectedCharacter)
            $("#characterList").hide()

            for(let key in characters){
                if(key !=name){
                    enemyArr.push(characters[key])
                }
            }
            console.log(enemyArr)
              renderChar(selectedCharacter,"#selectedCharacter")
            renderChar(enemyArr,"#available-enemies","enemy");

            
           
        })

        

        $(".enemies").on("click",function(){
            $("#title").css("display","none")
         if(!enemyCharacter){
                enemyCharacter=characters[($(this).data("name"))]
                console.log(enemyCharacter)
         }
            $("#available-enemies").hide()
            renderOne(enemyCharacter,"#selectedEnemy","selectedEnemy")
            let btnDiv=$("<div>");
                btnDiv.addClass("btnDiv");

            let attackBtn=$("<div>");
                        attackBtn.addClass("attackBtn");
                        attackBtn.text("Attack");

                $(btnDiv).html(attackBtn);
                        $("#selectedCharacter").append(btnDiv)

                        $(".attackBtn").on("click",function(e){
                            e.preventDefault()
                        beginBattle();
                    })
              
        })

    }

 


    function beginBattle(){
        console.log(selectedCharacter);
        console.log(enemyCharacter)

        let At = getScore(selectedCharacter.attack,selectedCharacter.defense)
        let En = getScore(enemyCharacter.attack,enemyCharacter.defense)

         if(At>En){update("win")}else{update("loss")}
        


        function update(status){
            if(enemyCharacter.health === 0 || selectedCharacter.health === 0){
                
            }
             if(status === "win"){
                enemyCharacter.health -=5;
                if(enemyCharacter.health <= 0){
                    enemyCharacter.health=0;
                    renderOne(enemyCharacter,".selectedEnemy","updateSelect")
                    $(".attackBtn").attr("disabled","disabled")
                    alert("youwin!")
                    console.log(enemyArr)
                    updateEnemyArr()
                }
                else{
                    
                 renderOne(enemyCharacter,".selectedEnemy","updateSelect")
                }
            }
            else if(status === "loss"){
                selectedCharacter.health -=5;
                if(selectedCharacter.health <=0){
                    selectedCharacter.health=0;
                    renderOne(selectedCharacter,".selectedCharacter","updateSelect")
                $(".attackBtn").attr("disabled","disabled")
                    alert("you lose!")
                    
                }else{
                     renderOne(selectedCharacter,".selectedCharacter","updateSelect")
                }

                }
                

            }
           
            
        
    }

    //if you defeat a character then if removes that character from the array of enemies. It then runs a function
    //to populate the remaining enemies to choose to fight against until all have been defeated.
           function updateEnemyArr(){
        if(enemyArr.length == 0){
            alert("You won the tournament!")
        }else{
            let gg=enemyArr.findIndex(x=> x.name === enemyCharacter.name);
            console.log(gg)
            enemyArr.splice(gg,1);
            console.log("_____________")
            console.log(enemyArr)
            console.log(enemyCharacter.name)
            enemyCharacter='';
            clearSections()
          
            renderChar(enemyArr,"#available-enemies","enemy")
        }
    }

    
    //emptys divs ----
    function clearSections(){
    $(".btnDiv").empty()
      $("#available-enemies").empty()
            $("#selectedEnemy").empty()
            $("#available-enemies").show()
}
    

//calculates score to determine who will gain or lose points
function getScore(attackNum,defenseNum){
        let x =Math.floor(Math.random()*attackNum);
        let y =Math.floor(Math.random()*defenseNum);
        return x+y;
    }
renderChar(characters,"#characterList")


})