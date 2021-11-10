export default class extends Controller {
  connect() {
    //Get URL
    let urlParams = String(window.location.href);
    let proj_slug = urlParams.split("/")[4].split('?')[0];
    proj_slug = proj_slug.split('?')[0];

    contentful_api.getEntries({
      content_type: 'proyecto',
      select: 'fields',
      'fields.slug': proj_slug.replace("#", ""),
    }).then(function (entries) {

      $("#banner-cont").html(`
      <div class="text-cont">
      <div class="columns">
        <div class="column-sm">
          <img src="/img/${entries.items[0].fields.ods}.png" alt="${entries.items[0].fields.ods}">
        </div>
        <div class="column-lg">
          <div class="cent">
            <h2>${entries.items[0].fields.nombreDelPv}</h2>
            <h3>${entries.items[0].fields.facultad}</h3>
          </div>
        </div>
      </div>
    </div>
      `);

      $("#desc-cont").html(`
      <div class="columns">
        <div class="column">
          <div class="cent">
            <div class="title-cont">
              <h3>Actividades realizadas:</h3>
            </div>
            <div class="text-cont">
              <p>${replaceAll(entries.items[0].fields.actividadesRealizadas, "\n", "<br>")}</p>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="resources-cont">
            <div class="title-icon">
              <img src="/img/recursos.svg" alt="Resultados">
              <h3>Recursos</h3>
            </div>
            <div class="columns">
              <div class="column">
                <h4>Número de <br> Docentes</h4>
                <img class="persona" src="/img/persona-02.svg" alt="Persona">
                <p>${entries.items[0].fields.numeroDeDocentes} Docentes</p>
              </div>
              <div class="column">
                <h4>Presupuesto <br> Asignado</h4>
                <img class="dinero" src="/img/dinero-02-03.svg" alt="Presupuesto">
                <p>$${entries.items[0].fields.presupuestoAsignado}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      `);


      $("#results-cont").html(`
      <h3>RESULTADOS OBTENIDOS</h3>
      <h4>${entries.items[0].fields.resultadosObtenidos}</h4>
      `);

      const date1 = new Date(new Date(entries.items[0].fields.fechaDeInicio).getFullYear(), new Date(entries.items[0].fields.fechaDeInicio).getMonth(), new Date(entries.items[0].fields.fechaDeInicio).getDay());
      const date2 = new Date(new Date(entries.items[0].fields.fechaFin).getFullYear(), new Date(entries.items[0].fields.fechaFin).getMonth(), new Date(entries.items[0].fields.fechaFin).getDay());
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      $("#range-calendar").rangeCalendar({
        lang: "es",
        theme: "default-theme",
        themeContext: this,
        startDate: date1,
        endDate: date2,
        startRangeWidth: diffDays,
        minRangeWidth: 1,
        maxRangeWidth: 365,
        weekends: true,
        autoHideMonths: false,
        visible: true,
        trigger: null,
        changeRangeCallback: function (el, cont, dateProp) {
          return false;
        }
      });

      $("#time-stats").html(`
      <div class="column">
        <h4>Inicio</h4>
        <p class="number">${moment(date1).format('DD')}</p>
        <p class="date">${moment(date1).format('MMM')} ${date1.getFullYear().toString().substr(-2)}</p>
      </div>
      <div class="column">
        <h4>Final</h4>
        <p class="number">${moment(date2).format('DD')}</p>
        <p class="date">${moment(date2).format('MMM')} ${date2.getFullYear().toString().substr(-2)}</p>
      </div>
      <div class="column">
        <h4>Duración</h4>
        <p class="number">${diffDays}</p>
        <p class="date">DIAS</p>
      </div>
      `);


    }).catch(err => {
      window.location.replace("/");
    });

    function replaceAll(string, search, replace) {
      return string.split(search).join(replace);
    }
  }
}