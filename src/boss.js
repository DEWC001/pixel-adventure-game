// boss模块

// 导入动画效果
import { drawBossDeath, updateBossDeath } from './animations.js';

let bosses = []; // 存储所有boss1
let boss2s = []; // 存储所有boss2
let lastBossSpawnTime = 0; // 上次生成boss的时间
const bossSpawnIntervalMin = 10000; // 最小生成间隔（10秒）
const bossSpawnIntervalMax = 20000; // 最大生成间隔（20秒）
let currentBossSpawnInterval = bossSpawnIntervalMin; // 当前生成间隔

// 初始化Phaser Math（用于随机数生成）
const Phaser = {
    Math: {
        Between: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
};

// 检查是否可以生成boss
function canSpawnBoss() {
    const now = Date.now();
    if (now - lastBossSpawnTime >= currentBossSpawnInterval) {
        // 更新上次生成时间
        lastBossSpawnTime = now;
        // 随机生成下一次的间隔时间
        currentBossSpawnInterval = Phaser.Math.Between(bossSpawnIntervalMin, bossSpawnIntervalMax);
        return true;
    }
    return false;
}

// 生成boss1（随机生成在平台上，包括地面平台）
function generateBoss(platforms, config) {
    // 检查是否可以生成boss
    if (!canSpawnBoss()) {
        return;
    }
    
    // 随机选择一个平台
    if (platforms.length > 0) {
        const platformIndex = Phaser.Math.Between(0, platforms.length - 1);
        const platform = platforms[platformIndex];
        
        const newBoss = {
            x: Phaser.Math.Between(platform.x + 50, platform.x + platform.width - 130), // 随机生成在平台上，留出边界
            y: platform.y - 80, // 生成在平台上
            width: 80,
            height: 80,
            velocityX: 0,
            velocityY: 0,
            onGround: true,
            moveDirection: 1, // 1表示向右，-1表示向左
            moveTimer: 0,
            moveInterval: Phaser.Math.Between(120, 300), // 移动方向切换的帧数随机，延长时间
            jumpTimer: 0,
            jumpInterval: Phaser.Math.Between(120, 240), // 跳跃的帧数随机
            spawnTime: Date.now(), // 生成时间，用于自动消失机制
            health: 5, // boss1默认生命值为5
            isDying: false, // 是否正在死亡
            deathTimer: 0 // 死亡动画计时器
        };
        
        bosses.push(newBoss);
    }
}

// 生成boss2（随机生成在平台上）
function generateBoss2(platforms, config) {
    // 检查是否可以生成boss
    if (!canSpawnBoss()) {
        return;
    }
    
    // 随机选择一个平台
    if (platforms.length > 0) {
        const platformIndex = Phaser.Math.Between(0, platforms.length - 1);
        const platform = platforms[platformIndex];
        
        const newBoss2 = {
            x: Phaser.Math.Between(platform.x + 50, platform.x + platform.width - 130), // 随机生成在平台上，留出边界
            y: platform.y - 80, // 生成在平台上
            width: 80,
            height: 80,
            velocityX: 0,
            velocityY: 0,
            onGround: true,
            moveDirection: 1, // 1表示向右，-1表示向左
            moveTimer: 0,
            moveInterval: Phaser.Math.Between(120, 300), // 移动方向切换的帧数随机，延长时间
            jumpTimer: 0,
            jumpInterval: Phaser.Math.Between(120, 240), // 跳跃的帧数随机
            spawnTime: Date.now(), // 生成时间，用于自动消失机制
            health: 7, // boss2默认生命值为7
            isDying: false, // 是否正在死亡
            deathTimer: 0 // 死亡动画计时器
        };
        
        boss2s.push(newBoss2);
    }
}

// 更新boss
function updateBoss(platforms, config) {
    // 遍历所有boss1
    for (let i = bosses.length - 1; i >= 0; i--) {
        const boss = bosses[i];
        
        // 检查是否正在死亡
        if (updateBossDeath(boss, bosses, i)) {
            continue;
        }
        
        // 检查是否超过60秒，自动消失
        if (Date.now() - boss.spawnTime > 60000) { // 60秒
            bosses.splice(i, 1);
            continue;
        }
        
        // 随机左右移动
        boss.moveTimer++;
        if (boss.moveTimer >= boss.moveInterval) {
            boss.moveDirection *= -1;
            boss.moveTimer = 0;
            boss.moveInterval = Phaser.Math.Between(120, 300); // 每次切换方向时随机生成新的移动间隔，延长时间
        }
        boss.velocityX = boss.moveDirection * 2; // 移动速度为2，降低速度
        
        // 跳跃
        boss.jumpTimer++;
        if (boss.jumpTimer >= boss.jumpInterval && boss.onGround) {
            boss.velocityY = -20; // 最大跳跃高度为20
            boss.onGround = false;
            boss.jumpTimer = 0;
        }
        
        // 重力
        boss.velocityY += config.gravity;
        
        // 移动boss
        boss.x += boss.velocityX;
        boss.y += boss.velocityY;
        
        // 碰撞检测 - 平台
        boss.onGround = false;
        for (const platform of platforms) {
            if (checkCollision(boss, platform)) {
                // 从上方碰撞
                if (boss.velocityY > 0) {
                    boss.y = platform.y - boss.height;
                    boss.velocityY = 0;
                    boss.onGround = true;
                }
                // 从下方碰撞
                else if (boss.velocityY < 0) {
                    boss.y = platform.y + platform.height;
                    boss.velocityY = 0;
                }
                // 左右碰撞
                else if (boss.velocityX !== 0) {
                    if (boss.x < platform.x) {
                        boss.x = platform.x - boss.width;
                        boss.moveDirection *= -1;
                    } else {
                        boss.x = platform.x + platform.width;
                        boss.moveDirection *= -1;
                    }
                }
            }
        }
        
        // 边界检测
        if (boss.x < 0) {
            boss.x = 0;
            boss.moveDirection *= -1;
        }
        if (boss.x > 2000 - boss.width) {
            boss.x = 2000 - boss.width;
            boss.moveDirection *= -1;
        }
    }
}

// 更新boss2（移动速度大幅减缓）
function updateBoss2(platforms, config) {
    // 遍历所有boss2
    for (let i = boss2s.length - 1; i >= 0; i--) {
        const boss2 = boss2s[i];
        
        // 检查是否正在死亡
        if (updateBossDeath(boss2, boss2s, i)) {
            continue;
        }
        
        // 检查是否超过60秒，自动消失
        if (Date.now() - boss2.spawnTime > 60000) { // 60秒
            boss2s.splice(i, 1);
            continue;
        }
        
        // 随机左右移动
        boss2.moveTimer++;
        if (boss2.moveTimer >= boss2.moveInterval) {
            boss2.moveDirection *= -1;
            boss2.moveTimer = 0;
            boss2.moveInterval = Phaser.Math.Between(120, 300); // 每次切换方向时随机生成新的移动间隔，延长时间
        }
        boss2.velocityX = boss2.moveDirection * 1; // 移动速度为1，大幅减缓
        
        // 跳跃
        boss2.jumpTimer++;
        if (boss2.jumpTimer >= boss2.jumpInterval && boss2.onGround) {
            boss2.velocityY = -15; // 最大跳跃高度为15，略低于boss1
            boss2.onGround = false;
            boss2.jumpTimer = 0;
        }
        
        // 重力
        boss2.velocityY += config.gravity;
        
        // 移动boss2
        boss2.x += boss2.velocityX;
        boss2.y += boss2.velocityY;
        
        // 碰撞检测 - 平台
        boss2.onGround = false;
        for (const platform of platforms) {
            if (checkCollision(boss2, platform)) {
                // 从上方碰撞
                if (boss2.velocityY > 0) {
                    boss2.y = platform.y - boss2.height;
                    boss2.velocityY = 0;
                    boss2.onGround = true;
                }
                // 从下方碰撞
                else if (boss2.velocityY < 0) {
                    boss2.y = platform.y + platform.height;
                    boss2.velocityY = 0;
                }
                // 左右碰撞
                else if (boss2.velocityX !== 0) {
                    if (boss2.x < platform.x) {
                        boss2.x = platform.x - boss2.width;
                        boss2.moveDirection *= -1;
                    } else {
                        boss2.x = platform.x + platform.width;
                        boss2.moveDirection *= -1;
                    }
                }
            }
        }
        
        // 边界检测
        if (boss2.x < 0) {
            boss2.x = 0;
            boss2.moveDirection *= -1;
        }
        if (boss2.x > 2000 - boss2.width) {
            boss2.x = 2000 - boss2.width;
            boss2.moveDirection *= -1;
        }
    }
}

// 绘制boss
function drawBoss(ctx, camera, assets) {
    // 绘制所有boss1
    for (const boss of bosses) {
        // 绘制boss触碰范围
        ctx.save();
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(boss.x - camera.x, boss.y - camera.y, boss.width, boss.height);
        ctx.restore();
        
        drawBossDeath(ctx, boss, camera, assets, false);
    }
    
    // 绘制所有boss2
    for (const boss2 of boss2s) {
        // 绘制boss触碰范围
        ctx.save();
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = '#FF6600';
        ctx.fillRect(boss2.x - camera.x, boss2.y - camera.y, boss2.width, boss2.height);
        ctx.restore();
        
        drawBossDeath(ctx, boss2, camera, assets, true);
    }
}

// 检测boss碰撞
function checkBossCollision(player, isInvincible) {
    let collided = false;
    
    // 检测所有boss1的碰撞
    for (const boss of bosses) {
        if (checkCollision(player, boss) && !isInvincible) {
            collided = true;
        }
    }
    
    // 检测所有boss2的碰撞
    for (const boss2 of boss2s) {
        if (checkCollision(player, boss2) && !isInvincible) {
            collided = true;
        }
    }
    
    return collided;
}

// 碰撞检测
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// 清空boss
function clearBoss() {
    bosses = [];
    boss2s = [];
}

export { bosses, boss2s, generateBoss, generateBoss2, updateBoss, updateBoss2, drawBoss, checkBossCollision, clearBoss };