// declaring beginning variables
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;


// fight function
var fight = function(enemyName) {

  while(playerHealth > 0 && enemyHealth > 0) {

    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
    
    // check if player wants to skip
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + " has decided to skip this fight. Goodbye!");
        // subtract money from playerMoney for skipping
        playerMoney = Math.max(0, playerMoney - 10);
        console.log("playerMoney", playerMoney);
        break;
      }
    }

    // generate random damage value based on players attack power and deduct from enemy health
    var damage = randomNumber(playerAttack -3, playerAttack);

    enemyHealth = Math.max(0, enemyHealth - damage);

    console.log(
      playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + " has died!");

      //award player money for defeating enemy
      playerMoney = playerMoney + 20;
      //leave while loop since enemy is defeated
      break;
    } else {
      window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }

    // generate random damage value based on enemy attack power and deduct from player health
    var damage = randomNumber(enemyAttack - 3, enemyAttack);

    playerHealth = Math.max(0, playerHealth - damage);
    
    console.log(
      enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + " has died!");
      break;
    } else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }
  } //end of while loop
}; // end of fight function


// start game fucntion
var startGame = function() {
  //reset player stats
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;

  for(var i = 0; i < enemyNames.length; i++) {

    if (playerHealth > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));
      var pickedEnemyName = enemyNames[i];
      enemyHealth = randomNumber(40, 60);
      fight(pickedEnemyName);

      //go to shop if this isn't the last enemy and player is still alive
      if (playerHealth > 0 && i < enemyNames.length - 1) {
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
  if (playerHealth > 0) {
    window.alert("Congrats, you did it! Your score is " + playerMoney + ".");
  }
  else {
    window.alert("Your robot died in battle.");
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
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 'REFILL', 'UPGRADE' or 'LEAVE' to choose."
  );

  //use switch to decide what to do with user choice
  switch (shopOptionPrompt) {
    case "REFILL":
    case "refill":
      if (playerMoney >= 7) {
        window.alert("Refilling player's health by 20 for 7 dollars.");
        playerHealth = playerHealth + 20;
        playerMoney = playerMoney - 7;
      }
      else {
        window.alert("You don't have enough money!");
      }
      break;
    case "UPGRADE":
    case "upgrade":
      if (playerMoney >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");
        playerAttack = playerAttack + 6;
        playerMoney = playerMoney - 7;
      }
      else {
        window.alert("You don't have enough money!");
      }
      break;
    case "LEAVE":
    case "leave":
      window.alert("Leaving the store.");
      break;
    default: 
      window.alert("Not a valid option, try again");
      shop();
      break;
  }
};

// random number generator function
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};


startGame();
