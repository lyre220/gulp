var gulp = require('gulp'),
    concat = require('gulp-concat'),//- 多个文件合并为一个；
    minifyCss = require('gulp-minify-css'),//- 压缩CSS为一行；
    jshint = require('gulp-jshint'),
   // uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),//- 对文件名加MD5后缀
    revCollector = require('gulp-rev-collector'),//- 路径替换
    clean = require('gulp-clean');//- 清空文件夹，避免资源冗余

// 文件路径
var app = {
    srcPath: './src', //源代码路径
    prdPath: './dist' //生产环境路径
};

//清空文件夹，避免资源冗余css
gulp.task('cleancss',function(){
    return gulp.src('css',{read:false}).pipe(clean());
});

//清空文件夹，避免资源冗余js
gulp.task('cleanjs',function(){
    return gulp.src('js',{read:false}).pipe(clean());
});

gulp.task('css', ['cleancss'], function() {//- 创建一个名为 concat 的 task
    gulp.src([app.srcPath + '/assets/css/*/*.css',app.srcPath + '/assets/css/*/*/*.css']) //- 需要处理的css文件，放到一个字符串数组里
    //.pipe(concat('wrap.min.css')) //- 合并后的文件名
        .pipe(minifyCss())//- 压缩处理成一行
        .pipe(rev())//- 文件名加MD5后缀
        .pipe(gulp.dest( app.prdPath +'/assets/css'))//- 输出文件本地
        .pipe(rev.manifest())//- 生成一个rev-manifest.json
        .pipe(gulp.dest(app.prdPath +'/rev/css'));//- 将 rev-manifest.json 保存到 rev 目录内
});

gulp.task('js', ['cleanjs'], function() {//- 创建一个名为 concat 的 task
    gulp.src([app.srcPath +'/assets/js/*/*.js',app.srcPath +'/assets/js/*/*/*.js',app.srcPath +'/assets/js/*/*/*/*.js'])                 //- 需要处理的js文件，放到一个字符串数组里
    //.pipe(concat('wrap.min.js')) //- 合并后的文件名
        .pipe(jshint())//- 压缩处理成一行
       // .pipe(uglify())
        .pipe(rev())///- 文件名加MD5后缀
        .pipe(gulp.dest( app.prdPath +'/assets/js'))//- 输出文件本地
        .pipe(rev.manifest())//- 生成一个rev-manifest.json
        .pipe(gulp.dest(app.prdPath+'/rev/js'));//- 将 rev-manifest.json 保存到 rev 目录内
});
gulp.task('rev', function() {
    return gulp.src([ app.prdPath+'/rev/**/*.json', app.srcPath+'/pages/*/*.html', app.srcPath+'/pages/*/*/*.html'])//- 读取 rev-manifest.json 文件以及需要进行css名替换的文件。通过hash来精确定位到html模板中需要更改的部分，然后将修改成功的文件生成到指定目录
        .pipe(revCollector({
            replaceReved: true
        }))//- 执行文件内css名的替换
        .pipe(gulp.dest(app.prdPath +'/pages'));//- 替换后的文件输出的目录
});


gulp.task('i18n',function() {//- 创建一个名为 concat 的 task
    gulp.src([app.srcPath +'/i18n/*/*.json'])                
   .pipe(gulp.dest( app.prdPath +'/i18n'));
});

/*
gulp.task('watch', function() {
    console.log('开始监听文件的变动');
    gulp.watch(app.srcPath + '/assets/css/!*!/!*.css', ['css','rev']);
    gulp.watch(app.srcPath +'/assets/js/!*!/!*.js', ['js','rev']);
});
*/

gulp.task('default', ['css','js','rev','i18n']);