define('loadscript',function(require,exports,module){exports.loadScript=$loadScript;function $loadScript(obj){if(!$loadScript.counter){$loadScript.counter=1;}
var isObj=typeof(obj)=="object",url=isObj?obj.url:arguments[0],id=isObj?obj.id:arguments[1],obj=isObj?obj:arguments[2],_head=document.head||document.getElementsByTagName("head")[0]||document.documentElement,_script=document.createElement("script"),D=new Date(),_time=D.getTime(),_isCleared=false,_timer=null,o=obj||{},data=o.data||'',charset=o.charset||"gb2312",isToken=o.isToken,timeout=o.timeout,isAutoReport=o.isAutoReport||false,reportOptions=o.reportOptions||{},reportType=o.reportType||'current',reportRetCodeName=o.reportRetCodeName,reportSuccessCode=typeof(o.reportSuccessCode)=="undefined"?200:o.reportSuccessCode,reportErrorCode=typeof(o.reportErrorCode)=="undefined"?500:o.reportErrorCode,reportTimeoutCode=typeof(o.reportTimeoutCode)=="undefined"?600:o.reportTimeoutCode,onload=o.onload,onsucc=o.onsucc,callbackName=o.callbackName||'',callback=o.callback,errorback=o.errorback,_jsonpLoadState='uninitialized';var complete=function(errCode){if(!_script||_isCleared){return;}
_isCleared=true;if(_timer){clearTimeout(_timer);_timer=null;}
_script.onload=_script.onreadystatechange=_script.onerror=null;if(_head&&_script.parentNode){_head.removeChild(_script);}
_script=null;if(callbackName){if(callbackName.indexOf('.')==-1){window[callbackName]=null;try{delete window[callbackName];}
catch(e){}}
else{var arrJ=callbackName.split("."),p={};for(var j=0,jLen=arrJ.length;j<jLen;j++){var n=arrJ[j];if(j==0){p=window[n];}
else{if(j==jLen-1){try{delete p[n];}
catch(e){}}
else{p=p[n];}}}}}
if(_jsonpLoadState!="loaded"&&typeof errorback=="function"){errorback(errCode);}
if(isAutoReport&&reportType!='cross'){_retCoder.report(_jsonpLoadState=="loaded",errCode);}};var jsontostr=function(d){var a=[];for(var k in d){a.push(k+'='+d[k]);}
return a.join('&');};if(isAutoReport&&reportOptions){if(reportType=='cross'){$returnCode(reportOptions).reg();}
else{reportOptions.url=reportOptions.url||url.substr(0,url.indexOf('?')==-1?url.length:url.indexOf('?'));var _retCoder=$returnCode(reportOptions);}}
if(data){url+=(url.indexOf("?")!=-1?"&":"?")+(typeof data=='string'?data:jsontostr(data));}
if(callbackName&&typeof callback=="function"){var oldName=callbackName;if(callbackName.indexOf('.')==-1){callbackName=window[callbackName]?callbackName+$loadScript.counter++:callbackName;window[callbackName]=function(jsonData){_jsonpLoadState='loaded';if(isAutoReport&&reportRetCodeName){reportSuccessCode=jsonData[reportRetCodeName];}
callback.apply(null,arguments);onsucc&&(onsucc());};}
else{var arrJ=callbackName.split("."),p={},arrF=[];for(var j=0,jLen=arrJ.length;j<jLen;j++){var n=arrJ[j];if(j==0){p=window[n];}
else{if(j==jLen-1){p[n]?(n=n+$loadScript.counter++):'';p[n]=function(jsonData){_jsonpLoadState='loaded';if(isAutoReport&&reportRetCodeName){reportSuccessCode=jsonData[reportRetCodeName];}
callback.apply(null,arguments);onsucc&&(onsucc());};}
else{p=p[n];}}
arrF.push(n);}
callbackName=arrF.join('.');}
url=url.replace('='+oldName,'='+callbackName);}
_jsonpLoadState='loading';id=id?(id+_time):_time;url=(isToken!==false?$addToken(url,"ls"):url);_script.charset=charset;_script.id=id;_script.onload=_script.onreadystatechange=function(){var uA=navigator.userAgent.toLowerCase();if(!(!(uA.indexOf("opera")!=-1)&&uA.indexOf("msie")!=-1)||/loaded|complete/i.test(this.readyState)){if(typeof onload=="function"){onload();}
complete(_jsonpLoadState=="loaded"?reportSuccessCode:reportErrorCode);}};_script.onerror=function(){complete(reportErrorCode);};if(timeout){_timer=setTimeout(function(){complete(reportTimeoutCode);},parseInt(timeout,10));}
setTimeout(function(){_script.src=url;try{_head.insertBefore(_script,_head.lastChild);}catch(e){}},0);}
function $addToken(url,type){var token=$getToken();if(url==""||(url.indexOf("://")<0?location.href:url).indexOf("http")!=0){return url;}
if(url.indexOf("#")!=-1){var f1=url.match(/\?.+\#/);if(f1){var t=f1[0].split("#"),newPara=[t[0],"&g_tk=",token,"&g_ty=",type,"#",t[1]].join("");return url.replace(f1[0],newPara);}else{var t=url.split("#");return[t[0],"?g_tk=",token,"&g_ty=",type,"#",t[1]].join("");}}
return token==""?(url+(url.indexOf("?")!=-1?"&":"?")+"g_ty="+type):(url+(url.indexOf("?")!=-1?"&":"?")+"g_tk="+token+"&g_ty="+type);};function $getCookie(name){var reg=new RegExp("(^| )"+name+"(?:=([^;]*))?(;|$)"),val=document.cookie.match(reg);return val?(val[2]?unescape(val[2]):""):null;};function $getToken(){var skey=$getCookie("skey"),token=skey==null?"":$time33(skey);return token;};function $loadUrl(o){o.element=o.element||'script';var el=document.createElement(o.element);el.charset=o.charset||'utf-8';if(o.noCallback==true){el.setAttribute("noCallback","true");}
el.onload=el.onreadystatechange=function(){if(/loaded|complete/i.test(this.readyState)||navigator.userAgent.toLowerCase().indexOf("msie")==-1){clear();}};el.onerror=function(){clear();};el.src=o.url;document.getElementsByTagName('head')[0].appendChild(el);function clear(){if(!el){return;}
el.onload=el.onreadystatechange=el.onerror=null;el.parentNode&&(el.parentNode.removeChild(el));el=null;}};function $report(url){$loadUrl({'url':url+((url.indexOf('?')==-1)?'?':'&')+"cloud=true&"+Math.random(),'element':'img'});};function $returnCode(opt){var option={url:"",action:"",sTime:"",eTime:"",retCode:"",errCode:"",frequence:1,refer:location.href,uin:"",domain:"paipai.com",from:1,report:report,isReport:false,timeout:3000,timeoutCode:444,formatUrl:true,reg:reg};for(var i in opt){option[i]=opt[i];}
if(option.url){option.sTime=new Date();}
if(option.timeout){setTimeout(function(){if(!option.isReport){option.report(true,option.timeoutCode);}},option.timeout);}
function reg(){this.sTime=new Date();if(!this.action){return;}
var rcookie=$getCookie("retcode"),cookie2=[];rcookie=rcookie?rcookie.split("|"):[];for(var i=0;i<rcookie.length;i++){if(rcookie[i].split(",")[0]!=this.action){cookie2.push(rcookie[i]);}}
cookie2.push(this.action+","+this.sTime.getTime());$setCookie("retcode",cookie2.join("|"),60,"/",this.domain);}
function report(ret,errid){this.isReport=true;this.eTime=new Date();this.retCode=ret?1:2;this.errCode=isNaN(parseInt(errid))?"0":parseInt(errid);if(this.action){this.url="http://retcode.paipai.com/"+this.action;var rcookie=$getCookie("retcode"),ret="",ncookie=[];rcookie=rcookie?rcookie.split("|"):[];for(var i=0;i<rcookie.length;i++){if(rcookie[i].split(",")[0]==this.action){ret=rcookie[i].split(",");}
else{ncookie.push(rcookie[i]);}}
$setCookie("retcode",ncookie.join("|"),60,"/",this.domain);if(!ret){return;}
this.sTime=new Date(parseInt(ret[1]));}
if(!this.url){return;}
var domain=this.url.replace(/^.*\/\//,'').replace(/\/.*/,''),timer=this.eTime-this.sTime,cgi=encodeURIComponent(this.formatUrl?this.url.match(/^[\w|/|.|:|-]*/)[0]:this.url);this.reportUrl="http://c.isdspeed.qq.com/code.cgi?domain="+domain+"&cgi="+cgi+"&type="+this.retCode+"&code="+this.errCode+"&time="+timer+"&rate="+this.frequence+(this.uin?("&uin="+this.uin):"");if(this.reportUrl&&Math.random()<(1/this.frequence)&&this.url){$report(this.reportUrl);}}
return option;};function $setCookie(name,value,expires,path,domain,secure){var exp=new Date(),expires=arguments[2]||null,path=arguments[3]||"/",domain=arguments[4]||null,secure=arguments[5]||false;expires?exp.setMinutes(exp.getMinutes()+parseInt(expires)):"";document.cookie=name+'='+escape(value)+(expires?';expires='+exp.toGMTString():'')+(path?';path='+path:'')+(domain?';domain='+domain:'')+(secure?';secure':'');};function $time33(str){for(var i=0,len=str.length,hash=5381;i<len;++i){hash+=(hash<<5)+str.charAt(i).charCodeAt();};return hash&0x7fffffff;}});
define('wg.paySuccess',function(require,exports,module){var _cacheThisModule_,$=require('mobile.zepto'),util=require('wg.util'),md5=require('md5'),ls=require('loadscript'),ck=require('cookie'),pu=require('payutil'),wg_uin=ck.get('wg_uin')||ck.get('p_uin')||ck.get('uin'),wg_skey='',curl=encodeURIComponent(location.href),appid='',bf=util.getQuery('bf'),muDeal=util.getQuery('muDeal'),dealId=util.getQuery('dealId'),jdpay=util.getQuery('jdpay'),bindSuc=util.getQuery('bindSuc'),bid=util.getQuery('bid'),custom=util.getQuery('custom'),attachP=util.getQuery('attach'),commStr=util.getQuery('comm'),comm=null,attachA=[],_bf='',_brA=[],ParaObj=null,backUrl='',ua=navigator.userAgent,cgi={bindUrl:'http://bases.wanggou.com/ulogin/getbindurl',improve:'http://party.paipai.com/tws64/jd/BindMobileReq',getck:'http://focus.paipai.com/wxmall/getck'},initItil={pv:['8|11|0:0','8|11|0:1'],share:['8|11|1:0','8|11|1:1'],tip:['8|11|2:0','8|11|2:1'],approSuc:['8|11|3:0','8|11|3:1']};pu.itilReport(initItil.pv[1]);if(bindSuc=='1'){pu.itilReport(initItil.approSuc[1]);}
function parseJson(str){var res=null;if(window.JSON){res=JSON.parse(decodeURIComponent(str));}else{res=eval('('+decodeURIComponent(str)+')');}
return res;}
function isWxUserAgent(){if(navigator.userAgent.indexOf('MicroMessenger')>0){return true;}
return false;}
function isMQQUserAgent(){if(/qq\/([\d\.]+)*/.test(navigator.userAgent.toLowerCase())){return true;}
return false;}
if(custom!==''){ParaObj=parseJson(custom);bf=ParaObj.bf;bid=ParaObj.bid;dealId=ParaObj.dealId;muDeal=ParaObj.muDeal;}else{if(muDeal===''&&attachP!==''){attachA=attachP.split('~');bid=attachA[0]||'';_bf=attachA[1]||'';if(_bf!==''&&_bf.split('|').length>1){_brA=_bf.split('|');bf=_brA[0]||'';muDeal=_brA[1]||'1';}}
if(bf===''){bf=ck.get('bf');}}
if(commStr!==''){comm=parseJson(commStr);}
if(jdpay==='1'){backUrl=(window.wxPayDomain||'http://m.buy.qq.com/')+'p/cart/order/orderlist_v2.shtml?toptab=2&tab=1&backurl='+curl+'&bid='+bid;}else{backUrl=(window.wxPayDomain||'http://m.buy.qq.com/')+'p/cart/order/orderlist_v2.shtml?toptab=1&tab=1&backurl='+curl+'&bid='+bid;}
function reGoGo(){if(pu.isMQQUserAgent()){$('#goHome').attr('href','http://mm.wanggou.com/promote/chaohuasuan_index.shtml?PTAG=37112.2.2&ch=39');}else{$('#goHome').attr('href','http://mm.wanggou.com/category_m.shtml?shownav=1&PTAG=37112.1.2');}}
function setJump(){if(ua.indexOf('Android')>-1){$('#jdAppBar').attr('href','http://storage.jd.com/jdmobile/jd-wxmall2.apk?Expires=1713064561&AccessKey=77a2f170807670c5afd3cccf63deaee9ca2f4714&Signature=GAqk99qZVm3nHqm0Lkr5bzgKtNM%3D').show();}
var ptag='';if(pu.isWxUserAgent()){ptag='&ptag=37112.1.1&';}else if(pu.isMQQUserAgent()){ptag='&ptag=37112.2.1&';}
if(muDeal==='1'){$('#goDealList').attr("href",(window.wxPayDomain||'http://m.buy.qq.com/')+"p/cart/order/orderlist_merge.shtml?tab=1&backurl="+curl+"&bid="+bid+ptag);}else{if(jdpay==='1'){$('#goDealList').attr("href",(window.wxPayDomain||'http://m.buy.qq.com/')+"p/cart/order/n_detail_v2.shtml?deal_id="+dealId+"&backurl="+encodeURIComponent(backUrl)+"&bid="+bid+"&new=1&jddeal=1&orderfrom=paysuc"+ptag);}else{$('#goDealList').attr("href",(window.wxPayDomain||'http://m.buy.qq.com/')+"p/cart/order/n_detail_v2.shtml?deal_id="+dealId+"&backurl="+encodeURIComponent(backUrl)+"&bid="+bid+"&new=1"+ptag);}}}
function bindShareEvent(){var _link='';if(jdpay==='1'){_link='http://mm.wanggou.com/item/jd.shtml?sku='+comm.id;}else{_link='http://mm.wanggou.com/item/?ic='+comm.id;}
window.shareConfig={img_url:comm.img,img_width:80,img_heigth:80,link:_link,title:comm.name,desc:comm.name};$('#btnShare').bind('click',function(){var ptag='';if(pu.isWxUserAgent()){ptag='37112.1.3';}else if(pu.isMQQUserAgent()){ptag='37112.2.3';}
if(JD&&JD.report&&JD.report.rd){JD.report.rd(ptag);}
$('#shareLayer').show();});$('#shareLayer').bind('click',function(){$('#shareLayer').hide();});pu.itilReport(initItil.share[1]);}
function bindJdCtrl(){if(window.locker.newBinkJdPin){pu.getPinStatus({wid:wg_uin,sceneid:2,tipId:'bindJd'});}else{window.cbBindJdCtry=function(d){if(d.bindShow==='1'){var url=cgi.improve,wid=ck.get('wg_uin')||ck.get('p_uin')||ck.get('uin'),jdPinMd5='',rurl=location.href,clickUrl='',ptag='';rurl=rurl.split('?');if(rurl.length>1){rurl=rurl[0]+'?bindSuc=1&'+rurl[1];}else{rurl=rurl[0]+'?bindSuc=1';}
jdPinMd5=md5.getHash(wid+rurl+"widrurl@2014");rurl=encodeURIComponent(rurl);clickUrl=url+'?wid='+wid+'&rurl='+rurl+'&check='+jdPinMd5;if(pu.isWxUserAgent()){ptag='37112.1.4';}else if(pu.isMQQUserAgent()){ptag='37112.2.4';}
$('#improve').attr('href',clickUrl);$('#improve').attr('ptag',ptag);$('#bindJd').show();pu.itilReport(initItil.tip[1]);}};ls.loadScript({url:cgi.bindUrl,data:{callback:'cbBindJdCtry',t:Math.random()}});}}
function upload(){if(window.jdPvLog){window.jdPvLog({sale_old_id:dealId});}else{window.ja_data={sale_old_id:dealId};}}
function init(){setJump();reGoGo();if(comm&&isWxUserAgent()){bindShareEvent();}else{$('#btnShare').hide().parent().addClass('link_wrap2');}
if(bindSuc!='1'){bindJdCtrl();}
$("#wxloading").remove();if(isMQQUserAgent()){$('#linkBar').show();}}
exports.init=init;});
/*  |xGv00|69628eeba9a205f10b9c44ccd2617438 */