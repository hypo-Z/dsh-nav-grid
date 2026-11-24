// dsh-nav-grid：纯客户端 CSS 补丁，把左侧栏导航列表改成两列网格。
//
// 必须以 __ModuleLoader__ 的插件形态加载：宿主把 dsh.client 的 bundle 当 ES module
// import 进来，期望它注册一个带 apply 的插件。裸 IIFE 会导致
// "entry did not activate / import failed" 并阻塞启动。
//
// 注意：侧栏按钮外层还包了一层 Tooltip，所以行样式不能用 `>` 直接子选择器。
window.__ModuleLoader__.load({
  id: 'dsh-nav-grid',
  factory: () => {
    const module = { exports: {} }
    const exports = module.exports
    const ID = 'dsh-nav-grid-style'

    const CSS = `
html:not(:has([data-sidebar-collapsed="true"])) [class*="panelList"]{
  display:grid !important;
  grid-template-columns:1fr 1fr !important;
  justify-content:stretch !important;
  align-items:stretch !important;
  gap:6px 6px !important;
  width:100% !important;
  box-sizing:border-box !important;
  margin-bottom:8px !important;
}
html:not(:has([data-sidebar-collapsed="true"])) [class*="panelList"] > *{
  min-width:0 !important;
  max-width:100% !important;
}
html:not(:has([data-sidebar-collapsed="true"])) [class*="panelList"] [class*="moreAnchor"]{
  grid-column:1 / -1 !important;
  width:100% !important;
}
html:not(:has([data-sidebar-collapsed="true"])) [class*="panelList"] [class*="panelRow"]{
  width:100% !important;
  max-width:100% !important;
  box-sizing:border-box !important;
  min-height:36px !important;
  padding:6px 9px !important;
  flex-direction:row !important;
  justify-content:flex-start !important;
  align-items:center !important;
  gap:6px !important;
  border-radius:8px !important;
}
html:not(:has([data-sidebar-collapsed="true"])) [class*="panelList"] [class*="panelRow"] [class*="panelGlyph"]{
  margin:0;
  flex:none;
  font-size:15px !important;
}
html:not(:has([data-sidebar-collapsed="true"])) [class*="panelList"] [class*="panelRow"] [class*="panelTitle"]{
  max-width:none !important;
  font-size:11.5px !important;
  line-height:1.2;
  text-align:left;
  white-space:nowrap !important;
  overflow:visible !important;
  text-overflow:clip !important;
}
`

    function apply() {
      if (typeof document === 'undefined') return
      if (document.getElementById(ID)) return
      const style = document.createElement('style')
      style.id = ID
      style.textContent = CSS
      ;(document.head || document.documentElement || document.body).appendChild(style)
    }

    exports.inject = []
    exports.apply = apply
    return module.exports
  },
})
