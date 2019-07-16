function datasetTabNav() {
  // Enable dataset tab controls. See also: https://getbootstrap.com/docs/3.3/javascript/#tabspopulatePeoplePage
  // And: http://stackoverflow.com/questions/12131273/twitter-bootstrap-tabs-url-doesnt-change
  var tabs = ["people", "overview", "explore", "download", "external", "termsofuse", "detection-2018", "keypoints-2018", "stuff-2018",  "panoptic-2018", "detection-2017", "keypoints-2017", "stuff-2017", "detection-2016", "keypoints-2016", "detection-2015", "captions-2015", "format-data", "format-results", "guidelines", "upload", "detection-eval", "keypoints-eval", "stuff-eval", "panoptic-eval", "captions-eval", "detection-leaderboard", "keypoints-leaderboard", "stuff-leaderboard", "panoptic-leaderboard", "format-cite", "captions-leaderboard"];
  for( var i=0; i<tabs.length; i++ ) {
    $("#content").append('<div role="tabpanel" class="tab-pane fade" id="' + tabs[i] + '"></div>\n');
  }
  var loaded = {};
  $('.nav-tabs a').click(function (e) {
    if(this.hash) window.location.hash = this.hash;
    $('html,body').scrollTop(0);
  });
  $(window).bind( 'hashchange', function(e) {
    var hash = window.location.hash;
    var q=hash.replace('detections','detection').replace('challenge','');
    if(q!=hash) hash=window.location.hash=q;
    var q=hash.indexOf('?'); if(q!=-1) hash=hash.substring(0,q);
    if(!loaded[hash]) $(hash).load("dataset/"+hash.substring(1)+".htm");
    loaded[hash]=true; $('a[href="'+hash+'"]').tab('show');
    $('html,body').scrollTop(0);
  });
  if(!window.location.hash) window.location.hash = '#home';
  $(window).trigger('hashchange');
}

var cocoPeople = {
  'TsungYiLin': {'name': 'AKM Shahariar Azad Rabby', 'full': '', 'short': '', 'url':'https://shahariarrabby.github.io'},
  'GenevievePatterson': {'name': 'Sadeka Haque', 'full': '', 'short': '', 'url':'https://sadekahaque.github.io/'},
  'MatteoRonchi': {'name': 'Dr. Syed Akhter Hossain', 'full': 'Supervisor', 'short': '', 'url':'#'},
  'YinCui': {'name': 'Md. Sanzidul Islam', 'full': '', 'short': '', 'url':'#'},
  'MichaelMaire': {'name': 'Sheikh Abujar', 'full': '', 'short': '', 'url':'#'},
};

function populateHomePage() {
  for( var p in cocoPeople ) {
    $("#cocoPeople").append('<span class="fontBold">'+cocoPeople[p].name +
    '</span> '+cocoPeople[p].short+'<br/>');
  }
}


