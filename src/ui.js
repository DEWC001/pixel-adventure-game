// 页面布局模块

// UI状态
let showMenu = false; // 菜单显示状态
let showShop = false; // 商城显示状态
let showWelcome = true; // 欢迎页面显示状态
let showRankings = false; // 排行榜显示状态

// 玩家名称
let playerName = '';
let nameInputActive = false;

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

// 处理键盘输入
function handleKeyboardInput(e) {
    if (showWelcome && nameInputActive) {
        if (e.key === 'Backspace') {
            // 退格键，删除最后一个字符
            playerName = playerName.slice(0, -1);
        } else if (e.key.length === 1 && e.key.match(/[a-zA-Z0-9_\u4e00-\u9fa5]/)) {
            // 只允许字母、数字、下划线和中文
            if (playerName.length < 10) { // 限制最大长度
                playerName += e.key;
            }
        }
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
        ctx.fillText('像素勇者：遗失的水晶', canvas.width / 2, canvas.height / 2 - 150);
        
        // 游戏描述
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px Arial';
        ctx.fillText('找到五颗钻石即可完成冒险', canvas.width / 2, canvas.height / 2 - 80);
        
        // 按键指南
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px Arial';
        ctx.fillText('方向键：移动、跳跃', canvas.width / 2, canvas.height / 2 - 30);
        ctx.fillText('空格键：攻击', canvas.width / 2, canvas.height / 2 + 10);
        ctx.fillText('菜单按钮：暂停游戏', canvas.width / 2, canvas.height / 2 + 50);
        ctx.fillText('商城按钮：购买装备和恢复药水', canvas.width / 2, canvas.height / 2 + 90);
        
        // 名称输入框
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(canvas.width / 2 - 150, canvas.height / 2 + 140, 300, 40);
        ctx.strokeStyle = nameInputActive ? '#4CAF50' : '#999999';
        ctx.lineWidth = 2;
        ctx.strokeRect(canvas.width / 2 - 150, canvas.height / 2 + 140, 300, 40);
        
        // 输入框提示文字
        ctx.fillStyle = playerName ? '#000000' : '#999999';
        ctx.font = '20px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(playerName || '请输入您的名称', canvas.width / 2 - 140, canvas.height / 2 + 165);
        
        // 开始游戏按钮（只有输入名称后才可用）
        ctx.fillStyle = playerName ? '#4CAF50' : '#cccccc';
        ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 + 200, 200, 60);
        ctx.fillStyle = '#fff';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('开始游戏', canvas.width / 2, canvas.height / 2 + 235);
        
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
    ctx.fillText('菜单', canvas.width - 75, 45);
}

// 绘制商城按钮
function drawShopButton(ctx, canvas) {
    // 绘制商城按钮
    ctx.fillStyle = '#FF9800';
    ctx.fillRect(canvas.width - 200, 20, 80, 40);
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.fillText('商城', canvas.width - 175, 45);
}

