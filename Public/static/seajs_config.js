seajs.config({
    // 别名配置
    base:"/Public/static/",
    alias: {
        //'seajs-text': 'lib/seajs-text/dist/seajs-text',
        //'seajs-style': 'lib/seajs-style/dist/seajs-style',
        //'seajs-debug': 'lib/seajs-debug/dist/seajs-debug',
        //'seajs-combo': 'lib/seajs-combo/dist/seajs-combo',

        'template': 'lib/artTemplate/dist/template-native',
        'tmpl': 'lib/artTemplate/dist/template',
        'jquery': 'lib/jquery/dist/jquery',
        'jquery_mousewheel': 'lib/jquery-mousewheel/jquery.mousewheel.min',
        //'SuperSlide': 'lib/SuperSlide/jquery.SuperSlide',
        //'lazyload': 'lib/jquery_lazyload/jquery.lazyload',


        'finger': 'lib/AlloyFinger/alloy_finger',
        'transform': 'lib/AlloyFinger/asset/transform',
        'to': 'lib/AlloyFinger/asset/to',
        //components
        'cookie': 'components/jquery.cookie',
        'layer-css': 'lib/layer/src/skin/default/layer.css',
        'layer': 'lib/layer/src/layer.js',
        'laydate': 'components/laydate/laydate.dev',
        'laypage': 'components/laypage/laypage',
        'tab': 'components/tab',
        'common': 'components/common',
        'echarts': 'components/echarts/echarts.min',
        'walden': 'components/echarts/walden',
        //批阅
        'logic': 'review/js/logic',
        'imgzoom': 'components/imgzoom/imgzoom',
        //批阅
        'analy': 'analy/js/analy',

        // 数据模拟
        'mock':'lib/mockjs/dist/mock-min',
        'mockdata':'mockdata',
        'mockdata-analy':'mockdata-analy'
    },
    map: [
        [ /^(.*\.(?:css|js|tpl))(.*)$/i, '$1?'+"t-20170224" ]
    ],
    preload: ['jquery','common','mockdata-analy'],
    debug: true,
    charset: 'utf-8'
});