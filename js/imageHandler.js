document.addEventListener('DOMContentLoaded', function() {
    const imageBtn = document.getElementById('imageSelector');
    const imageInput = document.getElementById('imageInput');
    const cube = document.getElementById('cube');
    const floatingPhotos = document.querySelector('.floating-photos');
    
    // 默认图片路径数组
    const defaultImages = {
        cube: [
            'images/1.jpg',
            'images/2.jpg',
            'images/3.jpg',
            'images/4.jpg',
            'images/5.jpg',
            'images/6.jpg'
        ],
        floating: [
            'images/float1.jpg',
            'images/float2.jpg',
            'images/float3.jpg',
            'images/float4.jpg',
            'images/float5.jpg',
            'images/float7.jpg'
        ]
    };

    // 当前使用的图片数组
    let currentImages = {
        cube: [...defaultImages.cube],
        floating: [...defaultImages.floating]
    };

    imageBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止点击事件冒泡
        imageInput.click();
    });

    imageInput.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止点击事件冒泡
    });

    imageInput.addEventListener('change', async function(e) {
        const files = Array.from(e.target.files);
        
        if (files.length > 12) {
            alert('最多只能选择12张图片！');
            return;
        }

        // 重置图片数组
        currentImages.cube = [...defaultImages.cube];
        currentImages.floating = [...defaultImages.floating];

        // 处理选择的图片
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file.type.startsWith('image/')) {
                continue;
            }

            const imageUrl = URL.createObjectURL(file);
            
            if (i < 6) {
                // 更新魔方面的图片
                currentImages.cube[i] = imageUrl;
                const face = cube.querySelector(`.face:nth-child(${i + 1}) img`);
                face.src = imageUrl;
            } else if (i < 12) {
                // 更新悬浮图片
                currentImages.floating[i - 6] = imageUrl;
                const floatingImg = floatingPhotos.querySelector(`.floating-photo:nth-child(${i - 5}) img`);
                floatingImg.src = imageUrl;
            }
        }

        // 使用默认图片补充不足的部分
        for (let i = files.length; i < 6; i++) {
            if (i < 6) {
                const face = cube.querySelector(`.face:nth-child(${i + 1}) img`);
                face.src = defaultImages.cube[i];
            }
            if (i >= 6 && i < 12) {
                const floatingImg = floatingPhotos.querySelector(`.floating-photo:nth-child(${i - 5}) img`);
                floatingImg.src = defaultImages.floating[i - 6];
            }
        }
    });
}); 