<template>

    <section id="monster" class="container">
        <h2>Santé du monstre</h2>
        <div class="healthbar">
            <div class="healthbar_value" :style="monsterBarStyles">{{monsterHealth}}%</div>
        </div>
        <p>Son arme : griffes, crocs, cornes et beaucoup d'agacement (2d8 de dégâts)</p>
    </section>

    <section id="player" class="container">
        <h2>Votre Santé</h2>
        <div class="healthbar">
            <div class="healthbar_value" :style="playerBarStyles">{{ playerHealth }}%</div>
        </div>
        <p>Votre arme : épée longue (2d6 de dégâts)</p>
    </section>

    <section id="controls">
        <button @click="attackMonster" :disabled="hasWinner">Attaque normale</button>
        <button @click="specialAttackMonster" :disabled="hasWinner">Attaque spéciale</button>
        <button @click="healPlayer" :disabled="hasWinner">Se soigner</button>
        <button @click="surrender" :disabled="hasWinner">Abdiquer</button>
    </section>

    <section id="log" class="container">
        <h2>Journal de combat</h2>
        <ul>
            <li
                v-for="(log, index) in battleLog"
                :key="index"
                :class="{
          'log--player': log.actionBy === 'player',
          'log--monster': log.actionBy === 'monster',
          'log--heal': log.actionType === 'heal',
          'log--damage': log.actionType === 'attack' || log.actionType === 'special-attack'
        }"
            >
                {{ log.actionBy }} a fait {{ log.actionType }} pour {{ log.actionValue }} points de dégâts
            </li>
        </ul>
    </section>

</template>

<script>

export default {
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            battleLog: []
        }
    },
    computed: {
        monsterBarStyles() {
            return { width: this.monsterHealth + '%' };
        },
        playerBarStyles() {
            return { width: this.playerHealth + '%' };
        },
        hasWinner() {
            return this.playerHealth <= 0 || this.monsterHealth <= 0;
        }
    },
    methods: {
        attackMonster() {
            const damage = this.getRandomValue(5, 12);
            this.monsterHealth -= damage;
            this.addLogMessage('player', 'attack', damage);
            this.attackPlayer(); // Le monstre attaque en retour
        },
        attackPlayer() {
            const damage = this.getRandomValue(8, 15);
            this.playerHealth -= damage;
            this.addLogMessage('monster', 'attack', damage);
        },
        specialAttackMonster() {
            const damage = this.getRandomValue(10, 25);
            this.monsterHealth -= damage;
            this.addLogMessage('player', 'special-attack', damage);
            this.attackPlayer();
        },
        healPlayer() {
            const healValue = this.getRandomValue(8, 20);
            this.playerHealth = Math.min(this.playerHealth + healValue, 100);
            this.addLogMessage('player', 'heal', healValue);
            this.attackPlayer();
        },
        surrender() {
            this.playerHealth = 0;
            this.addLogMessage('player', 'surrender', 0);
        },
        addLogMessage(who, what, value) {
            this.battleLog.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        },
        getRandomValue(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
    }
};

</script>