// 优化版 - 减少重绘和性能开销
(function() {
    // 只在移动端启用
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return;
    
    // 等待页面加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackgroundFix);
    } else {
        setTimeout(initBackgroundFix, 100);
    }
    
    function initBackgroundFix() {
        const bgElement = document.getElementById('web_bg');
        if (!bgElement) return;
        
        let isFixed = false;
        let resizeTimeout;
        
        // 使用轻量级修复方案
        function applyLightweightFix() {
            if (isFixed) return;
            
            // 只设置必要的样式
            bgElement.style.position = 'fixed';
            bgElement.style.top = '0';
            bgElement.style.left = '0';
            bgElement.style.zIndex = '-1';
            bgElement.style.backgroundAttachment = 'fixed';
            
            isFixed = true;
            console.log('背景图轻量级修复已应用');
        }
        
        // 移除可能影响性能的样式
        function removeHeavyStyles() {
            bgElement.style.width = '';
            bgElement.style.height = '';
        }
        
        // 初始应用
        applyLightweightFix();
        removeHeavyStyles();
        
        // 简化的resize处理
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(applyLightweightFix, 150);
        });
    }
})();