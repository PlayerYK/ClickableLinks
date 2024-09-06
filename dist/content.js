function makeLinksClickable() {
  console.log('makeLinksClickable 函数开始执行');

  const urlRegex = /((?:https?|ftp):\/\/[^\s/$.?#].[^\s]*)|(\bfile:\/\/(?:\/|localhost\/)[^\s]+)|(\bmailto:[\w.-]+@[\w.-]+\.[a-z]{2,})|(\bmagnet:\?xt=urn:[^\s]+)|([\w.-]+@[\w.-]+\.[a-z]{2,})/gi;

  let nodeCount = 0;
  let processedCount = 0;

  function processNode(node) {
    nodeCount++;

    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.nodeValue.trim();
      if (!text) return;

      let parent = node.parentNode;
      if (parent.tagName === 'A' || parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') {
        return;
      }

      console.log(`正在处理节点 #${nodeCount}:`, text.substring(0, 50) + (text.length > 50 ? '...' : ''));

      let replacedText = text.replace(urlRegex, function(match) {
        console.log('找到匹配:', match);
        processedCount++;
        if (match.startsWith('http://') || match.startsWith('https://') || match.startsWith('ftp://')) {
          return `<a href="${match}" target="_blank">${match}</a>`;
        } else if (match.startsWith('file://')) {
          return `<a href="${match}">${match}</a>`;
        } else if (match.startsWith('mailto:')) {
          return `<a href="${match}">${match.slice(7)}</a>`;
        } else if (match.startsWith('magnet:')) {
          return `<a href="${match}">${match}</a>`;
        } else if (match.includes('@')) {
          return `<a href="mailto:${match}">${match}</a>`;
        } else {
          return `<a href="http://${match}" target="_blank">${match}</a>`;
        }
      });

      if (replacedText !== text) {
        console.log('找到并替换了链接:', text);
        let span = document.createElement('span');
        span.innerHTML = replacedText;
        parent.replaceChild(span, node);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      Array.from(node.childNodes).forEach(processNode);
    }
  }

  processNode(document.body);

  console.log(`处理完成,共检查了 ${nodeCount} 个节点,处理了 ${processedCount} 个链接`);
}

console.log('content.js 已加载');
makeLinksClickable();
console.log('makeLinksClickable 函数已调用');