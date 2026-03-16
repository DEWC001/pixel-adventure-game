// 绘制相关函数

// 绘制金币图标（默认）
export function drawCoin(ctx, x, y, size) {
    // 金币外圈
    const gradient1 = ctx.createRadialGradient(x + size/2, y + size/4, 0, x + size/2, y + size/4, size/2);
    gradient1.addColorStop(0, '#FFD700');
    gradient1.addColorStop(1, '#FFA500');
    ctx.fillStyle = gradient1;
    ctx.beginPath();
    ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2);
    ctx.fill();
    
    // 金币内圈
    const gradient2 = ctx.createRadialGradient(x + size/2, y + size/4, 0, x + size/2, y + size/4, size/3);
    gradient2.addColorStop(0, '#FFFFE0');
    gradient2.addColorStop(1, '#FFD700');
    ctx.fillStyle = gradient2;
    ctx.beginPath();
    ctx.arc(x + size/2, y + size/2, size/3, 0, Math.PI * 2);
    ctx.fill();
    
    // 美元符号
    ctx.fillStyle = '#8B4513';
    ctx.font = `${size/2}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('$', x + size/2, y + size/2);
    
    // 高光
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(x + size/3, y + size/3, size/8, 0, Math.PI * 2);
    ctx.fill();
}

// 绘制炸弹图标
export function drawBomb(ctx, x, y, size) {
    // 炸弹外圈
    const gradient1 = ctx.createRadialGradient(x + size/2, y + size/4, 0, x + size/2, y + size/4, size/2);
    gradient1.addColorStop(0, '#FF4444');
    gradient1.addColorStop(1, '#CC0000');
    ctx.fillStyle = gradient1;
    ctx.beginPath();
    ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2);
    ctx.fill();
    
    // 炸弹内圈
    const gradient2 = ctx.createRadialGradient(x + size/2, y + size/4, 0, x + size/2, y + size/4, size/3);
    gradient2.addColorStop(0, '#FF8888');
    gradient2.addColorStop(1, '#FF4444');
    ctx.fillStyle = gradient2;
    ctx.beginPath();
    ctx.arc(x + size/2, y + size/2, size/3, 0, Math.PI * 2);
    ctx.fill();
    
    // 感叹号
    ctx.fillStyle = '#000000';
    ctx.font = `${size/2}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('!', x + size/2, y + size/2);
}
