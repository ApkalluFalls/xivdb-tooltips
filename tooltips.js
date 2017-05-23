/* This is a modified version of https://github.com/xivdb/tooltips which has
 * fewer features but no longer has jQuery as a dependency.
 * 
 * This is also style-free, meaning you'll need to grab the styling yourself
 * from https://github.com/xivdb/tooltips/tree/master/scss.
 * 
 * A codepen demo with CSS is available at: https://codepen.io/inb4/pen/oWJQpW
 * and the repo is at https://github.com/ApkalluFalls/xivdb-tooltips.
 */
(function() {
  const elems = Array.from(document.querySelectorAll('[data-id][data-type]'));
  let request = {};
  let response = {};
  
  const bound_handleMouseMove = handleMouseMove.bind(this);
  const bound_handleMouseOut = handleMouseOut.bind(this);
  const bound_handleMouseOver = handleMouseOver.bind(this);
  
  elems.forEach(elem => {
    const data = elem.dataset;
    
    if (validType(data.type)) {
      if (!request["list[" + data.type + "]"])
        request["list[" + data.type + "]"] = [];

      if (request["list[" + data.type + "]"].indexOf(data.id) === -1)
        request["list[" + data.type + "]"].push(data.id);

      elem.addEventListener('mouseout', bound_handleMouseOut);
      elem.addEventListener('mouseover', bound_handleMouseOver);
    }
  })
  
  const keys = Object.keys(request);
  
  if (!keys.length)
    return;
  
  keys.forEach(r => request[r] = request[r].join(","));
  
  const query = Object.keys(request).map(
    k => k + '=' + encodeURIComponent(request[k])
  ).join('&');
  
  fetch('https://secure.xivdb.com/tooltip?' + query, {
    method: 'GET',
    mode: 'cors'
  })
    .then(data => data.json())
    .then(data => response = data)
    .catch(e => console.error(e))
  
  function createTooltip(e, data) {
    const elem = document.createElement('figure');
    
    elem.id = "tooltip";
    elem.innerHTML = data;
    
    elem.style.left = e.clientX + "px";
    elem.style.top = e.clientY + "px";
    
    document.body.appendChild(elem);
    document.body.addEventListener('mousemove', bound_handleMouseMove);
  }
  
  function destroyTooltip() {
    const elem = document.getElementById('tooltip');
    
    if (!elem)
      return;
    
    document.body.removeEventListener('mousemove', bound_handleMouseMove);
    elem.parentElement.removeChild(elem);
  }
  
  function handleMouseMove(e) {
    const elem = document.getElementById('tooltip');
    
    elem.style.left = e.clientX + "px";
    elem.style.top = e.clientY + "px";
  }
  
  function handleMouseOut(e) {
    destroyTooltip();
  }
  
  function handleMouseOver(e) {
    const id = e.target.dataset.id;
    const type = e.target.dataset.type;
    
    const match = response[type].filter(t => t.data.id === id);
    
    if (!match.length)
      return console.warn(id + " not found in response's " + type + " object.", response[type]);
    
    createTooltip(e, match[0].html);
  }
  
  function validType(type) {
    switch (type) {
      case "achievement":
      case "action":
      case "emote":
      case "enemy":
      case "fate":
      case "gathering":
      case "instance":
      case "item":
      case "leve":
      case "npc":
      case "minion":
      case "mount":
      case "placename":
      case "quest":
      case "recipe":
      case "shop":
      case "status":
      case "title":
      case "weather":
        return true;
      default:
        return false;
    }
  }
})();