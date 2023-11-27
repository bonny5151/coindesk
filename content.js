
links=[]
links2=[]
rssfeed="" 
function handle(r) { 
  rssfeed = this.responseXML
  links = Array.from(rssfeed.querySelectorAll("item")).map(i=>i.textContent.match(/coindesk.com(\/[^?&]+).*Daniel Kuhn/)).filter(i=>i).map(i=>i[1])
  delfromrss()
} 

function fetchxml(url, handler) {

  var req = new XMLHttpRequest();
  req.addEventListener("load", handler);
  req.open("GET", url)
  req.send();
}
fetchxml( "./arc/outboundfeeds/rss/", handle);
function handle2(r) {
var parser = new DOMParser();
var html = this.responseText
console.log(html.length)
if(html) {

  var doc = parser.parseFromString(html,"text/html")
  links2=Array.from(doc.querySelectorAll("h6 a.card-title")).map(i=>i.href)
console.log(links2)
 }

}
fetchxml("./author/daniel-kuhn/", handle2)



function delfromrss()
{
 var links3 = links2.map(i=>i.substr(46))
 links.concat(links2).concat(links3).forEach(i=>{ 
 var a1 = Array.from(document.querySelectorAll("a[href*='" +i+"']"));
 
 if(a1.length) { console.log("found"); a1.forEach(i1=>i1.parentElement.parentElement.remove()) }
  })

}


del()

setTimeout(del, 500)
setTimeout(del,1000)
setTimeout(del,1500)
setTimeout(del,2000)
setInterval( del, 2000)

//var xpathq = '//div[contains(@class,"articlestyles") or contains(@class,"opinionstyles")][.//*[text()[contains(.,"Daniel Kuhn")]]]'

function del() {
delfromrss()
delvideo()
delarticle()

}


function xp2(xp) {return document.evaluate(
    xp, document, null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );  }



function delarticle() {
  var xpathq = '//*[text()[contains(.,"Daniel Kuhn")]]/ancestor::div[contains(@class,"StaticCardWrapper") or contains(@class,"opinionstyle") or contains(@class,"articlestyle")][1]'

  var xresult = xp2(xpathq)
  var url = []
  for(var i = 0; i < xresult.snapshotLength; i++) { 

    var aa = xresult.snapshotItem(i); 
  
    var a1 = aa.querySelector("a:not([href^='/author'])")
    if(a1) { url.push( a1.getAttribute("href") ); }
    aa.remove();

  }
  for(var i =0; i < url.length; i++) { 
    var a1 = document.querySelector("div.live-wire a[href='" + url[i] + "']");
    if (a1) { a1.parentElement.parentElement.parentElement.remove()}
   }

}

function delvideo() {
var images = document.querySelectorAll("div.jwplayer");

  for (var i = 0, l = images.length; i < l; i++) {
  	    try { images[i].remove(); } catch (e) {}
  }
}

