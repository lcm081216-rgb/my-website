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
 var visitedProvinces = {
  'beijing': 1,
  'shanghai': 5,
  'nei-mongol': 1,
  'jilin': 2,
  'sichuan': 1,
  'yunnan': 2,
  'jiangsu': 10,
  'zhejiang': 5,
  'anhui': 4,
  'shandong': 2,
  'guangdong': 3,
  'guangxi-zhuang': 1,
  'hainan': 4,
  'hong-kong': 3,
  'macau': 2
 };

 // 颜色深度映射
 function getLevelClass(count) {
  if (count >= 5) return 'level-5';
  if (count >= 4) return 'level-4';
  if (count >= 3) return 'level-3';
  if (count >= 2) return 'level-2';
  if (count >= 1) return 'level-1';
  return 'level-0';
 }

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
    var id = p.id;
    if (visitedProvinces.hasOwnProperty(id)) {
     var count = visitedProvinces[id];
     p.classList.add('visited', getLevelClass(count));
    }
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

// ========== 爱好弹窗 ==========
document.addEventListener('DOMContentLoaded', function() {
 var modal = document.getElementById('hobbyModal');
 var modalTitle = document.getElementById('hobbyModalTitle');
 var modalBody = document.getElementById('hobbyModalBody');
 var closeBtn = document.querySelector('.hobby-modal-close');

 // 爱好数据
 var hobbyData = {
  '摄影': {
   images: [
    'assets/hobby1-1.jpg',
    'assets/hobby1-2.jpg',
    'assets/hobby1-3.jpg',
    'assets/hobby1-4.jpg'
   ]
  },
  '旅游': {
   images: [
    'assets/hobby2-1.jpg',
    'assets/hobby2-2.jpg',
    'assets/hobby2-3.jpg',
    'assets/hobby2-4.jpg'
   ]
  },
  '骑车': {
   images: [
    'assets/hobby3-1.jpg',
    'assets/hobby3-2.jpg',
    'assets/hobby3-3.jpg'
   ]
  },
  '主机游戏': {
   images: [
    'assets/hobby4-1.jpg',
    'assets/hobby4-2.jpg',
    'assets/hobby4-3.jpg'
   ]
  },
  '画画': {
   images: [
    'assets/hobby5-1.jpg',
    'assets/hobby5-2.jpg',
    'assets/hobby5-3.jpg'
   ]
  },
  '滑雪': {
   images: [
    'assets/hobby6-1.jpg',
    'assets/hobby6-2.jpg',
    'assets/hobby6-3.jpg'
   ]
  },
  '数码': {
   images: [
    'assets/hobby7-1.jpg',
    'assets/hobby7-2.jpg',
    'assets/hobby7-3.jpg'
   ]
  }
 };

 // 点击爱好卡片
 document.querySelectorAll('.hobby-card').forEach(function(card) {
  card.addEventListener('click', function() {
   var name = this.querySelector('.hobby-name').textContent.trim();
   console.log('点击了爱好:', name);
   var data = hobbyData[name];
   if (!data) {
    console.warn('没有找到爱好数据:', name);
    return;
   }

   modalTitle.textContent = name;
   modalBody.innerHTML = '';
   data.images.forEach(function(img, i) {
    var imgEl = document.createElement('img');
    imgEl.src = img;
    imgEl.alt = name;
    if (i === 0) imgEl.classList.add('full-width');
    modalBody.appendChild(imgEl);
   });

   modal.classList.add('active');
  });
 });

 // 关闭弹窗
 if (closeBtn) {
  closeBtn.addEventListener('click', function() {
   modal.classList.remove('active');
  });
 }

 modal.addEventListener('click', function(e) {
  if (e.target === modal) modal.classList.remove('active');
 });

 document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') modal.classList.remove('active');
 });
});