// Global config
const color = "#202020";
const fav = "/fav.png";
const biz_full_name = "Vinculación con la Sociedad – UEES – Universidad Espíritu Santo";
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
  },
  {
    title: biz_full_name,
    color: color,
    fav: fav,
    desc: global_description,
    lang: lang,
    ogtype: ogtype,
    ogurl: ogurl,
    ogimage: ogimage,
    ogbiz: biz_full_name,
    template: `${dir_file}proyecto.hbs`,
    filename: 'proyecto.html'
  }
];

module.exports = {
  pages
};