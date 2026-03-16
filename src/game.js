// 导入素材加载模块
import { assets, loadAssets } from './assets.js';

// 导入炸弹模块
import { bombs, generateFallingBomb, updateBombs, drawBombs, checkBombCollision, clearBombs } from './bombs.js';

// 导入boss模块
import { bosses, boss2s, generateBoss, generateBoss2, updateBoss, updateBoss2, drawBoss, checkBossCollision, clearBoss } from './boss.js';

// 导入UI模块
import { showMenu, showShop, showWelcome, drawWelcome, drawMenuButton, drawShopButton, drawMenu, drawShop, drawHUD, drawGameOver, handleClick, addNotification, updateNotifications, drawNotifications } from './ui.js';

// 导入绘制函数
import { drawCoin, drawBomb } from './drawables.js';

// 导入武器系统
import { weaponTypes, weapons, generateWeapon, generateRandomWeapon, updateWeapons, drawWeapons, checkWeaponCollision, clearWeapons, createWeapon } from './weapons.js';

// 导入伤害计算
import { calculateDamage, checkAttackRange } from './damage.js';

// 导入动画效果
import { drawPlayerAttack, drawBossDeath, updateBossDeath } from './animations.js';

// 导入游戏配置
import { config, camera, initialGameState, initialKeys, initialGameObjects } from './config.js';

// 导入药水系统
import { potions, generateHealingPotion, updatePotions, drawPotions, checkPotionCollision, clearPotions } from './potions.js';

