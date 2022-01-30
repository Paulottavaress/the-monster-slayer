new Vue({
    el: '#app',
  data: {
    playerHP: 100,
    monsterHP: 100,
    isGameRunning: false
  },
  watch: {
    monsterHP() {
        console.log(this.monsterHP);
      if (this.monsterHP <= 0) {
        alert('You won!');
        this.isGameRunning = false;
      }
    },
    playerHP() {
      if (this.playerHP <= 0) {
        alert('Game over!');
        this.isGameRunning = false;
      }
    },
  },
  methods: {
      startNewGame() {
        this.playerHP = 100;
        this.monsterHP = 100;
        this.isGameRunning = true;
      },
      attack() {
        const hit = Math.floor(Math.random() * (10 - 1)) + 1;

        this.monsterHP = (hit >= this.monsterHP) ? 0 : this.monsterHP -= hit;
      },
      specialAttack() {
        this.monsterHP = (10 >= this.monsterHP) ? 0 : this.monsterHP -= 10;
      },
      heal() {
        this.playerHP = (this.playerHP <= 90) ? this.playerHP += 10 : 100;
      },
      giveUp() {
        this.isGameRunning = false;
      },
  }
});