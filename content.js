setInterval(()=> {
//var xpathq = '//div[contains(@class,"articlestyles") or contains(@class,"opinionstyles")][.//*[text()[contains(.,"Daniel Kuhn")]]]'
var xpathq = '//*[text()[contains(.,"Daniel Kuhn")]]/ancestor::div[contains(@class,"StaticCardWrapper") or contains(@class,"opinionstyle") or contains(@class,"articlestyle")][1]'

function xp2(xp) {return document.evaluate(
    xp, document, null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );  }

var xresult = xp2(xpathq)
for(var i = 0; i < xresult.snapshotLength; i++) { var aa = xresult.snapshotItem(i); aa.remove();}

var images = document.querySelectorAll("div.jwplayer");

  for (var i = 0, l = images.length; i < l; i++) {
  	    try { images[i].remove(); } catch (e) {}
  }
},1000)

