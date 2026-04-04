// 使用 Intersection Observer API 实现高性能的滚动监听
document.addEventListener('DOMContentLoaded', () => {
 // 获取所有带有 smooth-reveal 类的元素
 const observerOptions = {
 root: null,
 rootMargin: '0px',
 threshold: 0.1 // 元素出现 10% 的时候触发动画
 };

 const observer = new IntersectionObserver((entries, observer) => {
 entries.forEach(entry => {
 // 当元素进入视口
 if (entry.isIntersecting) {
 // 添加可见的 class 触发 CSS 过渡动画
 entry.target.classList.add('visible');
 // 动画触发一次后就取消监听，提高性能
 observer.unobserve(entry.target);
 }
 });
 }, observerOptions);

 const revealElements = document.querySelectorAll('.smooth-reveal');
 revealElements.forEach(el => {
 observer.observe(el);
 });
});
/* ========== 我的足迹 - 中国地图 ========== */
.map-container {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 16px rgba(0,0,0,0.04);
}

.map-wrapper {
  width: 100%;
  height: 380px;
  background: #f8f5f1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.china-map-svg {
  width: 90%;
  height: 90%;
  max-width: 600px;
  max-height: 400px;
  display: block;
}

.china-map-svg path {
  fill: #f5f5f5;
  stroke: #000;
  stroke-width: 0.3px;
  transition: all 0.3s ease;
  cursor: crosshair;
}

.china-map-svg path:hover {
  fill: #e8e4df;
  stroke-width: 0.5px;
}

.china-map-svg path.visited {
  fill: #8b7d6b !important;
}

.china-map-svg path.visited:hover {
  fill: #7a6d5d !important;
}

.map-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  background: #fff;
  border-top: 1px solid #e8e4df;
}

.map-stats {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.stat-number {
  font-size: 24px;
  font-weight: 300;
  color: #8b7d6b;
}

.stat-label {
  font-size: 14px;
  color: #9a8f7f;
}

.map-legend {
  display: flex;
  gap: 24px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #6b6b6b;
}

.legend-dot {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  border: 1px solid #000;
}

.legend-dot.visited {
  background: #8b7d6b;
}

.legend-dot.unvisited {
  background: #f5f5f5;
}

.legend-text {
  font-size: 12px;
  color: #9a8f7f;
}
