// 使用 Intersection Observer API 实现高性能的滚动监听
document.addEventListener('DOMContentLoaded', () => {
 const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
 };

 const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
   if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
   }
  });
 }, observerOptions);

 const revealElements = document.querySelectorAll('.smooth-reveal');
 revealElements.forEach(el => {
  observer.observe(el);
 });

 // 备用：如果1秒内observer没触发，直接显示所有元素
 setTimeout(() => {
  revealElements.forEach(el => {
   if (!el.classList.contains('visible')) {
    el.classList.add('visible');
   }
  });
 }, 1000);
});

// ========== 我的足迹 - 中国地图 ==========
(function() {
 var visitedProvinces = [
  'beijing','shanghai','nei-mongol','jilin','sichuan','yunnan',
  'jiangsu','zhejiang','anhui','shandong','guangdong','guangxi-zhuang',
  'hainan','hong-kong','macau'
 ];

 var wrap = document.getElementById('mapWrapper');
 if (!wrap) return;

 fetch('assets/china-map.svg')
  .then(function(r) { return r.text(); })
  .then(function(svgText) {
   wrap.innerHTML = svgText;
   var svg = wrap.querySelector('svg');
   if (!svg) return;
   svg.classList.add('china-map-svg');
   svg.querySelectorAll('path[id]').forEach(function(p) {
    if (visitedProvinces.indexOf(p.id) !== -1) p.classList.add('visited');
   });
  })
  .catch(function(e) { console.warn('地图加载失败', e); });
})();

// ========== 我的世界足迹 ==========
(function() {
 var visitedCountries = [
  'us','nz','au','kr','jp','cn','th','mv','mu','my','sg','id'
 ];

 var wrap = document.getElementById('worldMapWrapper');
 if (!wrap) return;

 fetch('assets/world-map.svg')
  .then(function(r) { return r.text(); })
  .then(function(svgText) {
   wrap.innerHTML = svgText;
   var svg = wrap.querySelector('svg');
   if (!svg) return;
   svg.classList.add('world-map-svg');
   svg.querySelectorAll('path[id]').forEach(function(p) {
    if (visitedCountries.indexOf(p.id) !== -1) p.classList.add('visited');
   });
  })
  .catch(function(e) { console.warn('世界地图加载失败', e); });
})();

// ========== 爱好弹窗 (小白专用增强版) ==========
document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('hobbyModal');
    var modalTitle = document.getElementById('hobbyModalTitle');
    var modalBody = document.getElementById('hobbyModalBody');
    var closeBtn = document.querySelector('.hobby-modal-close');

    // 爱好数据：请务必检查你的图片文件名是 .jpg 还是 .JPG
    // 如果网页还是没图，把下面的 .jpg 改成 .JPG 试试
    var hobbyData = {
        '摄影': { images: ['assets/hobby1-1.jpg', 'assets/hobby1-2.jpg', 'assets/hobby1-3.jpg', 'assets/hobby1-4.jpg'] },
        '旅游': { images: ['assets/hobby2-1.jpg', 'assets/hobby2-2.jpg', 'assets/hobby2-3.jpg', 'assets/hobby2-4.jpg'] },
        '骑车': { images: ['assets/hobby3-1.jpg'] },
        '主机游戏': { images: ['assets/hobby4-1.jpg'] },
        '画画': { images: ['assets/hobby5-1.jpg'] },
        '滑雪': { images: ['assets/hobby6-1.jpg'] },
        '数码': { images: ['assets/hobby7-1.jpg'] }
    };

    // 点击爱好卡片
    document.querySelectorAll('.hobby-card').forEach(function(card) {
        card.addEventListener('click', function() {
            // 获取名字并去掉空格（解决你点击没反应的问题）
            var name = this.querySelector('.hobby-name').textContent.trim();
            var data = hobbyData[name];

            if (!data) {
                console.error('找不到这个爱好的图片，请检查 HTML 里的文字是否写对了:', name);
                return;
            }

            // 填写标题
            modalTitle.textContent = name;
            // 清空旧图片
            modalBody.innerHTML = ''; 

            // 循环生成新图片
            data.images.forEach(function(imgSrc) {
                var imgEl = document.createElement('img');
                imgEl.src = imgSrc;
                imgEl.alt = name;
                imgEl.style.width = '100%';       // 让图片撑满宽度
                imgEl.style.marginBottom = '15px'; // 图片之间留点空隙
                
                // 如果图片加载失败，在控制台报警提示你
                imgEl.onerror = function() {
                    console.warn('图片没找到，请检查 assets 文件夹里有没有这个文件:', imgSrc);
                };

                modalBody.appendChild(imgEl);
            });

            // 显示弹窗
            modal.classList.add('active');
            // 让弹窗滚动条回到最顶上
            modal.scrollTop = 0;
        });
    });

    // 关闭弹窗的逻辑
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }

    // 点击弹窗外面也能关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.classList.remove('active');
    });

    // 按 Esc 键也能关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') modal.classList.remove('active');
    });
});
