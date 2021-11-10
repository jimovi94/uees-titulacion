export default class extends Controller {
  connect() {
    contentful_api.getEntries({
      content_type: 'proyecto'
    }).then(function (entries) {
      $("#index-proyectos").html("");
      entries.items.forEach(function (entry) {
        $("#index-proyectos").append(`
        <div class="column">
        <a href="./proyecto/${entry.fields.slug}">
          <div class="item">
              <h3>${entry.fields.nombreDelPv}</h3>
              <p>${entry.fields.facultad}</p>
          </div>
          </a>
        </div>
        `);
      });
    }).catch(err => {
      //console.log(err)
    });
  }
}