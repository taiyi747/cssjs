/**
 *评论js
 */
/**插入代码 */
function grin_code(e, o) {
	if (o = $("#grin_code").val(), o.length < 2) return void notyf("请输入代码", "warning");
	o = $(".code-text").text(o).html(), grin(o, "code"), popover_hide(".popover-focus");
}
//插入图片
function grin_image(i) {
	if (i = i || $("#grin_image").val(), i.length < 5) return void notyf("请输入正确的图片地址", "warning");
	_img = "[img=" + i + "]\n", grin(_img, "kb");
}
//上传图片
function comment_upload_img(n, _this, form) {
	grin_image(n.img_url);
	$('.modal').modal('hide')
}
//内容追加到编辑框
function grin(e, t) {
	var n = document.getElementById("comment");
	if (e = "code" == t ? '<pre><code class="gl">\n' + e + "\n</code></pre>" : "kb" == t ? e : "[g=" + e + "]",
		document.selection) n.focus(), sel = document.selection.createRange(), sel.text = e,
		n.focus();
	else if (n.selectionStart || "0" == n.selectionStart) {
		var o = n.selectionStart,
			s = n.selectionEnd,
			c = s;
		n.value = n.value.substring(0, o) + e + n.value.substring(s, n.value.length), c += e.length,
			n.focus(), n.selectionStart = c, n.selectionEnd = c;
	} else n.value += e, n.focus();
	popover_hide(".popover-focus");
}


$comments = $('#comments-title');
$cancel = $('#cancel-comment-reply-link');
$author = $('#comment-user-info');
$submit = $('#commentform #submit');
$cancel = $('#cancel-comment-reply-link');
$com_ajax_url = _win.uri + '/action/comment.php';
$com_list = $('#postcomments .commentlist');

//回复评论按钮
_win.bd.on('click', '.comment-reply-link', function () {
	_this = $(this), commentid = _this.attr("data-commentid");
	return addComment.moveForm("div-comment-" + commentid, commentid, "respond", _this.attr("data-postid")),
		scrollTo(_this, -100),
		!1;
});
//编辑按钮
_win.bd.on('click', '.comment-edit-link', function () {
	_this = $(this), commentid = _this.attr("data-commentid");
	return addComment.moveForm("div-comment-" + commentid, commentid, "respond", _this.attr("data-postid"), 1),
		scrollTo($("#div-comment-" + commentid), -100),
		!1;
});
//删除评论
_win.bd.on('click', '.comment-trash-link', function () {
	_this = $(this), commentid = _this.attr("data-commentid");
	return confirm("确认要删除此评论吗？") == 1 && (notyf("正在处理请稍等...", "load", "", "com_ajax"),
		_this.attr('disabled', true),
		c = "评论已经删除",
		$.ajax({
			type: "POST",
			url: $com_ajax_url,
			data: {
				action: 'trash_comment',
				comment_id: commentid,
			},
			dataType: "json",
			success: function (n) {
				// console.log(n);
				ys = (n.ys ? n.ys : (n.error ? 'danger' : ""));
				notyf(n.msg || c, ys, '', 'com_ajax');
				_this.attr('disabled', false);
				n.error || $('#comment-' + commentid).slideUp().delay(1000, function () {
					$(this).remove()
				});
			}
		})
	);
});

$a = ['aoman', 'baiyan', 'bishi', 'bizui', 'cahan', 'ciya', 'dabing', 'daku', 'deyi', 'doge', 'fadai', 'fanu', 'fendou', 'ganga', 'guzhang', 'haixiu', 'hanxiao', 'zuohengheng', 'zhuakuang', 'zhouma', 'zhemo', 'zhayanjian', 'zaijian', 'yun', 'youhengheng', 'yiwen', 'yinxian', 'xu', 'xieyanxiao', 'xiaoku', 'xiaojiujie', 'xia', 'wunai', 'wozuimei', 'weixiao', 'weiqu', 'tuosai', 'tu', 'touxiao', 'tiaopi', 'shui', 'se', 'saorao', 'qiudale', 'se', 'qinqin', 'qiaoda', 'piezui'];
$b = ['penxue', 'nanguo', 'liulei', 'liuhan', 'lenghan', 'leiben', 'kun', 'kuaikule', 'ku', 'koubi', 'kelian', 'keai', 'jingya', 'jingxi', 'jingkong', 'jie', 'huaixiao', 'haqian', 'aini', 'OK', 'qiang', 'quantou', 'shengli', 'woshou', 'gouyin', 'baoquan', 'aixin', 'bangbangtang', 'xiaoyanger', 'xigua', 'hexie', 'pijiu', 'lanqiu', 'juhua', 'hecai', 'haobang', 'caidao', 'baojin', 'chi', 'dan', 'kulou', 'shuai', 'shouqiang', 'yangtuo', 'youling'];