// 游戏变量
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 初始化Phaser Math（用于随机数生成）
const Phaser = {
    Math: {
        Between: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
};

// 玩家
const player = {
    x: 100, // 起始位置调整
    y: 0,
    width: 32, // 缩小角色大小
    height: 48, // 缩小角色大小
    velocityX: 0,
    velocityY: 0,
    onGround: false,
    jumpCount: 0, // 二段跳计数
    maxJumps: 2, // 最大跳跃次数
    facingLeft: false, // 角色朝向，false表示向右，true表示向左
    attackPower: 0, // 基础攻击力
    currentWeapon: createWeapon('fist'), // 当前武器，初始默认自带空手
    isAttacking: false, // 是否正在攻击
    attackTimer: 0, // 攻击冷却计时器
    attackCooldown: 30 // 攻击冷却时间（帧数）
};

// 平台、金币
let platforms = initialGameObjects.platforms;
let coins = initialGameObjects.coins;

// 游戏状态
let score = initialGameState.score;
let gameOver = initialGameState.gameOver;
let gameOverTimer = initialGameState.gameOverTimer;
let playerHealth = initialGameState.playerHealth; // 玩家生命值
let maxHealth = initialGameState.maxHealth; // 最大生命值
let isInvincible = initialGameState.isInvincible; // 玩家是否无敌
let invincibleTimer = initialGameState.invincibleTimer; // 无敌时间计时器
let isHurt = initialGameState.isHurt; // 玩家是否受到伤害
let hurtTimer = initialGameState.hurtTimer; // 伤害效果持续时间计时器
let isPaused = initialGameState.isPaused; // 游戏是否暂停

// 按键状态
const keys = {
    ...initialKeys
};

// 调整画布大小
function resizeCanvas() {
    // 保持固定窗口大小
    canvas.width = 800;
    canvas.height = 600;
    
    // 重新生成平台和金币
    generatePlatforms();
    generateCoins();
    
    // 重置玩家位置
    resetPlayer();
}

// 生成平台
function generatePlatforms() {
    platforms = [];
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // 地面平台
    platforms.push({
        x: 0,
        y: config.gameWorldHeight - config.platformHeight,
        width: config.gameWorldWidth,
        height: config.platformHeight
    });
    
    // 生成boss1（随机生成在平台上，包括地面平台）
    generateBoss(platforms, config);
    
    // 生成boss2（随机生成在平台上）
    generateBoss2(platforms, config);
    
    // 生成第一个空中平台（确保可以从地面跳上去）
    const firstPlatformY = config.gameWorldHeight - config.platformHeight - config.firstPlatformMaxHeight;
    const firstPlatformWidth = Phaser.Math.Between(config.platformWidthMin, config.platformWidthMax);
    // 确保第一个平台与边界有一定距离，不紧贴边界
    const borderMargin = 50; // 边界距离
    const firstPlatformX = Phaser.Math.Between(borderMargin, config.gameWorldWidth - firstPlatformWidth - borderMargin);
    
    platforms.push({
        x: firstPlatformX,
        y: firstPlatformY,
        width: firstPlatformWidth,
        height: config.platformHeight
    });
    
    // 生成其他空中平台，确保至少生成5个平台（包括地面平台）
    let y = firstPlatformY - Phaser.Math.Between(config.platformSpacingMin, config.platformSpacingMax);
    while (y > 100 || platforms.length < 5) {
        // 每个高度可能生成多个平台
        const platformCountAtHeight = Phaser.Math.Between(3, 6); // 3-6个平台
        
        for (let i = 0; i < platformCountAtHeight; i++) {
            const platformWidth = Phaser.Math.Between(config.platformWidthMin, config.platformWidthMax);
            const borderMargin = 50; // 边界距离
            const platformSpacing = 80; // 平台之间的最小间距
            
            // 随机生成平台位置，确保与边界和其他平台有足够距离
            let platformX;
            let validPosition = false;
            
            // 尝试生成有效位置
                for (let attempt = 0; attempt < 10; attempt++) {
                    platformX = Phaser.Math.Between(borderMargin, config.gameWorldWidth - platformWidth - borderMargin);
                
                // 检查与同高度其他平台的距离
                validPosition = true;
                for (const platform of platforms) {
                    if (Math.abs(platform.y - y) < 10) { // 同一高度
                        const platformLeft = platform.x;
                        const platformRight = platform.x + platform.width;
                        const newPlatformLeft = platformX;
                        const newPlatformRight = platformX + platformWidth;
                        
                        // 检查是否有重叠或间距不足
                        if (newPlatformRight > platformLeft - platformSpacing && newPlatformLeft < platformRight + platformSpacing) {
                            validPosition = false;
                            break;
                        }
                    }
                }
                
                if (validPosition) {
                    break;
                }
            }
            
            if (validPosition) {
                platforms.push({
                    x: platformX,
                    y: y,
                    width: platformWidth,
                    height: config.platformHeight
                });
            }
        }
        
        // 随机平台间距
        y -= Phaser.Math.Between(config.platformSpacingMin, config.platformSpacingMax);
    }
    
}

// 无限高度：当玩家接近顶部时，生成更多平台
function generateMorePlatforms() {
    // 找到当前最高的平台
    let highestPlatform = platforms[0];
    for (const platform of platforms) {
        if (platform.y < highestPlatform.y) {
            highestPlatform = platform;
        }
    }
    
    // 当玩家接近顶部平台时，生成更多平台
    if (player.y < highestPlatform.y + 500) {
        // 记录当前平台数量
        const initialPlatformCount = platforms.length;
        
        // 生成新的平台
        let platformY = highestPlatform.y - Phaser.Math.Between(config.platformSpacingMin, config.platformSpacingMax);
        
        // 生成3组平台，每组可能有多个平台
        for (let i = 0; i < 3; i++) {
            // 每个高度可能生成多个平台
            const platformCountAtHeight = Phaser.Math.Between(3, 6); // 3-6个平台
            
            for (let j = 0; j < platformCountAtHeight; j++) {
                const platformWidth = Phaser.Math.Between(config.platformWidthMin, config.platformWidthMax);
                const borderMargin = 50; // 边界距离
                const platformSpacing = 80; // 平台之间的最小间距
                
                // 随机生成平台位置，确保与边界和其他平台有足够距离
                let platformX;
                let validPosition = false;
                
                // 尝试生成有效位置
                for (let attempt = 0; attempt < 10; attempt++) {
                    platformX = Phaser.Math.Between(borderMargin, config.gameWorldWidth - platformWidth - borderMargin); // 使用配置中的游戏世界宽度
                    
                    // 检查与同高度其他平台的距离
                    validPosition = true;
                    for (const platform of platforms) {
                        if (Math.abs(platform.y - platformY) < 10) { // 同一高度
                            const platformLeft = platform.x;
                            const platformRight = platform.x + platform.width;
                            const newPlatformLeft = platformX;
                            const newPlatformRight = platformX + platformWidth;
                            
                            // 检查是否有重叠或间距不足
                            if (newPlatformRight > platformLeft - platformSpacing && newPlatformLeft < platformRight + platformSpacing) {
                                validPosition = false;
                                break;
                            }
                        }
                    }
                    
                    if (validPosition) {
                        break;
                    }
                }
                
                if (validPosition) {
                    platforms.push({
                        x: platformX,
                        y: platformY,
                        width: platformWidth,
                        height: config.platformHeight
                    });
                }
            }
            
            // 下一组平台的高度
            platformY -= Phaser.Math.Between(config.platformSpacingMin, config.platformSpacingMax);
        }
        
        // 为新生成的平台生成金币
        for (let i = initialPlatformCount; i < platforms.length; i++) {
            const platform = platforms[i];
            const coinCount = Phaser.Math.Between(1, 3);
            for (let j = 0; j < coinCount; j++) {
                const coinX = platform.x + Phaser.Math.Between(10, platform.width - 42);
                const coinY = platform.y - Phaser.Math.Between(10, config.coinHeightRange);
                
                coins.push({
                    x: coinX,
                    y: coinY,
                    width: 32,
                    height: 32,
                    collected: false
                });
            }
        }
    }
}

// 生成金币
function generateCoins() {
    coins = [];
    const canvasWidth = canvas.width;
    
    // 在每个平台上生成金币
    for (const platform of platforms) {
        // 平台上的金币
        const coinCount = Phaser.Math.Between(1, 3);
        for (let i = 0; i < coinCount; i++) {
            const coinX = platform.x + Phaser.Math.Between(10, platform.width - 42); // 调整金币位置
            // 金币在平台上方10-60像素（确保在平台上方，不允许在平台中间）
            const coinY = platform.y - Phaser.Math.Between(10, config.coinHeightRange);
            
            coins.push({
                x: coinX,
                y: coinY,
                width: 32, // 缩小金币大小
                height: 32, // 缩小金币大小
                collected: false
            });
        }
    }
    
    // 确保金币数量足够
    while (coins.length < config.coinCount) {
        // 在平台上方生成金币
        const platformIndex = Phaser.Math.Between(0, platforms.length - 1);
        const platform = platforms[platformIndex];
        
        const coinX = platform.x + Phaser.Math.Between(10, platform.width - 42);
        // 金币在平台上方10-60像素
        const coinY = platform.y - Phaser.Math.Between(10, config.coinHeightRange);
        
        coins.push({
            x: coinX,
            y: coinY,
            width: 32, // 缩小金币大小
            height: 32, // 缩小金币大小
            collected: false
        });
    }
}



// 重置玩家位置
function resetPlayer() {
    player.x = 100;
    player.y = config.gameWorldHeight - config.platformHeight - player.height - 10; // 调整位置，使用游戏世界高度
    player.velocityX = 0;
    player.velocityY = 0;
    player.onGround = true;
    player.jumpCount = 0; // 重置跳跃计数
}

// 游戏结束
function endGame() {
    gameOver = true;
    gameOverTimer = 0;
}

// 重新开始游戏
function restartGame() {
    gameOver = false;
    score = 0;
    playerHealth = 10; // 重置生命值
    maxHealth = 10; // 重置最大生命值
    player.attackPower = 0; // 重置攻击力
    player.currentWeapon = createWeapon('fist'); // 重置为默认空手武器
    generatePlatforms();
    generateCoins();
    clearBombs(); // 清空炸弹
    clearBoss(); // 清空boss
    clearWeapons(); // 清空武器
    clearPotions(); // 清空药水
    resetPlayer();
}

// 事件监听
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
    if (e.key === 'ArrowUp' && !keys.up) {
        keys.up = true;
        keys.upPressed = true;
    }
    if (e.key === ' ' && !keys.space) {
        keys.space = true;
        keys.spacePressed = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
    if (e.key === 'ArrowUp') {
        keys.up = false;
        keys.upPressed = false;
    }
    if (e.key === ' ') {
        keys.space = false;
        keys.spacePressed = false;
    }
});

