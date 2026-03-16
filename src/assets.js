// 素材加载模块
const assets = {
    player: null,
    coin: null,
    platform: null,
    bg: null,
    bomb: null,
    boss: null,
    boss2: null, // boss2图片
    hurt: null, // 伤害效果图片
    hp: null, // 生命值图标
    fist: null, // 空手图片
    knife: null, // 小刀图片
    greatsword: null, // 大刀图片
    spear: null, // 长枪图片
    healingPotion: null, // 恢复药水图片
    loaded: false
};

// 加载素材
function loadAssets() {
    return new Promise((resolve) => {
        console.log('开始加载素材...');
        
        let loadedCount = 0;
        const totalAssets = 14;
        
        // 尝试加载素材
        const playerImg = new Image();
        playerImg.src = 'assets/phaser-dude.png';
        playerImg.onload = function() {
            console.log('player.png 加载成功');
            assets.player = playerImg;
            loadedCount++;
            checkAllLoaded();
        };
        playerImg.onerror = function() {
            console.log('无法加载player.png');
            loadedCount++;
            checkAllLoaded();
        };
        
        const coinImg = new Image();
        coinImg.src = 'assets/coin.png';
        coinImg.onload = function() {
            console.log('coin.png 加载成功');
            assets.coin = coinImg;
            loadedCount++;
            checkAllLoaded();
        };
        coinImg.onerror = function() {
            console.log('无法加载coin.png');
            loadedCount++;
            checkAllLoaded();
        };
        
        const platformImg = new Image();
        platformImg.src = 'assets/platform.png';
        platformImg.onload = function() {
            console.log('platform.png 加载成功');
            assets.platform = platformImg;
            loadedCount++;
            checkAllLoaded();
        };
        platformImg.onerror = function() {
            console.log('无法加载platform.png');
            loadedCount++;
            checkAllLoaded();
        };
        
        const bgImg = new Image();
        bgImg.src = 'assets/bg.png';
        bgImg.onload = function() {
            console.log('bg.png 加载成功');
            assets.bg = bgImg;
            loadedCount++;
            checkAllLoaded();
        };
        bgImg.onerror = function() {
            console.log('无法加载bg.png');
            loadedCount++;
            checkAllLoaded();
        };
        
        const bombImg = new Image();
        bombImg.src = 'assets/boom.png';
        bombImg.onload = function() {
            console.log('boom.png 加载成功');
            assets.bomb = bombImg;
            loadedCount++;
            checkAllLoaded();
        };
        bombImg.onerror = function() {
            console.log('无法加载boom.png');
            loadedCount++;
            checkAllLoaded();
        };
        
        // 加载伤害效果图片
        const hurtImg = new Image();
        hurtImg.src = 'assets/hurt.png';
        hurtImg.onload = function() {
            console.log('hurt.png 加载成功');
            assets.hurt = hurtImg;
            loadedCount++;
            checkAllLoaded();
        };
        hurtImg.onerror = function() {
            console.log('无法加载hurt.png');
            loadedCount++;
            checkAllLoaded();
        };
        
        // 创建一个实际的img元素来加载GIF，这样浏览器会自动播放动画
        const bossImg = document.createElement('img');
        bossImg.style.display = 'none'; // 隐藏img元素，只用于绘制到canvas
        document.body.appendChild(bossImg);
        bossImg.src = 'assets/boss1.gif';
        bossImg.onload = function() {
            console.log('boss1.gif 加载成功');
            assets.boss = bossImg;
            loadedCount++;
            checkAllLoaded();
        };
        bossImg.onerror = function() {
            console.log('无法加载boss1.gif');
            loadedCount++;
            checkAllLoaded();
        };
        
        // 加载生命值图标
        const hpImg = new Image();
        hpImg.src = 'assets/HP.png';
        hpImg.onload = function() {
            console.log('HP.png 加载成功');
            assets.hp = hpImg;
            loadedCount++;
            checkAllLoaded();
        };
        hpImg.onerror = function() {
            console.log('无法加载HP.png');
            loadedCount++;
            checkAllLoaded();
        };
        
        // 加载boss2图片
        const boss2Img = new Image();
        boss2Img.src = 'assets/boss2.png';
        boss2Img.onload = function() {
            console.log('boss2.png 加载成功');
            assets.boss2 = boss2Img;
            loadedCount++;
            checkAllLoaded();
        };
        boss2Img.onerror = function() {
            console.log('无法加载boss2.png');
            loadedCount++;
            checkAllLoaded();
        };
        
        // 加载小刀图片
        const knifeImg = new Image();
        knifeImg.src = 'assets/Small knife.png';
        knifeImg.onload = function() {
            console.log('Small knife.png 加载成功');
            assets.knife = knifeImg;
            loadedCount++;
            checkAllLoaded();
        };
        knifeImg.onerror = function() {
            console.log('无法加载Small knife.png');
            loadedCount++;
            checkAllLoaded();
        };
        
        // 加载大刀图片
        const greatswordImg = new Image();
        greatswordImg.src = 'assets/Greatsword.png';
        greatswordImg.onload = function() {
            console.log('Greatsword.png 加载成功');
            assets.greatsword = greatswordImg;
            loadedCount++;
            checkAllLoaded();
        };
        greatswordImg.onerror = function() {
            console.log('无法加载Greatsword.png');
            loadedCount++;
            checkAllLoaded();
        };
        
        // 加载长枪图片
        const spearImg = new Image();
        spearImg.src = 'assets/Spear.png';
        spearImg.onload = function() {
            console.log('Spear.png 加载成功');
            assets.spear = spearImg;
            loadedCount++;
            checkAllLoaded();
        };
        spearImg.onerror = function() {
            console.log('无法加载Spear.png');
            loadedCount++;
            checkAllLoaded();
        };
        
        // 加载空手图片
        const fistImg = new Image();
        fistImg.src = 'assets/Fist.png';
        fistImg.onload = function() {
            console.log('Fist.png 加载成功');
            assets.fist = fistImg;
            loadedCount++;
            checkAllLoaded();
        };
        fistImg.onerror = function() {
            console.log('无法加载Fist.png');
            loadedCount++;
            checkAllLoaded();
        };
        
        // 加载恢复药水图片
        const healingPotionImg = new Image();
        healingPotionImg.src = 'assets/Healing Potion.png';
        healingPotionImg.onload = function() {
            console.log('Healing Potion.png 加载成功');
            assets.healingPotion = healingPotionImg;
            loadedCount++;
            checkAllLoaded();
        };
        healingPotionImg.onerror = function() {
            console.log('无法加载Healing Potion.png');
            loadedCount++;
            checkAllLoaded();
        };
        
        function checkAllLoaded() {
            if (loadedCount >= totalAssets) {
                assets.loaded = true;
                console.log('所有素材加载完成');
                resolve(assets);
            }
        }
        
        // 防止所有素材都加载失败的情况
        setTimeout(() => {
            if (!assets.loaded) {
                console.log('超时，标记素材为加载完成');
                assets.loaded = true;
                resolve(assets);
            }
        }, 2000);
    });
}

export { assets, loadAssets };