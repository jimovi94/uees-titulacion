// Global config
const color = "";
const fav = "";
const biz_full_name = "";
const global_description = "";
const lang = "es";
const ogtype = "website";
const ogurl = "";
const ogimage = "";
const dir_file = "./src/views/pages/";

let pages = [{
  title: biz_full_name,
  color: color,
  fav: fav,
  desc: global_description,
  lang: lang,
  ogtype: ogtype,
  ogurl: ogurl,
  ogimage: ogimage,
  ogbiz: biz_full_name,
  template: `${dir_file}index.hbs`,
  filename: 'index.html'
}];

module.exports = {
  pages
};