// 窗口大小变化时调整画布
window.addEventListener('resize', resizeCanvas);

// 点击事件处理
canvas.addEventListener('click', function(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const result = handleClick(mouseX, mouseY, canvas, gameOver, score, config, playerHealth);
    
    // 根据菜单和商城的显示状态设置游戏暂停
    isPaused = showMenu || showShop;
    
    if (result) {
        switch (result.action) {
            case 'restart':
                restartGame();
                isPaused = false; // 重新开始游戏时取消暂停
                break;
            case 'upgradeSpeed':
                score -= 100;
                config.playerSpeed += 2;
                addNotification('移动速度 +2');
                break;
            case 'upgradeJump':
                score -= 100;
                config.playerJumpPower += 1;
                addNotification('跳跃高度 +1');
                break;
            case 'upgradeCurrentHealth':
                if (playerHealth < maxHealth) {
                    score -= 100;
                    playerHealth += 1;
                    addNotification('当前生命值 +1');
                } else {
                    // 当前生命值等于最大生命值，提示不能增加
                    addNotification('当前生命值已达到最大值！');
                }
                break;
            case 'upgradeMaxHealth':
                score -= 100;
                playerHealth += 1;
                maxHealth += 1;
                addNotification('最大生命值 +1');
                break;
            case 'buyKnife':
                score -= 200;
                player.currentWeapon = createWeapon('knife');
                addNotification('购买了小刀');
                break;
            case 'buyGreatsword':
                score -= 400;
                player.currentWeapon = createWeapon('greatsword');
                addNotification('购买了大刀');
                break;
            case 'buySpear':
                score -= 800;
                player.currentWeapon = createWeapon('spear');
                addNotification('购买了长枪');
                break;
            case 'buyHealingPotion':
                score -= 100;
                // 恢复3点生命值
                playerHealth = Math.min(playerHealth + 3, maxHealth);
                addNotification('购买并使用了恢复药水，恢复了3点生命值');
                break;
        }
    }
});

