// 排行榜系统模块

/**
 * 排行榜数据结构
 * @typedef {Object} RankingEntry
 * @property {string} name - 玩家名称
 * @property {number} time - 通关时间（秒）
 * @property {number} score - 最终分数
 * @property {string} date - 游戏日期
 */

// 排行榜数据
let rankings = [];
const MAX_RANKINGS = 10; // 最多显示10条记录

/**
 * 加载排行榜数据
 */
export function loadRankings() {
    try {
        const storedRankings = localStorage.getItem('gameRankings');
        if (storedRankings) {
            rankings = JSON.parse(storedRankings);
        }
    } catch (error) {
        console.error('Failed to load rankings:', error);
        rankings = [];
    }
}

/**
 * 保存排行榜数据
 */
export function saveRankings() {
    try {
        localStorage.setItem('gameRankings', JSON.stringify(rankings));
    } catch (error) {
        console.error('Failed to save rankings:', error);
    }
}

/**
 * 添加新的排行榜记录
 * @param {string} name - 玩家名称
 * @param {number} time - 通关时间（秒）
 * @param {number} score - 最终分数
 */
export function addRanking(name, time, score) {
    const newRanking = {
        name: name,
        time: time,
        score: score,
        date: new Date().toISOString().split('T')[0]
    };
    
    // 添加新记录
    rankings.push(newRanking);
    
    // 按时间排序（时间越短排名越靠前）
    rankings.sort((a, b) => a.time - b.time);
    
    // 只保留前MAX_RANKINGS条记录
    if (rankings.length > MAX_RANKINGS) {
        rankings = rankings.slice(0, MAX_RANKINGS);
    }
    
    // 保存到本地存储
    saveRankings();
}

/**
 * 获取排行榜数据
 * @returns {Array<RankingEntry>} 排行榜数据
 */
export function getRankings() {
    return rankings;
}

/**
 * 清空排行榜数据
 */
export function clearRankings() {
    rankings = [];
    saveRankings();
}

// 初始加载排行榜数据
loadRankings();
