// app.js
import { renderSkeleton, renderNav, renderFetchedEvent, loadTabFunctionality} from './render.js';
import { jsonData } from './data.js';

document.getElementById('app').innerHTML = renderSkeleton();
document.getElementById('bodyheader').innerHTML = renderNav();
document.getElementById('main').innerHTML = renderFetchedEvent(jsonData[0]);

loadTabFunctionality();
