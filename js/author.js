//绑定修改密码成功后function
var empty_password = function (n, _this, data) {
    n.error || _this.parents('form').find("input:password").val("")
}

//社交帐号解绑
_win.bd.on("click", '.oauth-untying', function (e) {
    if (confirm("确认要解除帐号绑定吗？") == true) {
        _this = $(this),
            data = {
                'action': 'user_oauth_untying',
                'user_id': _this.attr('user-id'),
                'type': _this.attr('untying-type'),
            };
        return zib_ajax(_this, data), !1;
    }
}) //支付订单AJAX翻页
_win.bd.on("click", '.order-ajax-next', function (e) {
    /*  AJAX获取包装函数   (必须)
        _this 传入点击按钮的自己   需要有href，下一页的链接(必须)
        con ：需要插入的父元素选择器   (必须)
        jcon ：获取内容的父元素选择器   (必须)
        item ：获取的列表选择器   (必须)
        loader ：加载动画的内容 （非必须，有默认值）
        pag ：获取的分页内容选择器 （必须）
        // 如果需要将下一页链接从新插入到新的按钮，则填写下面2个
        next ：获取分页内容中的下一页 选择器
        trigger ：将获取的下一页链接从新插入到的新的 按钮中-的class值
        replace ：替换列表内容而不是追加
        nomore ：全部加载完成之后的文案
        data : 需要传入的数据，默认为空白
    */
    r = '';
    _this = $(this);
    con = '.order-ajaxpager';
    jcon = '.order-ajaxpager';
    item = '.order-ajax-item';
    loader = '<div class="zib-widget pay-box"> <p class="placeholder t1"></p> <h4 class="item-excerpt placeholder k1"></h4><i class="placeholder s1"></i><i class="placeholder s1 ml10"></i></div>';
    pag = '.order-ajax-pag';
    next = '.order-ajax-next';
    trigger = '';
    replace = '';
    nomore = '';
    return post_ajax(_this, con, jcon, item, loader, pag, next, trigger, replace, nomore), !1;
})