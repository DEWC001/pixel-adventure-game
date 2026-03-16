// 炸弹生成模块

// 导入绘制函数
import { drawBomb } from './drawables.js';

// 炸弹数组
let bombs = [];

// 最大同时存在的炸弹数量
const MAX_BOMBS = 5;

// 生成炸弹
function generateBomb(canvasWidth, canvasHeight) {
    // 确保不超过最大炸弹数量
    if (bombs.length < MAX_BOMBS) {
        // 从窗口顶部随机位置生成炸弹
        const bombX = Math.random() * (canvasWidth - 32); // 32是炸弹的宽度
        
        bombs.push({
            x: bombX,
            y: -32, // 从窗口顶部上方开始
            width: 32,
            height: 32,
            velocityY: 5 // 下落速度，调整为合理值
        });
    }
}

// 更新炸弹
function updateBombs(canvasHeight) {
    // 更新炸弹位置
    for (let i = bombs.length - 1; i >= 0; i--) {
        const bomb = bombs[i];
        bomb.y += bomb.velocityY;
        
        // 移除超出屏幕的炸弹
        if (bomb.y > canvasHeight) {
            bombs.splice(i, 1);
        }
    }
}

// 绘制炸弹
function drawBombs(ctx, camera, assets) {
    for (const bomb of bombs) {
        if (assets.loaded && assets.bomb) {
            ctx.drawImage(assets.bomb, bomb.x - camera.x, bomb.y - camera.y, bomb.width, bomb.height);
        } else {
            // 默认炸弹
            drawBomb(ctx, bomb.x - camera.x, bomb.y - camera.y, bomb.width);
        }
    }
}

// 检查炸弹碰撞
function checkBombCollision(player) {
    for (const bomb of bombs) {
        if (player.x < bomb.x + bomb.width &&
            player.x + player.width > bomb.x &&
            player.y < bomb.y + bomb.height &&
            player.y + player.height > bomb.y) {
            return true;
        }
    }
    return false;
}

// 清空炸弹
function clearBombs() {
    bombs = [];
}

export { bombs, generateBomb as generateFallingBomb, updateBombs, drawBombs, checkBombCollision, clearBombs };