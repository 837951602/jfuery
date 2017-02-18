var fso  = new ActiveXObject ("Scripting.FileSystemObject");
var base = fso.OpenTextFile  ("base.txt", 1);
var code = fso.OpenTextFile  ("code.txt", 1);
var out  = fso.CreateTextFile("jfuery.js");
out.Write ('[');
out.Write (base.readLine());
var db   = code.readAll();
//WScript.Echo (db);
function w(v) {
  out.Write ([
    '[[]]()',  '()[[]]',  '()()',    '([])',
    '(![])',   '(+[])',   '([[]])',  '(!![])',
    '()([])',  '([![]])', '([+[]])', '([]+[])',
    '(+!![])', '[![]]()', '[+[]]()', '()[+[]]'
  ][v&15]);
}
for (var i=0; i<db.length; i++) {
  if (i%500 == 0) {
    if (i) out.Write ('()');
    out.Write ('+[][[]]');
  }
  var s = db.charCodeAt(i);
  if (s<256) {
    w (s >> 4);
    w (s);
  } else {
    out.Write ('()[![]]');
    w (s >> 12);
    w (s >> 8);
    w (s >> 4);
    w (s);
  }
}
out.Write ('()][[]]()[!![]]()');
base.Close();
code.Close();
out.Close();
