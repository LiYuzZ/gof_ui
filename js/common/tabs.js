!$(function(){
  $(document).on('click','.accordions_title',function(){
    $(this).toggleClass('on')
    $(this).next('.accordions_content').slideToggle()
    $(this).children('i').css({
      transform:$(this).is('.on')?'rotate(90deg)':'rotate(0)'
    })
  })
  $(document).on('click','.tab_default .tab_bar span,.tab_left .tab_bar span',function(){
    var tab_index = $(this).index()
    $(this).addClass('on').siblings().removeClass('on')
    $(this).parent('.tab_bar').next('.tab_content').children('.tab_content_item').eq(tab_index).show().siblings().hide()
  })
})