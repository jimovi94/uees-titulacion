************* Axios *************
import axios from 'axios';

************* Handlebars *************
import Handlebars from "handlebars";

************* Handlebars *************
import compiledTemplate from "./views/components/test.hbs";
console.log(compiledTemplate());

************* Locomotive *************
import LocomotiveScroll from 'locomotive-scroll';
@import"../../node_modules/locomotive-scroll/dist/locomotive-scroll.min.css";

document.addEventListener("turbo:load", function () {
 //Locomotive Scroll
  let scroll;

  function smooth(container) {
    scroll = new LocomotiveScroll({
      el: container.querySelector('[data-scroll-container]'),
      smooth: true,
      lerp: 0.06,
      smartphone: {
        smooth: true
      },
      tablet: {
        smooth: true
      }
    });
  }
  smooth(document);
  //Scroll on desktop
  if (scroll.options.isMobile || scroll.options.isTablet) {
    document.body.classList.add("touch");
  }
  const resizeObserver = new ResizeObserver(entries => {
    if (entries[0].contentRect.height > 0) {
      scroll.update();
    }
  });
  resizeObserver.observe(document.body);
});
