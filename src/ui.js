// 页面布局模块

// UI状态
let showMenu = false; // 菜单显示状态
let showShop = false; // 商城显示状态
let showWelcome = true; // 欢迎页面显示状态

// 提示系统
let notifications = [];

// 添加提示
function addNotification(message) {
    notifications.push({
        message: message,
        timestamp: Date.now(),
        duration: 2000 // 2秒
    });
}

// 更新提示
function updateNotifications() {
    const now = Date.now();
    notifications = notifications.filter(notification => {
        return now - notification.timestamp < notification.duration;
    });
}

// 绘制提示
function drawNotifications(ctx, canvas) {
    if (notifications.length > 0) {
        // 从下到上绘制提示
        let y = canvas.height - 100;
        notifications.forEach(notification => {
            // 计算透明度（随着时间推移逐渐消失）
            const now = Date.now();
            const elapsed = now - notification.timestamp;
            const alpha = Math.max(0, 1 - elapsed / notification.duration);
            
            // 绘制提示背景
            ctx.fillStyle = `rgba(0, 0, 0, ${alpha * 0.8})`;
            ctx.fillRect(canvas.width / 2 - 150, y, 300, 50);
            
            // 绘制提示文字
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(notification.message, canvas.width / 2, y + 25);
            
            y -= 60; // 每个提示之间的间距
        });
    }
}

// 绘制欢迎页面
function drawWelcome(ctx, canvas) {
    if (showWelcome) {
        // 背景
        ctx.fillStyle = '#87CEEB'; // 天空蓝
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 游戏标题
        ctx.fillStyle = '#FFD700';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('像素勇者：遗失的水晶', canvas.width / 2, canvas.height / 2 - 50);
        
        // 开始游戏按钮
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2, 200, 60);
        ctx.fillStyle = '#fff';
        ctx.font = '24px Arial';
        ctx.fillText('开始游戏', canvas.width / 2, canvas.height / 2 + 35);
        
        return true; // 显示了欢迎页面
    }
    return false; // 没有显示欢迎页面
}

// 绘制菜单按钮
function drawMenuButton(ctx, canvas) {
    // 绘制菜单按钮
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(canvas.width - 100, 20, 80, 40);
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.fillText('菜单', canvas.width - 60, 45);
}

// 绘制商城按钮
function drawShopButton(ctx, canvas) {
    // 绘制商城按钮
    ctx.fillStyle = '#FF9800';
    ctx.fillRect(canvas.width - 200, 20, 80, 40);
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.fillText('商城', canvas.width - 160, 45);
}

