// 伤害计算模块

// 计算伤害函数
function calculateDamage(attacker, defender, weapon) {
    // 基础伤害
    let baseDamage = attacker.attackPower || 0;
    
    // 武器伤害加成
    if (weapon) {
        baseDamage += weapon.damage;
    }
    
    // 计算最终伤害
    const finalDamage = Math.max(1, baseDamage); // 确保至少造成1点伤害
    
    return finalDamage;
}

// 检测攻击范围
function checkAttackRange(attacker, defender, weapon) {
    const attackRange = weapon ? weapon.range : 0;
    const direction = attacker.facingLeft ? -1 : 1;
    
    // 攻击范围矩形
    const attackRect = {
        x: attacker.x + (direction > 0 ? attacker.width : -attackRange),
        y: attacker.y,
        width: attackRange,
        height: attacker.height
    };
    
    // 检测碰撞
    return checkCollision(attackRect, defender);
}

// 碰撞检测
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

export { calculateDamage, checkAttackRange, checkCollision };