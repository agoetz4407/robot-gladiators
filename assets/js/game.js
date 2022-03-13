// Robot Gladiators

// fight function
var fight = function(enemy) {
  console.log(enemy);
  
  var isPlayerTurn = true;

  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  } 

  while(playerInfo.health > 0 && enemy.health > 0) {

    if (isPlayerTurn) {
    // ask player if they want to fight or skip with function
      if (fightOrSkip()) {
        //if true - leave fight
        break
      }

      // generate random damage value based on players attack power and deduct from enemy health
      var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);

      enemy.health = Math.max(0, enemy.health - damage);

      console.log(
        playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
      );

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");

        //award player money for defeating enemy
        playerInfo.money = playerInfo.money + 20;
        //leave while loop since enemy is defeated
        break;
      } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
      }
    }
    else {
      // generate random damage value based on enemy attack power and deduct from player health
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

      playerInfo.health = Math.max(0, playerInfo.health - damage);
      
      console.log(
        enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
      );

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        break;
      } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
      }
    }
    // switch turn order by reversing isPlayerTurn boolean value
    isPlayerTurn = !isPlayerTurn;
  } //end of while loop
}; // end of fight function


// start game fucntion
var startGame = function() {
  //reset player stats
  playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {

    if (playerInfo.health > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));
      var pickedEnemyObj = enemyInfo[i];
      pickedEnemyObj.health = randomNumber(40, 60);
      fight(pickedEnemyObj);

      //go to shop if this isn't the last enemy and player is still alive
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        //ask player if they want to shop
        var storeConfirm = window.confirm("The fight is over, would you like to visit the store before the next round?")

        // if yes, run shop function
        if (storeConfirm) {
          shop();
        }
      }
    }

    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }
  //call end game function
  endGame();
};


// end game function
var endGame = function() {

  //ending alerts
  if (playerInfo.health > 0) {
    window.alert("Congrats, you did it! Your score is " + playerInfo.money + ".");

    //high score checking and storage with messages to player
    var highScore = localStorage.getItem("highscore");
    var name = localStorage.getItem("name");
    //setting high score to zero if none is set
    highScore = highScore || 0
    console.log(`The current high score is ${highScore}, set by ${name}`);

    //checking if player set a new high score and setting it if that's the case
    if (playerInfo.money > highScore) {
      window.alert(`${playerInfo.name} got a new high score of ${playerInfo.money}, beating the old score of ${highScore}!`);
      localStorage.setItem("highscore", playerInfo.money);
      localStorage.setItem("name", playerInfo.name);
    }
    else {
      window.alert(`${playerInfo.name} did not beat the high score of ${highScore} set by ${name}. Better luck next time!`);
    }

  }
  else {
    window.alert("Your robot died in battle. Better luck next time!");
  }

  // ending question - restart or end
  var playAgainConfirm = window.confirm("Would you like to play again?");
  
  if (playAgainConfirm) {
    startGame();
  }
  else {
    window.alert("Thank you for playing Robot Gladiators! Come Back Soon!")
  }
};


// shop function
var shop = function() {
  //ask player what they would like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 to REFILL, 2 to UPGRADE, or 3 to LEAVE."
  );

  shopOptionPrompt = parseInt(shopOptionPrompt);

  //use switch to decide what to do with user choice
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHeath();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert("Leaving the store.");
      break;
    default: 
      window.alert("Not a valid option, try again");
      shop();
      break;
  }
};

// get player name function
var getPlayerName = function() {
  var name = "";

  while(!name) {
    name = prompt("What is your robot's name?")
  }
  console.log("Your robot's name is " + name);
  return name;
};

// fight or skip function
var fightOrSkip = function() {
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "skip" to skip at the cost of 10 points, or enter anything else to fight!');

    // Conditional Recursive Function Call
    if (!promptFight) {
      window.alert("You need to provide a valid answer! Please try again.");
      return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();
    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to SKIP this round?");
  
      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight at the cost of 10 points.");
        // subtract money from playerMoney for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log(playerInfo.name + " has " + playerInfo.money + " points.");
        return true;
      }
    }
    return false;
}

// random number generator function
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

//player object
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHeath: function() {
    if (this.money >= 7){
      window.alert("Refilling " + playerInfo.name + "'s health by 20 for 7 points.");
    this.health += 20;
    this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading " + playerInfo.name + "'s attack by 6 for 7 points.")
      this.attack += 6;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough points!");
    }
  }
};

// array of enemy objects
var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

startGame();