var _s1 = '',
	_s2 = '';
for ($i = 0; $i < $a.length; $i++) {
	_s1 += '<a class="smilie-a" href="javascript:grin(\'' + $a[$i] + '\')" ><img src="' + _win.uri + '/img/smilies/' + $a[$i] + '.gif" /></a>';
}
for ($i = 0; $i < $b.length; $i++) {
	_s2 += '<a class="smilie-a" href="javascript:grin(\'' + $b[$i] + '\')" ><img src="' + _win.uri + '/img/smilies/' + $b[$i] + '.gif" /></a>';
}
tab = '<div class="smilie-tab pull-right"><a href="#smilie-tab-1" class="but mr10" data-toggle="tab"><i class="fa fa-chevron-left" aria-hidden="true"></i></a><a class="but" href="#smilie-tab-2" data-toggle="tab"><i class="fa fa-chevron-right"></i></a></div>';
nr = '<div class="tab-content" style="min-height:328px"><div class="tab-pane fade in active" id="smilie-tab-1">' + _s1 + '</div><div class="tab-pane fade" id="smilie-tab-2">' + _s2 + '</div></div>';

$(".comt-smilie").popover({
	placement: 'auto top',
	html: true,
	content: nr + tab
});
c_i_u = _win.comment_upload_img ? ('<a ' + (_win.bd.hasClass("logged-in") ? 'data-toggle="modal" data-target="#modal_upload_img" class="but c-yellow mr10"' : 'class="but c-yellow mr10 signin-loader"') + '></i>上传图片</a>') : '';
c_i = '\
	<p>请填写图片地址：</p>\
				<div class="popover-comt-image" style="min-width:240px;">\
				<p><textarea rows="2" tabindex="1" id="grin_image" class="form-control input-textarea" placeholder="http://..."></textarea></p>\
					<div class="popover-button text-right">\
						' + c_i_u + '<a type="button" class="but c-blue" href="javascript:grin_image()"></i>确认</a>\
					</div>\
				</div>';
$(".comt-image").popover({
	placement: 'auto top',
	html: true,
	content: c_i
});

c_i = '\
				<p>请输入代码：</p>\
				<div style="min-width:240px;">\
				<p><textarea rows="6" tabindex="1" id="grin_code" class="form-control input-textarea" style="height:181px;" placeholder="在此处粘贴代码"></textarea></p>\
					<div class="code-text hide"></div>\
					<div class="popover-button text-right">\
						<a type="button" class="but c-blue" href="javascript:grin_code()"></i>确认</a>\
					</div>\
				</div>';

$(".comt-code").popover({
	placement: 'auto top',
	html: true,
	content: c_i
});

//弹出上传框隐藏popover
$(".modal:not(#modal-system-notice)").on("show.bs.modal", function () {
	popover_hide(".popover-focus");
});

