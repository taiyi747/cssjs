/**
 * 图片上传封装插件
 */

var ToB64 = function (e, n) { //图片转Base64
        if ("undefined" == typeof FileReader) return notyf("当前浏览器不支持图片上传，请更换浏览器", "danger");
        var r = new FileReader();
        r.readAsDataURL(e[0]), r.onload = function (e) {
            n && n(e.target.result);
        };
    },
    jqXhr = function (fun) { //绑定上传进度
        jqXhr.onprogress = fun;
        //使用闭包实现监听绑
        return function () {
            //通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
            var xhr = $.ajaxSettings.xhr();
            //判断监听函数是否为函数
            if (typeof jqXhr.onprogress !== 'function')
                return xhr;
            //如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
            if (jqXhr.onprogress && xhr.upload) {
                xhr.upload.onprogress = jqXhr.onprogress;
            }
            return xhr;
        }
    };

//选择图片并预览
_win.bd.on("change", '[zibupload="image_upload"]', function (e) {
    _this = $(this),
        form = _this.parents('form'),
        in_b = _this.siblings('.but');
        _text = in_b.html(),
r = this.files || e.dataTransfer.files,
        max = Number(_win.up_max_size) || 2,
        pre = _this.attr('data-preview') || '.preview';
    if (-1 == r[0].type.indexOf("image")) return void notyf("选择的文件不是图像文件！", "danger");
    if (max && (r[0].size > max * 1024000)) return void notyf("所选图片大小不能超过" + max + "M，请重新选择", "danger");
    in_b.html('<i class="loading mr6"></i>请稍候')
    ToB64(r, function (e) {
        form.find(pre).html('<img class="fit-cover" src="' + e + '">');
        in_b.html(_text);
    });
});

var miniupload_ing = false;
//上传图片函数
_win.bd.on("click", '[zibupload="submit"]', function (e) {
    if (miniupload_ing) {
        return notyf('正在处理中，请勿重复提交', 'warning', '2000');
    }
    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;

    _this = $(this), form = _this.parents('form'),
        _text = _this.html(),
        formData = new FormData(),
        in_up = form.find('[zibupload="image_upload"]'),
        in_b = in_up.siblings('.but');
    //循环插入文件
    in_up.each(function () {
        tag = $(this).attr('data-tag') || 'file';
        fileObject = this.files[0];
        if (fileObject) {
            formData.append(tag, fileObject);
        }
    });
    //循环插入_POST内容
    form.find('input').each(function () {
        n = $(this).attr('name'), v = $(this).val();
        if (n) {
            formData.append(n, v);
        }
    });

    notyf('正在处理请稍等...', "load", "", "miniupload_ajax");
    _this.attr('disabled', true).html('<i class="loading mr3"></i>上传中<count class="px12 ml3"></count>'), in_up.attr('disabled', true), in_b.attr('disabled', true);
    miniupload_ing = true;
    $.ajax({
        url: _win.ajax_url,
        type: 'POST',
        data: formData,
        // 告诉jQuery不要去处理发送的数据
        processData: false,
        cache: false,
        // 告诉jQuery不要去设置Content-Type请求头
        contentType: false,
        dataType: 'json',
        error: function (n) {
            notyf("操作失败 "+n.status+' '+n.statusText+'，请刷新页面后重试', 'danger', '', 'wp_ajax')
        },
        xhr: jqXhr(function (e) {
            var percent = Math.round(e.loaded / e.total * 100);
            _this.find('count').html(percent + '%');
            (percent >=100) && _this.html('<i class="loading mr6"></i>处理中');
            form.find('.progress').css('opacity', 1).find('.progress-bar').css('width', percent + '%');
        }),
        success: function (n) {
            form.find('.progress').css('opacity', 0).find('.progress-bar').css('width','0');
            ys = (n.ys ? n.ys : (n.error ? 'danger' : ""));
            notyf(n.msg || '操作成功', ys, '', 'miniupload_ajax');
            return _this.attr('disabled', false).html(_text),in_b.attr('disabled', false), in_up.attr('disabled', false).val(''),miniupload_ing = !1,
            fun = _this.attr('zibupload-success'),
            (fun&&n.img_url )&&(eval(fun + "(n,_this,form)"), (typeof fun == 'function' && fun(n, _this, form))),!1; //执行额外函数
        }
    });
})