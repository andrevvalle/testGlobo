this["Feed"] = this["Feed"] || {};
this["Feed"]["templates"] = this["Feed"]["templates"] || {};

this["Feed"]["templates"]["postfeed"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (author, avatar, imagepost, text, time, videopost) {
var jade_indent = [];
buf.push("\n<div class=\"post-container\">\n  <div class=\"post-avatar\"><img" + (jade.attr("src", "" + (avatar) + "", true, false)) + "/></div>\n  <div class=\"post-content\">\n    <div class=\"post-content--author\"><span>" + (null == (jade_interp = author) ? "" : jade_interp) + "</span></div>\n    <div class=\"post-content--time\">\n      <time>" + (null == (jade_interp = time) ? "" : jade_interp) + "</time>\n    </div>");
if ( videopost)
{
buf.push("\n    <div class=\"post-content--body body_before\">\n      <p>" + (null == (jade_interp = text) ? "" : jade_interp) + "</p>\n      <div class=\"body-media-container\">\n        <figure class=\"figure-wrapper playVideo\"><img" + (jade.attr("src", "" + (videopost.url) + "", true, false)) + "/></figure>\n      </div>\n    </div>");
}
else if ( imagepost)
{
buf.push("\n    <div class=\"post-content--body body_before\">\n      <p>" + (null == (jade_interp = text) ? "" : jade_interp) + "</p>\n      <div class=\"body-media-container\">\n        <figure class=\"figure-wrapper\"><img" + (jade.attr("src", "" + (imagepost.url) + "", true, false)) + "/></figure>\n      </div>\n    </div>");
}
else
{
buf.push("\n    <div class=\"post-content--body\">\n      <p>" + (null == (jade_interp = text) ? "" : jade_interp) + "</p>\n    </div>");
}
buf.push("\n  </div>\n</div>");}.call(this,"author" in locals_for_with?locals_for_with.author:typeof author!=="undefined"?author:undefined,"avatar" in locals_for_with?locals_for_with.avatar:typeof avatar!=="undefined"?avatar:undefined,"imagepost" in locals_for_with?locals_for_with.imagepost:typeof imagepost!=="undefined"?imagepost:undefined,"text" in locals_for_with?locals_for_with.text:typeof text!=="undefined"?text:undefined,"time" in locals_for_with?locals_for_with.time:typeof time!=="undefined"?time:undefined,"videopost" in locals_for_with?locals_for_with.videopost:typeof videopost!=="undefined"?videopost:undefined));;return buf.join("");
};