//提交评论
$('#commentform').submit(function () {
	var inputs = $(this).serializeObject();
	popover_hide(".popover-focus");

	if ($author.length && $author.attr('require_name_email')) {
		if (inputs.author.length < 2 || inputs.email.length < 4) {
			return notyf('请输入昵称和邮箱', 'warning'),
			$author.addClass('show').find('[name="author"]').focus(),!1;
		}
		if (!is_mail(inputs.email)) {
			return notyf('邮箱格式错误', 'warning'),
			$author.addClass('show').find('[name="email"]').focus(),!1;
		}
	}

	if (inputs.comment.length < 6) {
		return notyf('评论内容过少', 'warning'),
		$('#comment').focus(),!1;
	}

	$.ajax({
		url: $com_ajax_url,
		data: $(this).serialize(),
		type: "POST",
		beforeSend: function () {
			notyf("正在处理请稍等...", "load", "", "comment_ajax");
			$submit.attr('disabled', true);
		},
		error: function (n) {
			notyf("操作失败 "+n.status+' '+n.statusText+'，请刷新页面后重试', 'danger', '', 'comment_ajax');
			$submit.attr('disabled', false);
		},
		success: function (data) {
			if (inputs.edit_comment_ID) {
				$('#div-comment-' + inputs.edit_comment_ID).find('.comment-content').html(data)
			} else {
				data = inputs.comment_parent != 0 ? '<ul class="children">' + data + '</ul>' : data;
				respond = $('#respond');
				is_comment_parent = respond.parent().parent('.comment');
				if (is_comment_parent.length) {
					is_comment_parent.after(data);
				} else {
					$com_list.length && $com_list.prepend(data);
					if (!$com_list.length) {
						respond.after('<div id="postcomments"><ol class="commentlist list-unstyled">' + data + '</ol></div>');
					}
				}
			}
			notyf('提交成功！', "", "", "comment_ajax");
			auto_fun();
			$cancel.click();
			countdown();
			$('#comment').val('');
		}
	});
	return false;
});


var addComment = {
	moveForm: function (commId, parentId, respondId, postId, num) {
		var t = this,
			div, comm = t.I(commId),
			respond = t.I(respondId),
			cancel = t.I('cancel-comment-reply-link'),
			parent = t.I('comment_parent'),
			post = t.I('comment_post_ID');
		$('.comment-content,.comt-meta').show();
		num && (
			t.I('comment').value = '',
			$('#comment_parent').attr('name', 'edit_comment_ID'),
			$submit.attr('disabled', true).html('<i class="loading mr6"></i><span>加载中</span>'),
			$('#comment').attr('disabled', true),
			$('#' + commId).find('.comment-content,.comt-meta').hide(),
			$.ajax({
				url: $com_ajax_url,
				data: {
					action: 'get_comment',
					comment_id: parentId,
				},
				dataType: "json",
				type: "POST",
				success: function (n) {
					ys = (n.ys ? n.ys : (n.error ? 'danger' : ""));
					n.msg && notyf(n.msg, ys);
					if (n.error) {
						$cancel.click();
					}
					$submit.html($submit_html).attr('disabled', false),
						$('#comment').attr('disabled', false).val(n.comment_content)
				}
			})
		);

		t.respondId = respondId;
		postId = postId || false;

		if (!t.I('wp-temp-form-div')) {
			div = document.createElement('div');
			div.id = 'wp-temp-form-div';
			div.style.display = 'none';
			respond.parentNode.insertBefore(div, respond)
		}!comm ? (temp = t.I('wp-temp-form-div'),

			t.I('comment_parent').value = '0',
			temp.parentNode.insertBefore(respond, temp),
			temp.parentNode.removeChild(temp)) : comm.parentNode.insertBefore(respond, comm.nextSibling);

		// pcsheight()
		if (post && postId) post.value = postId;
		parent.value = parentId;
		cancel.style.display = '';
		cancel.onclick = function () {
			var t = addComment,
				temp = t.I('wp-temp-form-div'),
				respond = t.I(t.respondId);
			$('#comment_parent').attr('name', 'comment_parent'),
				t.I('comment_parent').value = '0';
			$('.comment-content,.comt-meta').show()
			$('#comment').val('')
			if (temp && respond) {
				temp.parentNode.insertBefore(respond, temp);
				temp.parentNode.removeChild(temp)
			}
			this.style.display = 'none';
			this.onclick = null;
			return false
		};
		try {
			t.I('comment').focus()
		} catch (e) {}
		return false
	},
	I: function (e) {
		return document.getElementById(e)
	}
};

function exit_prev_edit() {
    $new_comm.show(), $new_sucs.show(), $("textarea").each(function() {
        this.value = "";
    }), edit = "";
}

var wait = 15,
	$submit_html = $submit.html();

function countdown() {
	if (wait > 0) {
		$submit.html('<div style="width:55px;"><i class="loading mr10"></i>' + wait + '</div>');
		wait--;
		setTimeout(countdown, 1000)
	} else {
		$submit.html($submit_html).attr('disabled', false);
		wait = 15
	}
}