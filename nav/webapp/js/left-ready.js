// console.log("tree.js --> OK");

$(function () {
    // 一级菜单
    var h3 = $(".tree-item-h3");
    var treeTwoBox = $(".tree-two-box");
    // 二级菜单
    var h4 = $(".tree-item-h4");
    var treeThreeBox = $(".tree-three-box");
    // 三级菜单
    var h5 = $(".tree-item-h5");
    var treeFourBox = $(".tree-Four-box");
    // 四级菜单
    var h6 = $(".tree-item-h6");
    var treeFiveBox = $(".tree-Five-box");

    // 修复阴影bug
    // $(".tree-last-box").addClass(".tree-last-box-2");

    // 控制二级菜单开合
    h3.each(function (i) {
        $(this).click(function () {

            // // 改变小图标方向
            // $(this).parent().siblings().find(".tree-item-h3").css("background-image", "url(./images/portal_icon_navigation_arrow_hover.png)");
            // if ($(this).css("background-image").indexOf("portal_icon_navigation_arrow_hover.png") != -1) {
            //     $(this).css("background-image", "url(./images/portal_icon_navigation_arrow_press.png)");
            // } else {
            //     h3.css("background-image", "url(./images/portal_icon_navigation_arrow_hover.png)");
            //     $(this).css("background-image", "url(./images/portal_icon_navigation_arrow_hover.png)");
            // }

            // 改变小图标方向  big-r 替换图标--> portal_icon_navigation_arrow_hover，big-l --> portal_icon_navigation_arrow_press
            $(this).parent().siblings().find(".tree-item-h3").css("background-image", "url(./images/portal_icon_navigation_arrow_hover.png)");
            if ($(this).css("background-image").indexOf("portal_icon_navigation_arrow_hover.png") != -1) {
                $(this).css("background-image", "url(./images/portal_icon_navigation_arrow_press.png)");
            } else {
                h3.css("background-image", "url(./images/portal_icon_navigation_arrow_hover.png)");
                $(this).css("background-image", "url(./images/portal_icon_navigation_arrow_hover.png)");
            }

            //nav_cus_tree 头部导航
            //h3 一级导航更改 改变颜色
            var navtree = $("#tree").hasClass("nav_cus_tree");
            if (navtree == true) {
                $(this).toggleClass("tree-cus-h3");
                //$(".nav_pos_iframe", window.parent.document).css("height","75px");
                $(this).parent().siblings().find(".tree-item-h3").removeClass("tree-cus-h3");
                $(this).next().css("cssText", "hieght:auto !important;");
            }

            /*if( navtree == true){
                $(this).click(function(){
                    $(this).toggleClass("tree-cus-h3");
                    debugger
                    $(".nav_pos_iframe", window.parent.document).css("height","75px");
                });
                $(".nav_pos_iframe", window.parent.document).css("height","75px");
                $(this).parent().siblings().find(".tree-item-h3").removeClass("tree-cus-h3");
            }*/


            // 开合转换
            $(this).parent().find(".tree-two-box").slideToggle();

            // bug-1
            // 削减.tree-three-box的高度
            $(".tree-two-box>li").each(function () {
                if ($(this).find(".tree-item-h4").length == 0) {
                    // console.log($(this));
                   // var liHei = $(this).height();
                    // $(this).height(liHei - 17);
                    // console.log($(this).height());
                    // console.log($(this).height()-16);
                }
            })

            // 去掉一级菜单的颜色
            $(".tree-item-h3").each(function () {
                if ($(this).parent().find(".tree-two-box").length == 0) {
                    $(this).removeClass("tree-three-active");
                    $(this).css("background-image", "none");
                }
            })


            // 如果只有一级菜单
            // if ($(this).parent().find(".tree-two-box").length == 0) {
            if ($(this).parent().find("ul").length == 0) {
                console.log("ahha");
                // console.log($(this).parent().find(".tree-three-box"));
                $(this).css("background-image", "none");

                // 字体变色
                $(this).parent().parent().find(".tree-item-h3").removeClass("tree-item-active");
                $(this).toggleClass("tree-item-active");

                // 去掉其他一级菜单的背景图
                $(".tree-item-h3").each(function () {
                    if ($(this).parent().find(".tree-two-box").length == 0) {
                        $(this).css("background-image", "none");
                    }
                })
            }

            // 关闭其他同级菜单
            $(this).parent().siblings().find(".tree-two-box").slideUp();

            //  h3选中效果
            if ($(".nav_cus_top").hasClass("nav_customized")) {
                $(this).toggleClass("tree-item-h3-active").parent().siblings().find(".tree-item-h3").removeClass("tree-item-h3-active");
            }

        })
    })

    // 如果没有二级菜单，设置三级菜单容器的margin-top
    $(".tree-item").each(function () {
        if ($(this).find(".tree-item-h4").length == 0) {
            // $(this).find(".tree-three-box").css("marginTop", 0);
            // $(this).find(".tree-item-h4").css("marginBottom", 0);
        }
    })

    // 控制三级菜单开合
    h4.each(function (i) {
        $(this).click(function () {
           // console.log($(this));

            // // 改变小图标方向
            // $(this).parent().siblings().find(".tree-item-h4").css("background-image", "url(./images/mid-r.png)");
            // if ($(this).css("background-image").indexOf("mid-r") != -1) {
            //     $(this).css("background-image", "url(./images/mid-l.png");
            // } else {
            //     h4.css("background-image", "url(./images/mid-r.png)");
            //     $(this).css("background-image", "url(./images/mid-r.png)");
            // }

            // 改变小图标方向
            $(this).parent().siblings().find(".tree-item-h4").css("background-image", "url(./images/portal_icon_navigation_arrow_hover.png)");
            if ($(this).css("background-image").indexOf("portal_icon_navigation_arrow_hover") != -1) {
                $(this).css("background-image", "url(./images/portal_icon_navigation_arrow_press.png");
            } else {
                h4.css("background-image", "url(./images/portal_icon_navigation_arrow_hover.png)");
                $(this).css("background-image", "url(./images/portal_icon_navigation_arrow_hover.png)");
            }

            // 开合转换
            $(this).parent().find(".tree-three-box").slideToggle();
            // 关闭其他同级菜单
            $(this).parent().siblings().find(".tree-three-box").slideUp();

        })

    })
    // 控制四级菜单开合
    h5.each(function (i) {
        $(this).click(function () {
            console.log($(this));

           /* // 改变小图标方向
            $(this).parent().siblings().find(".tree-item-h5").css("background-image", "url(./images/mid-r.png)");
            if ($(this).css("background-image").indexOf("mid-r") != -1) {
                $(this).css("background-image", "url(./images/mid-l.png");
            } else {
                h5.css("background-image", "url(./images/mid-r.png)");
                $(this).css("background-image", "url(./images/mid-r.png)");
            }*/

            $(this).parent().siblings().find(".tree-item-h5").css("background-image", "url(./images/portal_h4_tree.png)");
            if ($(this).css("background-image").indexOf("portal_h4_tree") != -1) {
              $(this).css("background-image", "url(./images/portal_h4_hover.png");
            } else {
              h5.css("background-image", "url(./images/portal_h4_tree.png)");
              $(this).css("background-image", "url(./images/portal_h4_tree.png)");
            }

            // 开合转换
            $(this).parent().find(".tree-four-box").slideToggle();
            // 关闭其他同级菜单
            $(this).parent().siblings().find(".tree-four-box").slideUp();

        })

    })

    // 控制五级菜单开合
    h6.each(function (i) {
        $(this).click(function () {
            console.log($(this));

            // 改变小图标方向
            $(this).parent().siblings().find(".tree-item-h6").css("background-image", "url(./images/mid-r.png)");
            if ($(this).css("background-image").indexOf("mid-r") != -1) {
                $(this).css("background-image", "url(./images/mid-l.png");
            } else {
                h6.css("background-image", "url(./images/mid-r.png)");
                $(this).css("background-image", "url(./images/mid-r.png)");
            }

            // 开合转换
            $(this).parent().find(".tree-five-box").slideToggle();
            // 关闭其他同级菜单
            $(this).parent().siblings().find(".tree-five-box").slideUp();

        })

    })

    // 点击改变三级菜单字体颜色
    $(".tree-item-last").each(function () {
        $(this).click(function () {
            $(".tree-item-last").removeClass("tree-item-active");
            $(this).toggleClass("tree-item-active");
            // window.location.href = $(this).data("url");
            // window.open($(this).data("url"), "_blank");

            // 我的-切换内容
            // 一个iframe操作另一个iframe
            $("#right", parent.document.body).attr("src", $(this).data("url"));

        });
    })
    $(".tree-single").each(function () {
        $(this).click(function () {
            $(".tree-single").removeClass("tree-item-active");
            $(this).toggleClass("tree-item-active");
            // 我的方法-切换内容
            // 一个iframe操作另一个iframe
            // $("#right", parent.document.body).attr("src", $(this).data("url"));

        });
    })

    // 如果只有二级菜单
    //console.log($(".tree-item-h4").next().eq(33));
    $(".tree-item-h4").each(function () {
        if ($(this).next().length == 0) {
            console.log("haha");
            // $(this).css("background-image", "none");
        }
    })
    // 如果只有一级菜单
    $(".tree-item-h3").each(function () {
        if ($(this).parent().find(".tree-two-box").length == 0) {
            $(this).css("background-image", "none");
        }
    })

    // 去掉二级菜单的背景图

    function delBg() {
        console.log("jinruhanshu");
        if ($(this).next().length == 0) {
            console.log($(this));
            $(this).css("background-image", "none");
        }
    }

    // bug-3
    $(".tree-three-box").each(function () {
        if ($(this).siblings().find(".tree-last-box").length == 0) {
            // $(this).css({"padding-top": 6, "padding-bottom": 6});
        } else if ($(this).parent().next().find(".tree-item-last").length != 0) {
            $(this).css({
                "padding-top": 6
            });
            var len = $(this).siblings().find(".tree-last-box").length;
            $(this).siblings().find(".tree-last-box").eq(len).css("padding-bottom", 6);
        }
    })

    // jump($(".tree-item-h3").eq(4).data("url"));

    //关闭所有打开的导航
    $("body").on("mouseout", ".nav_cus_tree .tree-item~ul", function () {
        $(".nav_cus_tree .tree-two-box").slideUp();
    });

    //移动端点击空白关闭菜单
    $(".close_model_left").on("touchstart", function () {
        //$(".left_model").contents().find("#tree").removeClass("nav_customized");
        $("#menu-model", window.parent.document).hide();
        return false;
    })

    //更改顶部下拉  不能滚动
/*     $(".tree-item .tree-item-h3").on("click", function () {
        if ($(".nav_cus_top").hasClass("nav_cus_tree")) {
            if($(".tree-item-h3").hasClass("tree-cus-h3")){
                $(".nav_pos_iframe,.left_web", window.parent.document).css({"height":"75px","background":"#ccc"});
                $(".left_body").css({"height":"75px"});
            }else{
                $(".nav_pos_iframe", window.parent.document).css({"height":"100%","background":"#fff"});
            }
        }
    })*/

})

// 切换函数 - 切换右侧内容

function jump(that, resourceId) {
    $("#right", parent.document.body).attr("src", "/jumpPage?id=" + resourceId);
    //如果手机端，走当前逻辑
    var uAgent = navigator.userAgent;
    var isAndroid = uAgent.indexOf("Android") > -1 || uAgent.indexOf("Adr") > -1;
    var isiOS = !! uAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isAndroid || isiOS) {
        parent.document.querySelector("#menu-model").style.display = "none";
    }
}

function jumpOpen(that, url) {
    windows.open(url);
}