// 绘制菜单
function drawMenu(ctx, canvas) {
    if (showMenu) {
        // 菜单背景
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 - 100, 200, 200);
        
        // 继续游戏按钮
        ctx.fillStyle = '#2196F3';
        ctx.fillRect(canvas.width / 2 - 80, canvas.height / 2 - 60, 160, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.fillText('继续游戏', canvas.width / 2, canvas.height / 2 - 35);
        
        // 重新开始按钮
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(canvas.width / 2 - 80, canvas.height / 2 - 10, 160, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.fillText('重新开始', canvas.width / 2, canvas.height / 2 + 15);
        
        // 退出游戏按钮
        ctx.fillStyle = '#f44336';
        ctx.fillRect(canvas.width / 2 - 80, canvas.height / 2 + 40, 160, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.fillText('退出游戏', canvas.width / 2, canvas.height / 2 + 65);
    }
}

// 绘制商城
function drawShop(ctx, canvas, score) {
    if (showShop) {
        // 商城背景
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(canvas.width / 2 - 200, canvas.height / 2 - 180, 400, 360);
        
        // 商城标题
        ctx.fillStyle = '#FF9800';
        ctx.font = '24px Arial';
        ctx.fillText('商城', canvas.width / 2, canvas.height / 2 - 160);
        
        // 属性升级标题
        ctx.fillStyle = '#2196F3';
        ctx.font = '20px Arial';
        ctx.fillText('属性升级', canvas.width / 2 - 100, canvas.height / 2 - 130);
        
        // 移动速度升级
        ctx.fillStyle = '#2196F3';
        ctx.fillRect(canvas.width / 2 - 180, canvas.height / 2 - 100, 160, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.fillText('移动速度 +2 (100金币)', canvas.width / 2 - 100, canvas.height / 2 - 75);
        
        // 跳跃高度升级
        ctx.fillStyle = '#9C27B0';
        ctx.fillRect(canvas.width / 2 - 180, canvas.height / 2 - 50, 160, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.fillText('跳跃高度 +1 (100金币)', canvas.width / 2 - 100, canvas.height / 2 - 25);
        
        // 增加当前生命值
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(canvas.width / 2 - 180, canvas.height / 2, 160, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.fillText('当前生命值 +1 (100金币)', canvas.width / 2 - 100, canvas.height / 2 + 25);
        
        // 增加最大生命值
        ctx.fillStyle = '#8BC34A';
        ctx.fillRect(canvas.width / 2 - 180, canvas.height / 2 + 50, 160, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.fillText('最大生命值 +1 (100金币)', canvas.width / 2 - 100, canvas.height / 2 + 75);
        
        // 武器购买标题
        ctx.fillStyle = '#FF9800';
        ctx.font = '20px Arial';
        ctx.fillText('武器购买', canvas.width / 2 + 100, canvas.height / 2 - 130);
        
        // 购买小刀
        ctx.fillStyle = '#FFC107';
        ctx.fillRect(canvas.width / 2 + 20, canvas.height / 2 - 100, 160, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.fillText('购买小刀 (200金币)', canvas.width / 2 + 100, canvas.height / 2 - 75);
        
        // 购买大刀
        ctx.fillStyle = '#FF9800';
        ctx.fillRect(canvas.width / 2 + 20, canvas.height / 2 - 50, 160, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.fillText('购买大刀 (400金币)', canvas.width / 2 + 100, canvas.height / 2 - 25);
        
        // 购买长枪
        ctx.fillStyle = '#F44336';
        ctx.fillRect(canvas.width / 2 + 20, canvas.height / 2, 160, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.fillText('购买长枪 (800金币)', canvas.width / 2 + 100, canvas.height / 2 + 25);
        
        // 购买恢复药水
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(canvas.width / 2 + 20, canvas.height / 2 + 50, 160, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.fillText('购买恢复药水 (100金币)', canvas.width / 2 + 100, canvas.height / 2 + 75);
        
        // 关闭按钮
        ctx.fillStyle = '#f44336';
        ctx.fillRect(canvas.width / 2 - 60, canvas.height / 2 + 100, 120, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.fillText('关闭', canvas.width / 2, canvas.height / 2 + 125);
    }
}

// 绘制分数和生命值
function drawHUD(ctx, canvas, score, playerHealth, maxHealth, attackPower, currentWeapon, assets) {
    // 绘制分数
    ctx.fillStyle = '#00ff0dff';
    ctx.font = '36px Arial'; // 减小字体大小
    ctx.fillText('金币: ' + score, canvas.width / 2 - 300, 30); // 调整位置，往窗口中心移动
    
    // 绘制武器
    if (currentWeapon) {
        // 绘制武器图标
        if (assets.loaded && assets[currentWeapon.type]) {
            ctx.drawImage(assets[currentWeapon.type], canvas.width / 2 - 320, 30, 48, 48);
        }
        // 绘制武器名称和耐久度
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px Arial';
        ctx.fillText(currentWeapon.name + ' (' + currentWeapon.durability + ')', canvas.width / 2 - 280, 75);
    } else {
        // 空手状态
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px Arial';
        ctx.fillText('空手', canvas.width / 2 - 300, 75);
    }
    
    // 绘制攻击力
    ctx.fillStyle = '#ffff00ff';
    ctx.font = '36px Arial';
    ctx.fillText('攻击力: ' + attackPower, canvas.width / 2 - 300, 110); // 在武器下方显示攻击力
    
    // 绘制生命值图标
    if (assets.loaded && assets.hp) {
        ctx.drawImage(assets.hp, canvas.width / 2 - 400, canvas.height -  65, 48, 48);
    }
    
    // 绘制生命值
    ctx.fillStyle = '#f77373ff';
    ctx.font = '36px Arial'; // 减小字体大小
    ctx.fillText('生命值: ' + playerHealth + '/' + maxHealth, canvas.width / 2 - 250, canvas.height - 30); // 调整位置，往窗口中心移动
}

// 绘制游戏结束界面
function drawGameOver(ctx, canvas, score) {
    // 半透明背景
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 游戏结束文字
    ctx.fillStyle = '#FF0000';
    ctx.font = '64px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('游戏结束!', canvas.width / 2, canvas.height / 2 - 50);
    
    // 分数显示
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '32px Arial';
    ctx.fillText('最终金币: ' + score, canvas.width / 2, canvas.height / 2);
    
    // 重新开始按钮
    const buttonWidth = 200;
    const buttonHeight = 60;
    const buttonX = (canvas.width - buttonWidth) / 2;
    const buttonY = canvas.height / 2 + 50;
    
    // 按钮背景
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
    
    // 按钮文字
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '24px Arial';
    ctx.fillText('下一把', canvas.width / 2, buttonY + buttonHeight / 2 + 8);
}

// 处理点击事件
function handleClick(mouseX, mouseY, canvas, gameOver, score, config, playerHealth) {
    // 欢迎页面点击
    if (showWelcome) {
        // 开始游戏按钮
        if (mouseX >= canvas.width / 2 - 100 && mouseX <= canvas.width / 2 + 100 && mouseY >= canvas.height / 2 && mouseY <= canvas.height / 2 + 60) {
            showWelcome = false;
        }
        return;
    }
    
    // 菜单按钮点击
    if (mouseX >= canvas.width - 100 && mouseX <= canvas.width - 20 && mouseY >= 20 && mouseY <= 60) {
        showMenu = !showMenu;
        showShop = false; // 关闭商城
    }
    
    // 商城按钮点击
    if (mouseX >= canvas.width - 200 && mouseX <= canvas.width - 120 && mouseY >= 20 && mouseY <= 60) {
        showShop = !showShop;
        showMenu = false; // 关闭菜单
    }
    
    // 菜单选项点击
    if (showMenu) {
        // 继续游戏按钮
        if (mouseX >= canvas.width / 2 - 80 && mouseX <= canvas.width / 2 + 80 && mouseY >= canvas.height / 2 - 60 && mouseY <= canvas.height / 2 - 20) {
            showMenu = false;
        }
        
        // 重新开始按钮
        if (mouseX >= canvas.width / 2 - 80 && mouseX <= canvas.width / 2 + 80 && mouseY >= canvas.height / 2 - 10 && mouseY <= canvas.height / 2 + 30) {
            return { action: 'restart' };
        }
        
        // 退出游戏按钮
        if (mouseX >= canvas.width / 2 - 80 && mouseX <= canvas.width / 2 + 80 && mouseY >= canvas.height / 2 + 40 && mouseY <= canvas.height / 2 + 80) {
            // 退出游戏，这里只是刷新页面
            location.reload();
        }
    }
    
    // 商城选项点击
    if (showShop) {
        // 增加移动速度
        if (mouseX >= canvas.width / 2 - 180 && mouseX <= canvas.width / 2 - 20 && mouseY >= canvas.height / 2 - 100 && mouseY <= canvas.height / 2 - 60) {
            if (score >= 100) {
                return { action: 'upgradeSpeed' };
            } else {
                addNotification('金币不足，需要100金币');
            }
        }
        
        // 增加跳跃高度
        if (mouseX >= canvas.width / 2 - 180 && mouseX <= canvas.width / 2 - 20 && mouseY >= canvas.height / 2 - 50 && mouseY <= canvas.height / 2 - 10) {
            if (score >= 100) {
                return { action: 'upgradeJump' };
            } else {
                addNotification('金币不足，需要100金币');
            }
        }
        
        // 增加当前生命值
        if (mouseX >= canvas.width / 2 - 180 && mouseX <= canvas.width / 2 - 20 && mouseY >= canvas.height / 2 && mouseY <= canvas.height / 2 + 40) {
            if (score >= 100) {
                return { action: 'upgradeCurrentHealth' };
            } else {
                addNotification('金币不足，需要100金币');
            }
        }
        
        // 增加最大生命值
        if (mouseX >= canvas.width / 2 - 180 && mouseX <= canvas.width / 2 - 20 && mouseY >= canvas.height / 2 + 50 && mouseY <= canvas.height / 2 + 90) {
            if (score >= 100) {
                return { action: 'upgradeMaxHealth' };
            } else {
                addNotification('金币不足，需要100金币');
            }
        }
        
        // 购买小刀
        if (mouseX >= canvas.width / 2 + 20 && mouseX <= canvas.width / 2 + 180 && mouseY >= canvas.height / 2 - 100 && mouseY <= canvas.height / 2 - 60) {
            if (score >= 200) {
                return { action: 'buyKnife' };
            } else {
                addNotification('金币不足，需要200金币');
            }
        }
        
        // 购买大刀
        if (mouseX >= canvas.width / 2 + 20 && mouseX <= canvas.width / 2 + 180 && mouseY >= canvas.height / 2 - 50 && mouseY <= canvas.height / 2 - 10) {
            if (score >= 400) {
                return { action: 'buyGreatsword' };
            } else {
                addNotification('金币不足，需要400金币');
            }
        }
        
        // 购买长枪
        if (mouseX >= canvas.width / 2 + 20 && mouseX <= canvas.width / 2 + 180 && mouseY >= canvas.height / 2 && mouseY <= canvas.height / 2 + 40) {
            if (score >= 800) {
                return { action: 'buySpear' };
            } else {
                addNotification('金币不足，需要800金币');
            }
        }
        
        // 购买恢复药水
        if (mouseX >= canvas.width / 2 + 20 && mouseX <= canvas.width / 2 + 180 && mouseY >= canvas.height / 2 + 50 && mouseY <= canvas.height / 2 + 90) {
            if (score >= 100) {
                return { action: 'buyHealingPotion' };
            } else {
                addNotification('金币不足，需要100金币');
            }
        }
        
        // 关闭按钮
        if (mouseX >= canvas.width / 2 - 60 && mouseX <= canvas.width / 2 + 60 && mouseY >= canvas.height / 2 + 100 && mouseY <= canvas.height / 2 + 140) {
            showShop = false;
        }
    }
    
    // 游戏结束界面点击
    if (gameOver) {
        const buttonWidth = 200;
        const buttonHeight = 60;
        const buttonX = (canvas.width - buttonWidth) / 2;
        const buttonY = canvas.height / 2 + 50;
        
        if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
            mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
            return { action: 'restart' };
        }
    }
    
    return null;
}

export { 
    showMenu, 
    showShop, 
    showWelcome, 
    drawWelcome, 
    drawMenuButton, 
    drawShopButton, 
    drawMenu, 
    drawShop, 
    drawHUD, 
    drawGameOver, 
    handleClick,
    addNotification,
    updateNotifications,
    drawNotifications
};