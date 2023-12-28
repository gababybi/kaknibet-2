class Fighter {
    constructor(name, health, armor, damage, endurance, agility, cunning) {
      this.name = name;
      this.health = health + endurance * 5;
      this.armor = armor;
      this.damage = damage + agility * 3;
      this.endurance = endurance;
      this.agility = agility;
      this.cunning = cunning;
      this.maxCunning = 8;

    }
  
    showStats() {
      console.log(`${this.name}: Здоровье - ${this.health}, Броня - ${this.armor}, Урон - ${this.damage}`);
    }
  
    showCurrentHealth() {
      console.log(`${this.name}: Текущее здоровье - ${this.health}`);
    }
  
    takeDamage(damage) {
      const adjustedDamage = damage * (1 - this.armorAdjustment());
      this.health -= adjustedDamage;
    }
  
    startFight(opponent) {
      let rounds = 1;
      while (this.health > 0 && opponent.health > 0) {
        console.log(`Раунд ${rounds}`);
        this.attack(opponent);
        if (opponent.health <= 0) {
          console.log(`${this.name} побеждает!`);
        } else {
          opponent.attack(this);
          if (this.health <= 0) {
            console.log(`${opponent.name} побеждает!`);
          }
        }
        rounds++;
      }
    }
  
    attack(opponent) {
      const damage = this.damageAdjustment();
      opponent.takeDamage(damage);
      console.log(`${this.name} атакует ${opponent.name} и наносит ${damage} урона.`);
      opponent.showCurrentHealth();
    }
  
    armorAdjustment() {
      let adjustedArmor = this.armor - this.cunning * 0.25;
      if (adjustedArmor < 0) {
        adjustedArmor = 0;
      }
      return adjustedArmor / 100;
    }
  
    damageAdjustment() {
      return this.damage * (1 + this.agility / 100);
    }
  }
  
  const fighters = [
    
  ];
  function sozdatBoyca() {
    const name = prompt("Введите имя нового бойца:");
    const health = parseInt(prompt("Введите здоровье нового бойца:"));
    const armor = parseInt(prompt("Введите броню нового бойца (до 200 единиц):"));
    const damage = parseInt(prompt("Введите урон нового бойца:"));
    const endurance = parseInt(prompt("Введите выносливость нового бойца:"));
    const agility = parseInt(prompt("Введите ловкость нового бойца:"));
    const cunning = parseInt(prompt("Введите хитрость нового бойца (не более 8 единиц):"));
  
    const newFighter = new Fighter(name, health, armor, damage, endurance, agility, cunning);
    fighters.push(newFighter);
  
    pokazatSpisokBoycov();
  
    fightersContainer.innerHTML += `<p>Создан новый боец: ${newFighter.name}</p>`;
  }
  function pokazatSpisokBoycov() {
    fighters.forEach(fighter => fighter.showStats());
  }
  
  const fightersContainer = document.getElementById('fightersList');
  const selectedFightersContainer = document.getElementById('selectedFighters');
  const battleLogContainer = document.getElementById('battleLog');
  
  function pokazatSpisokBoycov() {
    fightersContainer.innerHTML = "<h3>Список бойцов:</h3>";
    fighters.forEach((fighter, index) => {
      fightersContainer.innerHTML += `<p>${index + 1}. ${fighter.name} - Здоровье: ${fighter.health}, Броня: ${fighter.armor}, Урон: ${fighter.damage}</p>`;
    });
  }
  function sozdatRandomBoyca(){
    const name = prompt("Введите имя нового бойца:");
    const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    const health = getRandomValue(80, 120);
    const armor = getRandomValue(30, 70);
    const damage = getRandomValue(18, 24);
    const endurance = getRandomValue(3, 8);
    const agility = getRandomValue(7, 15);
    const cunning = getRandomValue(1, 8);
    
      const newFighter = new Fighter(name, health, armor, damage, endurance, agility, cunning);
      fighters.push(newFighter);
    
      pokazatSpisokBoycov();
    
      fightersContainer.innerHTML += `<p>Создан новый рандомный боец: ${newFighter.name}</p>`;
    }
    function nachatBoy() {
        if (selectedFighters.length === 2) {
          const fighter1 = selectedFighters[0];
          const fighter2 = selectedFighters[1];
      
          const initialHealth1 = fighter1.health;
          const initialHealth2 = fighter2.health;
      
          fighter1.startFight(fighter2);
      
          fighter1.health = initialHealth1;
          fighter2.health = initialHealth2;
      
          resetFighters();
        } else {
          console.log("Выберите двух бойцов перед началом боя!");
        }
      }
      function vybratBoyca() {
        selectedFightersContainer.innerHTML = "<h3>Выбранные бойцы:</h3>";
        pokazatSpisokBoycov(); 
        const fighter1Index = prompt("Выберите первого бойца (введите номер):");
        const fighter2Index = prompt("Выберите второго бойца (введите номер):");
        selectedFighters = [fighters[fighter1Index - 1], fighters[fighter2Index - 1]];
        selectedFightersContainer.innerHTML += `<p>${selectedFighters[0]. name} vs ${selectedFighters[1].name}</p>`;
      }
      function reloadPage(){
        location.reload();
      }
      
      
      function resetFighters() {
        selectedFighters = [];
        selectedFightersContainer.innerHTML = "";
        pokazatSpisokBoycov();
        const selectFightersButton = document.createElement("button");
        selectFightersButton.textContent = "Выбрать бойцов";
        selectFightersButton.onclick = vybratBoyca;
        selectedFightersContainer.appendChild(selectFightersButton);
      }
      function monitorBattle() {
        if (selectedFighters.length === 2) {
          const fighter1 = selectedFighters[0];
          const fighter2 = selectedFighters[1];
          battleLogContainer.innerHTML += `<p>Бой между ${fighter1.name} и ${fighter2.name} начинается!</p>`;
          fighter1.nachatBoy(fighter2);
        } else {
          battleLogContainer.innerHTML += "<p>Выберите двух бойцов перед началом боя!</p>";
        }
      }
      function noviyBoy() {
        selectedFighters = [];
        fightersContainer.innerHTML = "";
        selectedFightersContainer.innerHTML = "";
        battleLogContainer.innerHTML = "";
        pokazatSpisokBoycov();
      
        const selectFightersButton = document.createElement("button");
        selectFightersButton.textContent = "Выбрать бойцов";
        selectFightersButton.onclick = vybratBoyca;
        selectedFightersContainer.appendChild(selectFightersButton);
      }