/*
	Open Innovations Log
	Web usage monitoring with less privacy invasion
	Version: 2022-01-25
*/
(function(root){
	if(!root.OI) root.OI = {};
	var l = location;
	function ok(t){
		if(typeof t!=="object" || t.length <= 0) return true; // Allow
		for(i=0;i<t.length;i++){
			if(t[i]==l.host) return true; // Allow
		}
		return false; // Disallow
	}
	function rnd(v){ return Math.round(v/50)*50; }
	function Log(){
		var id,de,re,rg,sz,ua,tg;
		de = "https://open-innovations.org/log";
		re = document.referrer;
		rg = new RegExp(l.origin,"g");
		if(re.indexOf(l.origin)==0) re = re.replace(rg,"");
		sz = rnd(window.innerWidth)+'x'+rnd(window.innerHeight);
		this.setup = function(opt){
			if(!opt) opt = {};
			if(opt.dest) de = opt.dest;
			if(opt.id) id = opt.id;
			if(opt.target) tg = opt.target;
			tg = (typeof tg==="string" ? [tg]:tg);
			return this;
		}
		this.add = function(txt,cb){
			// Don't log local files
			if(l.protocol=='file:') return this;
			// If explicit targets set only allow them
			if(!ok(tg)) return this;
			var r = new XMLHttpRequest();
			r.open('POST',de,true);
			r.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
			if(typeof cb==="function") r.onload = cb;
			r.send((id ? 'oid='+id+'&':'')+'url='+l.href+'&'+(re ? 'ref='+re+'&':'')+(sz ? 'size='+sz+'&':'')+txt);
			return this;
		}
		return this;
	}
	root.OI.log = new Log();
})(window || this);
