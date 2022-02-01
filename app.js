new Vue({
    el: '#app',
  data: {
    playerHP: 100,
    monsterHP: 100,
    isGameRunning: false,
    turn: 0,
    log: []
  },
  computed: {
    showLog() {
        return this.turn > 0;
    }
  },
  watch: {
    monsterHP() {
      this.endGame();
    },
    playerHP() {
      this.endGame();
    },
    turn() {
      if (this.turn > 0 && this.monsterHP > 0) {
        const hit = Math.floor(Math.random() * (13 - 1)) + 1;
        this.playerHP = (hit >= this.playerHP) ? 0 : this.playerHP -= hit;
    
        this.log.unshift(`MONSTER HITS PLAYER FOR ${hit}`);
      }
    }
  },
  methods: {
      startNewGame() {
        this.playerHP = 100;
        this.monsterHP = 100;
        this.turn = 0;
        this.log = [];
        this.isGameRunning = true;
      },
      attack() {
        const hit = Math.floor(Math.random() * (10 - 1)) + 1;
        this.monsterHP = (hit >= this.monsterHP) ? 0 : this.monsterHP -= hit;

        this.log.unshift(`PLAYER HITS MONSTER FOR ${hit}`);
        this.turn++;
      },
      specialAttack() {
        this.monsterHP = (10 >= this.monsterHP) ? 0 : this.monsterHP -= 10;

        this.log.unshift('PLAYER HITS MONSTER FOR 10');
        this.turn++;
      },
      heal() {
        this.playerHP = (this.playerHP <= 90) ? this.playerHP += 10 : 100;

        this.log.unshift('PLAYER HEALS HIMSELF FOR 10');
        this.turn++;
      },
      giveUp() {
        this.isGameRunning = false;
      },
      endGame() {
        if (this.monsterHP <= 0) {
          if (confirm('The monster was defeated! New game?')) {
            this.startNewGame();
          } else {
            this.isGameRunning = false;
          }
        } else if (this.playerHP <= 0) {
          if (confirm('The monster ate you! New game?')) {
            this.startNewGame();
          } else {
            this.isGameRunning = false;
          }
        }
      }
  }
});