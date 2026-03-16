// 动画效果模块

// 绘制玩家攻击动画
function drawPlayerAttack(ctx, player, camera, assets) {
    if (player.isAttacking && player.currentWeapon) {
        const weapon = player.currentWeapon;
        const direction = player.facingLeft ? -1 : 1;
        const attackRange = weapon.range;
        
        // 计算攻击范围位置
        const attackX = player.x + (direction > 0 ? player.width : -attackRange);
        const attackY = player.y;
        
        // 绘制攻击范围
        ctx.save();
        ctx.globalAlpha = 0.3;
        
        // 绘制攻击范围矩形
        ctx.fillStyle = '#00FFFF';
        ctx.fillRect(attackX - camera.x, attackY - camera.y, attackRange, player.height);
        
        ctx.restore();
        
        // 绘制武器图标在攻击范围内闪烁
        ctx.save();
        ctx.globalAlpha = 0.5;
        
        if (assets.loaded && assets[weapon.type]) {
            const flash = Math.sin(player.attackTimer * 0.3) > 0;
            if (flash) {
                // 计算武器图标的位置
                const weaponDrawX = attackX - camera.x + (attackRange - weapon.width) / 2;
                const weaponDrawY = attackY - camera.y + (player.height - weapon.height) / 2;
                
                // 朝左时翻转武器图标
                if (player.facingLeft) {
                    ctx.save();
                    ctx.translate(weaponDrawX + weapon.width, weaponDrawY);
                    ctx.scale(-1, 1);
                    ctx.drawImage(assets[weapon.type], 0, 0, weapon.width, weapon.height);
                    ctx.restore();
                } else {
                    ctx.drawImage(assets[weapon.type], weaponDrawX, weaponDrawY, weapon.width, weapon.height);
                }
            }
        } else {
            // 默认武器图标
            const flash = Math.sin(player.attackTimer * 0.3) > 0;
            if (flash) {
                ctx.fillStyle = '#FFFF00';
                ctx.fillRect(attackX - camera.x, attackY - camera.y, attackRange, player.height);
            }
        }
        
        ctx.restore();
    }
}

// 绘制boss死亡动画
function drawBossDeath(ctx, boss, camera, assets, isBoss2 = false) {
    // 死亡动画效果
    if (boss.isDying) {
        // 闪烁效果
        const flash = Math.sin(boss.deathTimer * 0.5) > 0;
        if (flash) {
            if (assets.loaded && (isBoss2 ? assets.boss2 : assets.boss)) {
                ctx.drawImage(
                    isBoss2 ? assets.boss2 : assets.boss,
                    boss.x - camera.x, 
                    boss.y - camera.y, 
                    boss.width, 
                    boss.height
                );
            } else {
                // 默认boss
                ctx.fillStyle = isBoss2 ? '#FF6600' : '#FF00FF';
                ctx.fillRect(boss.x - camera.x, boss.y - camera.y, boss.width, boss.height);
            }
        }
    } else {
        if (assets.loaded && (isBoss2 ? assets.boss2 : assets.boss)) {
            ctx.drawImage(
                isBoss2 ? assets.boss2 : assets.boss,
                boss.x - camera.x, 
                boss.y - camera.y, 
                boss.width, 
                boss.height
            );
        } else {
            // 默认boss
            ctx.fillStyle = isBoss2 ? '#FF6600' : '#FF00FF';
            ctx.fillRect(boss.x - camera.x, boss.y - camera.y, boss.width, boss.height);
        }
        
        // 绘制boss血量
        ctx.fillStyle = '#FF0000';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('HP: ' + boss.health, boss.x - camera.x + boss.width / 2, boss.y - camera.y - 10);
    }
}

// 更新boss死亡动画
function updateBossDeath(boss, bossArray, index) {
    if (boss.isDying) {
        boss.deathTimer++;
        // 死亡动画持续1秒（60帧）
        if (boss.deathTimer >= 60) {
            bossArray.splice(index, 1);
        }
        return true;
    }
    return false;
}

export { drawPlayerAttack, drawBossDeath, updateBossDeath };