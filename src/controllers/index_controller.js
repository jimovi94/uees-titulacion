export default class extends Controller {
  connect() {
    contentful_api.getEntries({
      content_type: 'proyecto'
    }).then(function (entries) {
      $("#index-proyectos").html("");
      entries.items.forEach(function (entry) {
        $("#index-proyectos").append(` 
        <div class="item">
          <a href="./proyecto/${entry.fields.slug}">
          <p>${entry.fields.nombreDelPv}</p>
          </a>
        </div>`);
      });
    }).catch(err => {
      //console.log(err)
    });
  }
}