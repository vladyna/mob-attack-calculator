let dmg_base = 1;
let dmg_max = 1;
let skillLevel = 1;
let skillMod = 1;
let casterStrength = 1;
let casterDamageModifier = 1;
let DAMAGE_HITROLL_MODIFIER = 1;
let Damage_Resistance_Stat = 1;
let FLAT_ARMOR_DAMAGE_CALCULATIONS = 1;
let DAMAGE_TAKEN_MODIFIER = 1;
let criticalChance = 1;
let criticalPower = 1;


function CalculateDamage() {
    FetStats();
    let dmg = 0;
    dmg = PlainDamageCalculation(dmg);
    dmg = ModifyBySkillLevel(dmg);
    dmg = ApplyPowerStat(dmg);
    dmg = DamageDealtModifier(dmg);
    dmg = DamageHitRollModifier(dmg);
    dmg = ArmorReducingDamage(dmg);
    dmg = DamageTakenModifier(dmg);
    dmg = CriticalDamage(dmg);
    console.log(dmg);
    document.getElementById("result").textContent = "Rounded(atavism rounding):" + Math.round(Math.ceil(dmg)) + "; Raw Value: " + dmg;
}

function FetStats() {
    dmg_base = Number(document.getElementById("dmg_base").value);
    dmg_max = Number(document.getElementById("dmg_max").value);
    skillLevel = Number(document.getElementById("skillLevel").value);
    skillMod = Number(document.getElementById("skillMod").value);
    casterStrength = Number(document.getElementById("casterStrength").value);
    casterDamageModifier = Number(document.getElementById("casterDamageModifier").value);
    DAMAGE_HITROLL_MODIFIER = Number(document.getElementById("DAMAGE_HITROLL_MODIFIER").value);
    Damage_Resistance_Stat = document.getElementById("Damage_Resistance_Stat").value;
    FLAT_ARMOR_DAMAGE_CALCULATIONS = document.getElementById("FLAT_ARMOR_DAMAGE_CALCULATIONS").checked;
    DAMAGE_TAKEN_MODIFIER = document.getElementById("DAMAGE_TAKEN_MODIFIER").value;
    criticalChance = document.getElementById("criticalChance").value;
    criticalPower = document.getElementById("criticalPower").value;
}

function PlainDamageCalculation(dmg) {
    console.log(dmg_base);
    console.log(dmg_max);
    if (dmg_max <= dmg_base) {
        dmg += dmg_base;
    } else {
        dmg += dmg_base + Math.floor(Math.random() * (dmg_max - dmg_base));
    }
    return dmg;
}

function ModifyBySkillLevel(dmg) {
    return dmg += skillMod * skillLevel;
}

function ApplyPowerStat(dmg) {
    let strengthModifier = casterStrength / 25.0;
    return dmg += dmg * strengthModifier;
}

function DamageDealtModifier(dmg) {
    casterDamageModifier /= 100.0;
    return dmg += dmg * casterDamageModifier;
}

function DamageHitRollModifier(dmg) {
    let roll = Math.floor(Math.random() * 100);
    console.log(roll);
    console.log(((roll / (100 / DAMAGE_HITROLL_MODIFIER) + (100 - DAMAGE_HITROLL_MODIFIER)) / 100.0));
    return dmg *= ((roll / (100 / DAMAGE_HITROLL_MODIFIER) + (100 - DAMAGE_HITROLL_MODIFIER)) / 100.0);
}

function ArmorReducingDamage(dmg) {
    let targetArmor = Damage_Resistance_Stat;
    if (!FLAT_ARMOR_DAMAGE_CALCULATIONS) {
        let damageFlat = dmg * 0.01;
        let damageVar = dmg * 0.99 - targetArmor;
        if (damageVar < 0)
            damageVar = 0;
        dmg = damageFlat + damageVar;
    } else {
        dmg -= targetArmor;
    }
    return dmg;
}

function DamageTakenModifier(damage) {
    let targetDamageModifier = DAMAGE_TAKEN_MODIFIER;
    targetDamageModifier /= 100.0;
    damage += damage * targetDamageModifier;
    if (damage <= 1) {
        damage = 1.0;
    }
    return damage;
}

function CriticalDamage(dmg) {
    let criticalChanceCalculated = criticalChance;
    let rand = Math.random() * 1;
    let damage = dmg;
    if (rand < (criticalChanceCalculated / 100.0)) {
        let criticalPowerCalculated = criticalPower;
        let modValue = criticalPowerCalculated / 100;
        damage = dmg + dmg * modValue;
    }
    return damage;
}