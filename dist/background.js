chrome.action.onClicked.addListener((tab) => {
  console.log('插件图标被点击');
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  }, () => {
    console.log('content.js 已注入到页面');
    if (chrome.runtime.lastError) {
      console.error('注入脚本时发生错误:', chrome.runtime.lastError);
    }
  });
});