// 药水系统模块

// 药水列表
let potions = [];

/**
 * 生成恢复药水
 * @param {number} x - 药水x坐标
 * @param {number} y - 药水y坐标
 */
export function generateHealingPotion(x, y) {
    const potion = {
        x: x,
        y: y,
        width: 32,
        height: 32,
        type: 'healing',
        healingAmount: 3 // 恢复3点生命值
    };
    potions.push(potion);
    return potion;
}

/**
 * 更新药水
 */
export function updatePotions() {
    // 这里可以添加药水的动画或其他逻辑
}

/**
 * 绘制药水
 * @param {CanvasRenderingContext2D} ctx - 画布上下文
 * @param {Object} camera - 相机对象
 * @param {Object} assets - 素材对象
 */
export function drawPotions(ctx, camera, assets) {
    for (const potion of potions) {
        if (assets.loaded && assets.healingPotion) {
            ctx.drawImage(assets.healingPotion, potion.x - camera.x, potion.y - camera.y, potion.width, potion.height);
        } else {
            // 默认药水绘制
            ctx.fillStyle = '#00FF00';
            ctx.fillRect(potion.x - camera.x, potion.y - camera.y, potion.width, potion.height);
        }
    }
}

/**
 * 检测药水碰撞
 * @param {Object} player - 玩家对象
 * @returns {Object|null} - 碰撞到的药水对象，没有碰撞则返回null
 */
export function checkPotionCollision(player) {
    for (let i = potions.length - 1; i >= 0; i--) {
        const potion = potions[i];
        if (checkCollision(player, potion)) {
            // 移除药水
            potions.splice(i, 1);
            return potion;
        }
    }
    return null;
}

/**
 * 碰撞检测
 * @param {Object} rect1 - 第一个矩形
 * @param {Object} rect2 - 第二个矩形
 * @returns {boolean} - 是否碰撞
 */
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

/**
 * 清空药水
 */
export function clearPotions() {
    potions = [];
}

export { potions };