// 绘制排行榜按钮
function drawRankingsButton(ctx, canvas) {
    // 绘制排行榜按钮
    ctx.fillStyle = '#9C27B0';
    ctx.fillRect(canvas.width - 110, canvas.height - 60, 100, 40);
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.fillText('排行榜', canvas.width - 80, canvas.height - 35);
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
        ctx.textAlign = 'center';
        ctx.fillText('继续游戏', canvas.width / 2, canvas.height / 2 - 35);
        
        // 重新开始按钮
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(canvas.width / 2 - 80, canvas.height / 2 - 10, 160, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('重新开始', canvas.width / 2, canvas.height / 2 + 15);
        
        // 退出游戏按钮
        ctx.fillStyle = '#f44336';
        ctx.fillRect(canvas.width / 2 - 80, canvas.height / 2 + 40, 160, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
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
        ctx.textAlign = 'center';
        ctx.fillText('商城', canvas.width / 2, canvas.height / 2 - 160);
        
        // 左侧：属性升级
        const leftColumnX = canvas.width / 2 - 100;
        
        // 属性升级标题
        ctx.fillStyle = '#2196F3';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('属性升级', leftColumnX, canvas.height / 2 - 130);
        
        // 移动速度升级
        ctx.fillStyle = '#2196F3';
        ctx.fillRect(canvas.width / 2 - 180, canvas.height / 2 - 100, 160, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('移动速度 +2 (100金币)', leftColumnX, canvas.height / 2 - 75);
        
        // 跳跃高度升级
        ctx.fillStyle = '#9C27B0';
        ctx.fillRect(canvas.width / 2 - 180, canvas.height / 2 - 50, 160, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('跳跃高度 +1 (100金币)', leftColumnX, canvas.height / 2 - 25);
        
        // 增加当前生命值
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(canvas.width / 2 - 180, canvas.height / 2, 160, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('当前生命值 +1 (100金币)', leftColumnX, canvas.height / 2 + 25);
        
        // 增加最大生命值
        ctx.fillStyle = '#8BC34A';
        ctx.fillRect(canvas.width / 2 - 180, canvas.height / 2 + 50, 160, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('最大生命值 +1 (100金币)', leftColumnX, canvas.height / 2 + 75);
        
        // 右侧：武器购买
        const rightColumnX = canvas.width / 2 + 100;
        
        // 武器购买标题
        ctx.fillStyle = '#FF9800';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('武器购买', rightColumnX, canvas.height / 2 - 130);
        
        // 购买小刀
        ctx.fillStyle = '#FFC107';
        ctx.fillRect(canvas.width / 2 + 20, canvas.height / 2 - 100, 160, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('购买小刀 (200金币)', rightColumnX, canvas.height / 2 - 75);
        
        // 购买大刀
        ctx.fillStyle = '#FF9800';
        ctx.fillRect(canvas.width / 2 + 20, canvas.height / 2 - 50, 160, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('购买大刀 (400金币)', rightColumnX, canvas.height / 2 - 25);
        
        // 购买长枪
        ctx.fillStyle = '#F44336';
        ctx.fillRect(canvas.width / 2 + 20, canvas.height / 2, 160, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('购买长枪 (800金币)', rightColumnX, canvas.height / 2 + 25);
        
        // 购买恢复药水
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(canvas.width / 2 + 20, canvas.height / 2 + 50, 160, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('购买恢复药水 (100金币)', rightColumnX, canvas.height / 2 + 75);
        
        // 关闭按钮
        ctx.fillStyle = '#f44336';
        ctx.fillRect(canvas.width / 2 - 60, canvas.height / 2 + 100, 120, 40);
        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('关闭', canvas.width / 2, canvas.height / 2 + 125);
    }
}

// 绘制分数和生命值
function drawHUD(ctx, canvas, score, playerHealth, maxHealth, attackPower, currentWeapon, assets, diamondsCollected) {
    // 绘制钻石数量
    ctx.fillStyle = '#00ff0dff';
    ctx.font = '36px Arial';
    ctx.textAlign = 'center';
    if (assets.loaded && assets.diamond) {
        ctx.drawImage(assets.diamond, canvas.width / 2 - 80, 10, 32, 32);
    }
    ctx.fillText(': ' + diamondsCollected + '/5', canvas.width / 2, 40);
    
    // 左侧信息区域
    const leftX = 20; // 左侧信息起始位置
    
    // 绘制分数
    ctx.fillStyle = '#00ff0dff';
    ctx.font = '36px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('金币: ' + score, leftX, 40);
    
    // 绘制武器
    if (currentWeapon) {
        // 绘制武器图标
        if (assets.loaded && assets[currentWeapon.type]) {
            ctx.drawImage(assets[currentWeapon.type], leftX, 60, 48, 48);
        }
        // 绘制武器名称和耐久度
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px Arial';
        ctx.fillText(currentWeapon.name + ' (' + currentWeapon.durability + ')', leftX + 60, 90);
    } else {
        // 空手状态
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px Arial';
        ctx.fillText('空手', leftX + 60, 90);
    }
    
    // 绘制攻击力
    ctx.fillStyle = '#ffff00ff';
    ctx.font = '36px Arial';
    ctx.fillText('攻击力: ' + attackPower, leftX, 130);
    
    // 绘制生命值
    ctx.fillStyle = '#f77373ff';
    ctx.font = '36px Arial';
    if (assets.loaded && assets.hp) {
        ctx.drawImage(assets.hp, leftX, canvas.height - 65, 48, 48);
        ctx.fillText('生命值: ' + playerHealth + '/' + maxHealth, leftX + 60, canvas.height - 30);
    } else {
        ctx.fillText('生命值: ' + playerHealth + '/' + maxHealth, leftX, canvas.height - 30);
    }
}

// 绘制游戏结束界面
function drawGameOver(ctx, canvas, score, isGameWon, gameTime, rankings) {
    // 半透明背景
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (isGameWon) {
        // 通关文字
        ctx.fillStyle = '#00FF00';
        ctx.font = '64px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('恭喜通关!', canvas.width / 2, canvas.height / 2 - 150);
        
        // 恭喜信息
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '24px Arial';
        ctx.fillText('你成功收集了所有钻石，完成了冒险！', canvas.width / 2, canvas.height / 2 - 110);
        
        // 游戏时间
        ctx.fillStyle = '#FFFF00';
        ctx.font = '28px Arial';
        ctx.fillText('通关时间: ' + formatTime(gameTime), canvas.width / 2, canvas.height / 2 - 70);
        
        // 排行榜标题
        ctx.fillStyle = '#FFD700';
        ctx.font = '32px Arial';
        ctx.fillText('排行榜', canvas.width / 2, canvas.height / 2 - 30);
        
        // 绘制排行榜
        if (rankings && rankings.length > 0) {
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '18px Arial';
            ctx.textAlign = 'center';
            
            // 表头
            ctx.fillText('排名', canvas.width / 2 - 100, canvas.height / 2 + 10);
            ctx.fillText('玩家', canvas.width / 2 - 30, canvas.height / 2 + 10);
            ctx.fillText('时间', canvas.width / 2 + 40, canvas.height / 2 + 10);
            ctx.fillText('分数', canvas.width / 2 + 110, canvas.height / 2 + 10);
            
            // 分隔线
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - 150, canvas.height / 2 + 20);
            ctx.lineTo(canvas.width / 2 + 150, canvas.height / 2 + 20);
            ctx.stroke();
            
            // 排行榜数据
            for (let i = 0; i < Math.min(rankings.length, 5); i++) {
                const ranking = rankings[i];
                const y = canvas.height / 2 + 40 + i * 30;
                ctx.fillText((i + 1) + '', canvas.width / 2 - 100, y);
                ctx.fillText(ranking.name, canvas.width / 2 - 30, y);
                ctx.fillText(formatTime(ranking.time), canvas.width / 2 + 40, y);
                ctx.fillText(ranking.score, canvas.width / 2 + 110, y);
            }
        } else {
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '20px Arial';
            ctx.fillText('暂无排行榜数据', canvas.width / 2, canvas.height / 2 + 50);
        }
    } else {
        // 游戏结束文字
        ctx.fillStyle = '#FF0000';
        ctx.font = '64px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('游戏结束!', canvas.width / 2, canvas.height / 2 - 50);
        
        // 分数显示
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '32px Arial';
        ctx.fillText('最终金币: ' + score, canvas.width / 2, canvas.height / 2 + 30);
    }
    
    // 重新开始按钮
    const buttonWidth = 200;
    const buttonHeight = 60;
    const buttonY = isGameWon ? canvas.height / 2 + 200 : canvas.height / 2 + 80;
    const buttonX = (canvas.width - buttonWidth) / 2;
    
    // 按钮背景
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
    
    // 按钮文字
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('下一把', canvas.width / 2, buttonY + buttonHeight / 2 + 8);
}

// 格式化时间为 MM:SS 格式
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// 绘制排行榜界面
function drawRankings(ctx, canvas, rankings) {
    if (showRankings) {
        // 半透明背景
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 排行榜标题
        ctx.fillStyle = '#FFD700';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('排行榜', canvas.width / 2, canvas.height / 2 - 150);
        
        // 绘制排行榜
        if (rankings && rankings.length > 0) {
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '18px Arial';
            ctx.textAlign = 'center';
            
            // 表头
            ctx.fillText('排名', canvas.width / 2 - 100, canvas.height / 2 - 100);
            ctx.fillText('玩家', canvas.width / 2 - 30, canvas.height / 2 - 100);
            ctx.fillText('时间', canvas.width / 2 + 40, canvas.height / 2 - 100);
            ctx.fillText('分数', canvas.width / 2 + 110, canvas.height / 2 - 100);
            
            // 分隔线
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - 150, canvas.height / 2 - 85);
            ctx.lineTo(canvas.width / 2 + 150, canvas.height / 2 - 85);
            ctx.stroke();
            
            // 排行榜数据
            for (let i = 0; i < Math.min(rankings.length, 8); i++) {
                const ranking = rankings[i];
                const y = canvas.height / 2 - 60 + i * 30;
                ctx.fillText((i + 1) + '', canvas.width / 2 - 100, y);
                ctx.fillText(ranking.name, canvas.width / 2 - 30, y);
                ctx.fillText(formatTime(ranking.time), canvas.width / 2 + 40, y);
                ctx.fillText(ranking.score, canvas.width / 2 + 110, y);
            }
        } else {
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '24px Arial';
            ctx.fillText('暂无排行榜数据', canvas.width / 2, canvas.height / 2);
        }
        
        // 关闭按钮
        const buttonWidth = 120;
        const buttonHeight = 40;
        const buttonX = (canvas.width - buttonWidth) / 2;
        const buttonY = canvas.height / 2 + 150;
        
        ctx.fillStyle = '#f44336';
        ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('关闭', canvas.width / 2, buttonY + buttonHeight / 2 + 5);
    }
}

// 处理点击事件
function handleClick(mouseX, mouseY, canvas, gameOver, score, config, playerHealth) {
    // 欢迎页面点击
    if (showWelcome) {
        // 名称输入框点击
        if (mouseX >= canvas.width / 2 - 150 && mouseX <= canvas.width / 2 + 150 && mouseY >= canvas.height / 2 + 140 && mouseY <= canvas.height / 2 + 180) {
            nameInputActive = true;
        } else {
            nameInputActive = false;
        }
        
        // 开始游戏按钮（只有输入名称后才可用）
        if (mouseX >= canvas.width / 2 - 100 && mouseX <= canvas.width / 2 + 100 && mouseY >= canvas.height / 2 + 200 && mouseY <= canvas.height / 2 + 260) {
            if (playerName) {
                showWelcome = false;
            }
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
        showRankings = false; // 关闭排行榜
    }
    
    // 排行榜按钮点击
    if (mouseX >= canvas.width - 100 && mouseX <= canvas.width - 20 && mouseY >= canvas.height - 60 && mouseY <= canvas.height - 20) {
        showRankings = !showRankings;
        showMenu = false; // 关闭菜单
        showShop = false; // 关闭商城
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
    
    // 排行榜界面点击
    if (showRankings) {
        // 关闭按钮
        const buttonWidth = 120;
        const buttonHeight = 40;
        const buttonX = (canvas.width - buttonWidth) / 2;
        const buttonY = canvas.height / 2 + 150;
        
        if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
            mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
            showRankings = false;
        }
        return;
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
    showRankings, 
    drawWelcome, 
    drawMenuButton, 
    drawShopButton, 
    drawRankingsButton, 
    drawMenu, 
    drawShop, 
    drawRankings, 
    drawHUD, 
    drawGameOver, 
    handleClick,
    addNotification,
    updateNotifications,
    drawNotifications,
    handleKeyboardInput,
    playerName
};