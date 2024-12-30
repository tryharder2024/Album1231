class FullscreenManager {
    constructor() {
        this.isFullscreen = false;
        this.setupFullscreenListener();
        this.setupExitListener();
    }

    setupFullscreenListener() {
        document.addEventListener('click', (e) => {
            // 如果点击的是图片选择按钮，不处理全屏
            if (e.target.closest('#imageSelector') || e.target.closest('#imageInput')) {
                return;
            }
            
            if (!this.isFullscreen) {
                this.enterFullscreen();
            }
        });
    }

    setupExitListener() {
        // 监听全屏变化事件
        document.addEventListener('fullscreenchange', () => {
            this.isFullscreen = !!document.fullscreenElement;
        });

        document.addEventListener('webkitfullscreenchange', () => {
            this.isFullscreen = !!document.webkitFullscreenElement;
        });
    }

    enterFullscreen() {
        const element = document.documentElement;
        
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
        
        this.isFullscreen = true;
    }
}

// 初始化全屏管理器
document.addEventListener('DOMContentLoaded', () => {
    new FullscreenManager();
}); 