// 碰撞检测
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}





// 更新游戏
function update() {
    if (gameOver || showWelcome || isPaused) {
        gameOverTimer++;
        return;
    }
    
    // 更新提示
    updateNotifications();
    
    // 更新攻击冷却
    if (player.isAttacking) {
        player.attackTimer++;
        if (player.attackTimer >= player.attackCooldown) {
            player.isAttacking = false;
            player.attackTimer = 0;
        }
    }
    
    // 处理攻击
    if (keys.spacePressed && !player.isAttacking) {
        player.isAttacking = true;
        player.attackTimer = 0;
        
        // 检测攻击范围
        const weapon = player.currentWeapon;
        
        // 攻击boss1
        for (let i = bosses.length - 1; i >= 0; i--) {
            const boss = bosses[i];
            if (checkAttackRange(player, boss, weapon)) {
                const damage = calculateDamage(player, boss, weapon);
                boss.health -= damage;
                
                if (boss.health <= 0 && !boss.isDying) {
                    // 设置为死亡状态，开始死亡动画
                    boss.isDying = true;
                    boss.deathTimer = 0;
                    
                    // 50%概率掉落恢复药水
                    if (Math.random() < 0.5) {
                        generateHealingPotion(boss.x + boss.width / 2 - 16, boss.y + boss.height / 2 - 16);
                    }
                }
            }
        }
        
        // 攻击boss2
        for (let i = boss2s.length - 1; i >= 0; i--) {
            const boss2 = boss2s[i];
            if (checkAttackRange(player, boss2, weapon)) {
                const damage = calculateDamage(player, boss2, weapon);
                boss2.health -= damage;
                
                if (boss2.health <= 0 && !boss2.isDying) {
                    // 设置为死亡状态，开始死亡动画
                    boss2.isDying = true;
                    boss2.deathTimer = 0;
                    
                    // 50%概率掉落恢复药水
                    if (Math.random() < 0.5) {
                        generateHealingPotion(boss2.x + boss2.width / 2 - 16, boss2.y + boss2.height / 2 - 16);
                    }
                }
            }
        }
        
        // 消耗武器耐久度（除了空手）
        if (weapon && weapon.type !== 'fist') {
            weapon.durability -= 1;
            if (weapon.durability <= 0) {
                // 耐久度为0，丢弃武器
                addNotification('武器耐久度耗尽，已丢弃');
                // 回到空手状态
                player.currentWeapon = createWeapon('fist');
            }
        }
    }
    
    // 武器现在通过商店购买，不再通过碰撞获取
    // 更新武器
    updateWeapons();
    
    // 更新药水
    updatePotions();
    
    // 玩家移动（包括跳跃时的方向控制）
    if (keys.left) {
        player.velocityX = -config.playerSpeed;
        player.facingLeft = true; // 向左移动时设置朝向为左
    } else if (keys.right) {
        player.velocityX = config.playerSpeed;
        player.facingLeft = false; // 向右移动时设置朝向为右
    } else {
        player.velocityX = 0;
    }
    
    // 二段跳机制
    if (keys.upPressed) {
        if (player.onGround) {
            // 第一次跳跃
            player.velocityY = -config.playerJumpPower;
            player.onGround = false;
            player.jumpCount = 1;
        } else if (player.jumpCount < player.maxJumps) {
            // 第二次跳跃
            player.velocityY = -config.playerJumpPower;
            player.jumpCount++;
        }
        // 重置upPressed标志
        keys.upPressed = false;
    }
    
    // 重力
    player.velocityY += config.gravity;
    
    // 移动玩家
    player.x += player.velocityX;
    player.y += player.velocityY;
    
    // 碰撞检测 - 平台
    player.onGround = false;
    for (const platform of platforms) {
        if (checkCollision(player, platform)) {
            // 从上方碰撞
            if (player.velocityY > 0) {
                player.y = platform.y - player.height;
                player.velocityY = 0;
                player.onGround = true;
                player.jumpCount = 0; // 重置跳跃计数
            }
            // 从下方碰撞
            else if (player.velocityY < 0) {
                player.y = platform.y + platform.height;
                player.velocityY = 0;
            }
            // 左右碰撞
            else if (player.velocityX !== 0) {
                if (player.x < platform.x) {
                    player.x = platform.x - player.width;
                } else {
                    player.x = platform.x + platform.width;
                }
            }
        }
    }
    
    // 边界检测
    if (player.x < 0) player.x = 0;
    if (player.x > config.gameWorldWidth - player.width) player.x = config.gameWorldWidth - player.width; // 使用游戏世界宽度
    if (player.y > config.gameWorldHeight) resetPlayer(); // 使用游戏世界高度
    
    // 收集金币
    for (const coin of coins) {
        if (!coin.collected && checkCollision(player, coin)) {
            coin.collected = true;
            score += 10;
        }
    }
    
    // 检查是否所有金币都被收集
    if (coins.every(coin => coin.collected)) {
        // 重新生成金币
        generateCoins();
    }
    
    // 定期生成炸弹
    if (Math.random() < 0.2) { // 20%的概率生成炸弹，增加生成概率
        generateFallingBomb(config.gameWorldWidth, config.gameWorldHeight); // 使用游戏世界的宽度和高度
    }
    
    // 定期生成boss1
    if (Math.random() < 0.05) { // 5%的概率生成boss1
        generateBoss(platforms, config);
    }
    
    // 定期生成boss2
    if (Math.random() < 0.05) { // 5%的概率生成boss2
        generateBoss2(platforms, config);
    }
    
    // 更新炸弹
    updateBombs(config.gameWorldHeight); // 使用游戏世界的高度
    
    // 无敌时间处理
    if (isInvincible) {
        invincibleTimer++;
        if (invincibleTimer >= 60) { // 1秒无敌时间
            isInvincible = false;
            invincibleTimer = 0;
        }
    }
    
    // 伤害效果处理
    if (isHurt) {
        hurtTimer++;
        if (hurtTimer >= 60) { // 1秒伤害效果
            isHurt = false;
            hurtTimer = 0;
        }
    }
    
    // 检测炸弹碰撞
    if (checkBombCollision(player) && !isInvincible) {
        playerHealth -= 1; // 触碰炸弹扣1点生命值
        isInvincible = true; // 进入无敌状态
        isHurt = true; // 进入伤害效果状态
        invincibleTimer = 0;
        hurtTimer = 0;
        if (playerHealth <= 0) {
            endGame();
        }
    }
    
    // 更新boss
    updateBoss(platforms, config);
    
    // 更新boss2
    updateBoss2(platforms, config);
    
    // 检测药水碰撞
    const collidedPotion = checkPotionCollision(player);
    if (collidedPotion) {
        // 恢复生命值
        playerHealth = Math.min(playerHealth + collidedPotion.healingAmount, maxHealth);
        addNotification('恢复了 ' + collidedPotion.healingAmount + ' 点生命值');
    }
    
    // 检测boss碰撞
    if (checkBossCollision(player, isInvincible)) {
        playerHealth -= 2; // 触碰boss扣2点生命值
        isInvincible = true; // 进入无敌状态（防止连续碰撞）
        isHurt = true; // 进入伤害效果状态（视觉反馈）
        invincibleTimer = 0;
        hurtTimer = 0;
        if (playerHealth <= 0) {
            endGame();
        }
    }
    
    // 生成更多平台（无限高度）
    generateMorePlatforms();
    
    // 更新相机位置，使角色始终在屏幕中心
    camera.x = player.x - camera.width / 2 + player.width / 2;
    camera.y = player.y - camera.height / 2 + player.height / 2;
}

