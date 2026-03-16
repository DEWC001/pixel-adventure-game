// 游戏配置模块
// 该文件包含游戏的所有初始化参数和配置，方便统一管理和修改

/**
 * 游戏配置对象
 * 包含游戏的基本设置和物理参数
 */
export const config = {
    // 画布尺寸
    minWidth: 800, // 最小宽度
    minHeight: 600, // 最小高度
    
    // 物理参数
    gravity: 0.8, // 重力加速度
    playerSpeed: 5, // 玩家移动速度
    playerJumpPower: 12, // 玩家跳跃力度
    
    // 平台相关参数
    platformHeight: 20, // 平台高度
    platformWidthMin: 50, // 平台最小宽度
    platformWidthMax: 500, // 平台最大宽度
    platformSpacingMin: 100, // 平台最小间距
    platformSpacingMax: 200, // 平台最大间距
    firstPlatformMaxHeight: 100, // 第一个平台的最大高度
    
    // 金币相关参数
    coinCount: 12, // 金币数量
    coinHeightRange: 60, // 金币生成范围（平台上方0-60像素）
    
    // 钻石相关参数
    diamondCount: 5, // 钻石数量
    diamondSpawnProbability: 0.05, // 钻石生成概率（5%）
    
    // 游戏世界尺寸
    gameWorldWidth: 2000, // 游戏世界宽度
    gameWorldHeight: 3000 // 游戏世界高度
};

/**
 * 相机对象
 * 用于实现滑动窗口效果，跟随玩家移动
 */
export const camera = {
    x: 0, // 相机x坐标
    y: 0, // 相机y坐标
    width: 800, // 相机宽度
    height: 600 // 相机高度
};

/**
 * 游戏状态初始值
 * 包含游戏的初始状态变量
 */
export const initialGameState = {
    score: 0, // 初始分数
    gameOver: false, // 游戏是否结束
    gameOverTimer: 0, // 游戏结束计时器
    playerHealth: 10, // 玩家初始生命值
    maxHealth: 10, // 玩家初始最大生命值
    isInvincible: false, // 玩家是否无敌
    invincibleTimer: 0, // 无敌时间计时器
    isHurt: false, // 玩家是否受到伤害
    hurtTimer: 0, // 伤害效果持续时间计时器
    isPaused: false, // 游戏是否暂停
    diamondsCollected: 0 // 已收集钻石数量
};

/**
 * 按键状态初始值
 * 用于跟踪玩家的按键输入
 */
export const initialKeys = {
    left: false, // 左箭头键
    right: false, // 右箭头键
    up: false, // 上箭头键
    upPressed: false, // 上箭头键是否刚刚被按下
    space: false, // 空格键
    spacePressed: false // 空格键是否刚刚被按下
};

/**
 * 平台和金币初始值
 * 用于存储游戏中的平台和金币
 */
export const initialGameObjects = {
    platforms: [], // 平台数组
    coins: [], // 金币数组
    diamonds: [] // 钻石数组
};
