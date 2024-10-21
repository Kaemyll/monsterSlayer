<template>

    <section id="round" class="round-section">
        <div class="round-bubble">
            Round {{ currentRound }}
        </div>
    </section>

    <section id="monster" class="container">
        <h2>Santé du monstre</h2>
        <div class="healthbar">
            <div class="healthbar__value" :style="monsterBarStyles">{{ monsterHealth }}%</div>
        </div>
        <p>Son arme : griffes, crocs, cornes et beaucoup d'agacement (2d8 de dégâts)</p>
    </section>

    <section id="player" class="container">
        <h2>Votre Santé</h2>
        <div class="healthbar">
            <div class="healthbar__value" :style="playerBarStyles">{{ playerHealth }}%</div>
        </div>
        <p>Votre arme : épée longue (2d6 de dégâts)</p>
    </section>

    <section id="controls">
        <button @click="attackMonster" :disabled="hasWinner">Attaque normale</button>
        <button @click="specialAttackMonster" :disabled="mayUseSpecialAttack">Attaque spéciale</button>
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
          'log--player': log.actionBy === 'Le joueur',
          'log--monster': log.actionBy === 'Le monstre',
          'log--heal': log.actionType === 'se soigne',
          'log--damage': log.actionType === 'attaque' || log.actionType === 'patate de forain'
        }"
            >
                {{ battleLog.length - index }}: {{ log.actionBy }} --> {{ log.actionType }} pour {{ log.actionValue }} de santé
            </li>
        </ul>
    </section>

</template>

<script>

function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export default {
    data() {
        return {
            currentRound: 0,
            playerHealth: 100,
            monsterHealth: 100,
            battleLog: []
        }
    },
    computed: {
        monsterBarStyles() {
            return {width: this.monsterHealth > 0 ? this.monsterHealth + '%' : '0%'};
        },
        playerBarStyles() {
            return {width: this.playerHealth > 0 ? this.playerHealth + '%' : '0%'};
        },
        hasWinner() {
            return this.playerHealth <= 0 || this.monsterHealth <= 0;
        },
        mayUseSpecialAttack() {
            return this.currentRound % 4 !== 0
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const damage = getRandomValue(2, 12); // 2d6 de dommages
            this.monsterHealth -= damage;
            this.addLogMessage('Le joueur', 'attaque', damage);
            if (this.monsterHealth < 0) {
                this.monsterHealth = 0;
            }
            if (!this.hasWinner) {
                this.attackPlayer(); // Le monstre attaque en retour
            }
        },
        attackPlayer() {
            const damage = getRandomValue(2, 16); // 2d8 de dommages
            this.playerHealth -= damage;
            this.addLogMessage('Le monstre', 'attaque', damage);
            if (this.playerHealth < 0) {
                this.playerHealth = 0;
            }
        },
        specialAttackMonster() {
            this.currentRound++;
            const damage = getRandomValue(3, 30); // 3d10 de dommages
            this.monsterHealth -= damage;
            this.addLogMessage('Le joueur', 'patate de forain', damage);
            if (this.monsterHealth < 0) {
                this.monsterHealth = 0;
            }
            if (!this.hasWinner) {
                this.attackPlayer(); // Le monstre attaque en retour
            }
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(4, 24); // 4d6 de soins
            this.playerHealth = Math.min(this.playerHealth + healValue, 100);
            this.addLogMessage('Le joueur', 'se soigne', healValue);
            if (!this.hasWinner) {
                this.attackPlayer(); // Le monstre attaque en retour
            }
        },
        surrender() {
            this.playerHealth = 0;
            this.addLogMessage('Le joueur', 'rentre chez sa mère, ce lâche', 0);
        },
        addLogMessage(who, what, value) {
            this.battleLog.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        },
    }
};

</script>