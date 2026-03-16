// 武器系统模块

// 武器类型定义
const weaponTypes = {
    fist: {
        name: '空手',
        damage: 1,
        range: 40,
        image: 'Fist.png',
        durability: Infinity // 耐久无限
    },
    knife: {
        name: '小刀',
        damage: 2,
        range: 60,
        image: 'Small knife.png',
        durability: 10
    },
    greatsword: {
        name: '大刀',
        damage: 4,
        range: 80,
        image: 'Greatsword.png',
        durability: 20
    },
    spear: {
        name: '长枪',
        damage: 3,
        range: 100,
        image: 'Spear.png',
        durability: 30
    }
};

// 武器工厂函数
function createWeapon(type) {
    const weaponData = weaponTypes[type];
    if (weaponData) {
        return {
            type: type,
            name: weaponData.name,
            damage: weaponData.damage,
            range: weaponData.range,
            durability: weaponData.durability,
            width: 32,
            height: 32
        };
    }
    // 默认返回空手武器
    const fistData = weaponTypes.fist;
    return {
        type: 'fist',
        name: fistData.name,
        damage: fistData.damage,
        range: 20, // 使用游戏中的实际攻击范围
        durability: fistData.durability,
        width: 32,
        height: 32
    };
}

// 武器列表
let weapons = [];

// 生成武器
function generateWeapon(x, y, type) {
    const weaponData = weaponTypes[type];
    if (weaponData) {
        const weapon = {
            x: x,
            y: y,
            width: 32,
            height: 32,
            type: type,
            damage: weaponData.damage,
            range: weaponData.range,
            name: weaponData.name,
            image: weaponData.image,
            durability: weaponData.durability
        };
        weapons.push(weapon);
        return weapon;
    }
    return null;
}

// 随机生成武器
function generateRandomWeapon(x, y) {
    const types = Object.keys(weaponTypes);
    const randomType = types[Math.floor(Math.random() * types.length)];
    return generateWeapon(x, y, randomType);
}

// 更新武器
function updateWeapons() {
    // 这里可以添加武器的动画或其他逻辑
}

// 绘制武器
function drawWeapons(ctx, camera, assets) {
    for (const weapon of weapons) {
        if (assets.loaded && assets[weapon.type]) {
            ctx.drawImage(assets[weapon.type], weapon.x - camera.x, weapon.y - camera.y, weapon.width, weapon.height);
        } else {
            // 默认武器绘制
            ctx.fillStyle = '#FFFF00';
            ctx.fillRect(weapon.x - camera.x, weapon.y - camera.y, weapon.width, weapon.height);
        }
    }
}

// 检测武器碰撞
function checkWeaponCollision(player) {
    for (let i = weapons.length - 1; i >= 0; i--) {
        const weapon = weapons[i];
        if (checkCollision(player, weapon)) {
            // 移除武器
            weapons.splice(i, 1);
            return weapon;
        }
    }
    return null;
}

// 碰撞检测
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// 清空武器
function clearWeapons() {
    weapons = [];
}

export { weaponTypes, weapons, generateWeapon, generateRandomWeapon, updateWeapons, drawWeapons, checkWeaponCollision, clearWeapons, createWeapon };