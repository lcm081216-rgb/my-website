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
