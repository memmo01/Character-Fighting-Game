$(document).ready(function() {
const characters={
    "dragon breathe":{
        name:"dragon breathe",
        age:103,
        attack:40,
        img:"./char1.JPG",
        defense:10,
        health:50
},"quick jack":{
        name:"quick jack",
        age:20,
        attack:30,
        img:"./char2.JPG",
        defense:40,
        health:50
    },"leaping laura":{
        name:"leaping laura",
        age:30,
        attack:60,
        img:"./char3.JPG",
        defense:20,
        health:50
    },"powerful czar":{
        name:"powerful czar",
        age:50,
        attack:50,
        img:"./char4.JPG",
        defense:10,
        health:50
    }}

    var selectedCharacter;
    var enemyCharacter;
    var enemyArr=[]



    var renderOne= function(charObj,areaDisplay,status){
        console.log(charObj.name)
        var char = $("<div class='character' data-name='"+charObj.name+"'>");
        var charName=$("<div class='character-name'>").text(charObj.name);
        var charAge=$("<div class='character-age'>").text("Age: "+charObj.age);
        var charAttack = $("<div class='character-attack'>").text("attack "+charObj.attack);
        var charDefense= $("<div class='character-defense'>").text("Defense: "+charObj.defense);
        var charHealth= $("<div class='character-health'>").text("Health: "+charObj.health);

        var charImg=$("<img src="+charObj.img+" alt='Character Image' class='charImage'>")

     
                $(char).append(charName).append(charImg).append(charAge).append(charAttack).append(charDefense).append(charHealth);
                $(areaDisplay).append(char)

                if(status==="selectedCharacter"){
                    $(char).attr("class","selectedCharacter")
                }
                if(status==="updateSelect"){
                    $(areaDisplay).html(char)
                     
                }
                if(status === "enemy"){
                    $(char).attr("class","enemies")
                }
                if(status === "updateEnemy"){
                    $(areaDisplay).html(char)
                }
                if(status === "selectedEnemy"){
                    $(char).attr("class","selectedEnemy");
                 
                    
                   

                }
    }



    var renderChar = function(charObj, areaDisplay,status){
        if(areaDisplay === "#characterList"){
            for(var key in charObj){
                renderOne(charObj[key],areaDisplay,"")
            }
        }

        else if(areaDisplay === "#selectedCharacter"){
           
            renderOne(charObj,areaDisplay,"selectedCharacter")

        }
        else if(areaDisplay === "#available-enemies"){
            for(var i=0;i<enemyArr.length;i++){
                renderOne(enemyArr[i],"#available-enemies",status)
            }
        }
        else if(areaDisplay === "enemyCharacter"){
            renderOne(charObj, "#selectedEnemy","")
        }

        $(".character").on("click",function(){
            var name=$(this).data("name");
            if(!selectedCharacter){
                selectedCharacter = characters[$(this).data("name")]
               
            }
            console.log(selectedCharacter)
            $("#characterList").hide()

            for(var key in characters){
                if(key !=name){
                    enemyArr.push(characters[key])
                }
            }
            console.log(enemyArr)
              renderChar(selectedCharacter,"#selectedCharacter")
            renderChar(enemyArr,"#available-enemies","enemy");

            
           
        })

        

        $(".enemies").on("click",function(){
         if(!enemyCharacter){
                enemyCharacter=characters[($(this).data("name"))]
                console.log(enemyCharacter)
         }
            $("#available-enemies").hide()
            renderOne(enemyCharacter,"#selectedEnemy","selectedEnemy")
            let attackBtn=$("<button>");
                        attackBtn.addClass("attackBtn");
                        attackBtn.text("Attack");
                        $("#selectedCharacter").append(attackBtn)

                        $(".attackBtn").on("click",function(e){
                            e.preventDefault()
                        beginBattle();
                    })
              
        })

    }


    function beginBattle(){
        console.log(selectedCharacter);
        console.log(enemyCharacter)

        var At = getScore(selectedCharacter.attack,selectedCharacter.defense)
        var En = getScore(enemyCharacter.attack,enemyCharacter.defense)

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

    function getScore(attackNum,defenseNum){
        var x =Math.floor(Math.random()*attackNum);
        var y =Math.floor(Math.random()*defenseNum);
        return x+y;
    }
renderChar(characters,"#characterList")


})