// 绘制游戏
function draw() {
    // 清空画布
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制欢迎页面
    if (drawWelcome(ctx, canvas)) {
        return; // 提前返回，不绘制游戏内容
    }
    
    // 绘制背景
    if (isHurt && assets.loaded && assets.hurt) {
        // 伤害效果：交替绘制hurt.png和bg.png，实现闪烁效果
        if (Math.floor(hurtTimer / 5) % 2 === 0) {
            ctx.drawImage(assets.hurt, 0, 0, canvas.width, canvas.height);
        } else {
            if (assets.bg) {
                ctx.drawImage(assets.bg, 0, 0, canvas.width, canvas.height);
            } else {
                // 默认背景
                ctx.fillStyle = '#87CEEB'; // 天空蓝
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        }
    } else if (assets.loaded && assets.bg) {
        // 正常背景
        ctx.drawImage(assets.bg, 0, 0, canvas.width, canvas.height);
    } else {
        // 默认背景
        ctx.fillStyle = '#87CEEB'; // 天空蓝
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // 绘制平台
    if (assets.loaded && assets.platform) {
        for (const platform of platforms) {
            ctx.drawImage(assets.platform, platform.x - camera.x, platform.y - camera.y, platform.width, platform.height);
        }
    } else {
        // 默认平台
        ctx.fillStyle = '#8B4513';
        for (const platform of platforms) {
            ctx.fillRect(platform.x - camera.x, platform.y - camera.y, platform.width, platform.height);
        }
    }
    
    // 绘制金币
    for (const coin of coins) {
        if (!coin.collected) {
            if (assets.loaded && assets.coin) {
                ctx.drawImage(assets.coin, coin.x - camera.x, coin.y - camera.y, coin.width, coin.height);
            } else {
                drawCoin(ctx, coin.x - camera.x, coin.y - camera.y, coin.width);
            }
        }
    }
    
    // 绘制炸弹
    drawBombs(ctx, camera, assets);
    
    // 绘制boss
    drawBoss(ctx, camera, assets);
    
    // 绘制武器
    drawWeapons(ctx, camera, assets);
    
    // 绘制药水
    drawPotions(ctx, camera, assets);
    
    // 绘制玩家
    if (assets.loaded && assets.player) {
        // 保存当前画布状态
        ctx.save();
        
        // 计算绘制位置
        let drawX = player.x - camera.x;
        let drawY = player.y - camera.y;
        
        // 检查角色朝向
        if (player.facingLeft) {
            // 向左朝向时，水平翻转图像
            ctx.translate(drawX + player.width, drawY);
            ctx.scale(-1, 1);
            ctx.drawImage(assets.player, 0, 0, player.width, player.height);
        } else {
            // 向右朝向或默认时，正常绘制
            ctx.drawImage(assets.player, drawX, drawY, player.width, player.height);
        }
        
        // 恢复画布状态
        ctx.restore();
    } else {
        // 默认玩家
        ctx.fillStyle = '#00FFFF';
        ctx.fillRect(player.x - camera.x, player.y - camera.y, player.width, player.height);
    }
    
    // 绘制攻击动画
    drawPlayerAttack(ctx, player, camera, assets);
    
    // 绘制分数和生命值
    const totalAttackPower = player.currentWeapon ? player.currentWeapon.damage : 0; // 根据当前持有武器计算攻击力
    drawHUD(ctx, canvas, score, playerHealth, maxHealth, totalAttackPower, player.currentWeapon, assets);
    
    // 绘制菜单按钮
    drawMenuButton(ctx, canvas);
    
    // 绘制商城按钮
    drawShopButton(ctx, canvas);
    
    // 绘制菜单
    drawMenu(ctx, canvas);
    
    // 绘制商城
    drawShop(ctx, canvas, score);
    
    // 绘制游戏结束界面
    if (gameOver) {
        drawGameOver(ctx, canvas, score);
    }
    
    // 绘制提示
    drawNotifications(ctx, canvas);
}

// 游戏循环
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}



// 加载素材并开始游戏
loadAssets().then(() => {
    // 初始化画布大小
    resizeCanvas();
    // 开始游戏循环
    gameLoop();
});