import axios from 'axios'
import _assignIn from 'lodash/assignIn'
import _get from 'lodash/get'
import Clipboard from 'clipboard'
// import lscache from 'lscache'

function getHostInfo(key) {
    return window.hostInfo[key];
}

function getUploadHost() {
    return '.';
    let localFilter = /^10.31|localhost|127.0.0.1/;
    return window.CDN_PATH + ( localFilter.test(document.domain) ? '' : '');
}

function isIOS() {
    return !!navigator.userAgent.match(/iPhone|iPod|iPad/g);
}

function isAndroid() {
    return !isIOS();
}

function isSafari() {
    let uaParser = new UAParser();
    return !! _get(uaParser.getBrowser(), 'name', '').match(/safari/i);
    // return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

function isMobile() {
    return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
}

function isBlank(str = '') {
    if(str === null || str === undefined) return true;
    return /^\s*$/.test((str + ''));
}

function isNotBlank(str) {
	return !isBlank(str);
}

//取得url參數
function queryString(key) {
    let location = document.location.search;
    if(!location) location = window.top.location.search; //找parent
	return (location.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || [ '', null ])[1];
}

let _readyPromise;

function ready() {
    return _readyPromise;
}

function getPrivateIp(onNewIP) {
    try{
        var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        if(!myPeerConnection || isIOS()) { //ios 取不到內部ip
            onNewIP(-1); //表示抓不到內部ip
            return;
        }
        var pc = new myPeerConnection({ iceServers: []}),
            noop = function() {},
            localIPs = {},
            ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
            key;
        function iterateIP(ip) {
            if (!localIPs[ip]) onNewIP(ip);
            localIPs[ip] = true;
        }
        //create a bogus data channel
        pc.createDataChannel("");
        // create offer and set local description
        pc.createOffer(function(sdp) {
            sdp.sdp.split('\n').forEach(function(line) {
                if (line.indexOf('candidate') < 0) return;
                line.match(ipRegex).forEach(iterateIP);
            });

            pc.setLocalDescription(sdp, noop, noop);
        }, noop);
        //listen for candidate events
        pc.onicecandidate = function(ice) {
            if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
            ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
        };
    } catch(e) {
        onNewIP(-1);
    }
}

function race(domains, cb) {
    var hit = false;
    for (var i = 0; i < domains.length; i++) {
        (function(){
            var domain = domains[i];
            var url = location.protocol + '//' + domain  + '/ping.gif?ts=' + Date.now()
            axios({
                url: url,
                timeout: 4000
            }).then(function(res) {
                if(hit) return;
                if(res.status == 200) {
                    hit = true;
                    cb(domain)
                }
            });
        })()
    }
}

// param 如果是 string ， 其他屬性用默認配置
// param 也可以傳入{} ， 可指定其他屬（https://doc.vux.li/zh-CN/components/toast.html）
function showToast(param) {
	let conf = {
		show:true,
		time: 1500,
		position: 'middle',
		onShow: () => {},
		onHide: () => {},
	};
	if(typeof param == 'string') {
		conf.text = param;
	} else {
		_assignIn(conf, param);
	}
	store.commit(types.SET_TOAST,conf);
}

//取得當前 protocol + domain + port
function getCurrentDomainPath() {
	let port = location.port;
    if (port) port = ':' + port;
    return location.protocol + '//' + document.domain + port;
}

function copyHanlder(_vue, text, cssSel = '.copy') {
    let clipboard = new Clipboard(cssSel, {
        text: trigger => text
    });
    clipboard.on('success', function(e) {
        showToast('复制成功')
        e.clearSelection();
    });
}

// 不支援VIVO QQ 瀏覽器
function notValidBrowser (){
    let uaParser = new UAParser();
    let browserName = _get(uaParser.getBrowser(), 'name', '');
    let isVIVO = /vivobrowser/i.test(uaParser.getUA())
    return browserName.match(/QQ|vivo/i) || isVIVO
}

export default {
    getHostInfo,
    getUploadHost,
    isIOS,
    isAndroid,
    isSafari,
    isMobile,
    getPrivateIp,
    race,
    isNotBlank,
    isBlank,
    queryString,
    showToast,
    getCurrentDomainPath,
    ready,
    copyHanlder
}
