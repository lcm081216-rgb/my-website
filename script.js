// 使用 Intersection Observer API 实现高性能的滚动监听
document.addEventListener('DOMContentLoaded', () => {
 // 获取所有带有 smooth-reveal 类的元素
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
