/**
 * Created by yangchao on 8/5/16.
 */
define(function (){

    function _setCookie(c_name,value,expiredays) {
        var exdate=new Date();
        exdate.setDate(exdate.getDate()+expiredays);
        document.cookie=c_name+ "=" +encodeURI(value)+
            ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
    }

    function _getCookie(c_name) {
        if (document.cookie.length>0)
        {
            c_start=document.cookie.indexOf(c_name + "=");
            if (c_start!=-1)
            {
                c_start=c_start + c_name.length+1;
                c_end=document.cookie.indexOf(";",c_start);
                if (c_end==-1) c_end=document.cookie.length;
                return decodeURIComponent(document.cookie.substring(c_start,c_end));
            }
        }
        return null;
    }

    function _delCookie(c_name) {
        _setCookie(c_name, '', -1);
    }


    function _getQueryString(key) {
        var searchString = location.search.substring(1);
        var params = searchString.split('&');
        for(var i =0;i<params.length; i++) {
            var arr = params[i].split('=');
            if(arr[0] === key && arr.length > 1) {
                return arr[1];
            }
        }
        return null;
    }


    function _getHashString(key) {
        var arr = location.hash.split('?');
        var search = '';
        if(arr.length > 1) {
            search = arr[1];
        }else {
            return null;
        }
        var params = search.split('&');
        for(var i =0;i<params.length; i++) {
            var arr = params[i].split('=');
            if(arr[0] === key && arr.length > 1) {
                return arr[1];
            }
        }
        return null;
    }


    function _base64Encoder(e){
        var t,n,o,r,a,i,u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",e = e+"";
        for(o=e.length,n=0,t="";o>n;){
            if(r=255&e.charCodeAt(n++),n==o) {
                t+=u.charAt(r>>2),t+=u.charAt((3&r)<<4),t+="==";
                break
            }
            if(a=e.charCodeAt(n++),n==o){
                t+=u.charAt(r>>2),t+=u.charAt((3&r)<<4|(240&a)>>4),t+=u.charAt((15&a)<<2),t+="=";
                break
            }
            i=e.charCodeAt(n++),t+=u.charAt(r>>2),t+=u.charAt((3&r)<<4|(240&a)>>4),t+=u.charAt((15&a)<<2|(192&i)>>6),t+=u.charAt(63&i)
        }return t
    }


    function _base64Decoder(str){
        var c1, c2, c3, c4;
        var base64DecodeChars = [
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57,
            58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0,  1,  2,  3,  4,  5,  6,
            7,  8,  9,  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
            25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
            37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1,
            -1, -1];
        var i=0, len = str.length, string = '';

        while (i < len){
            do{
                c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
            } while (
            i < len && c1 == -1
                );

            if (c1 == -1) break;

            do{
                c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
            } while (
            i < len && c2 == -1
                );

            if (c2 == -1) break;

            string += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

            do{
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 == 61)
                    return string;

                c3 = base64DecodeChars[c3]
            } while (
            i < len && c3 == -1
                );

            if (c3 == -1) break;

            string += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

            do{
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 == 61) return string;
                c4 = base64DecodeChars[c4]
            } while (
            i < len && c4 == -1
                );

            if (c4 == -1) break;

            string += String.fromCharCode(((c3 & 0x03) << 6) | c4)
        }
        return string;
    }


    function _showModal(txt) {
        $("#loadingModalText").html(txt);
        $("#loadingModal").show();
        return true;
    }


    function _hideModal() {
        $("#loadingModal").hide();
        return false;
    }

    window.__tools__ = {
        setCookie: _setCookie,
        getCookie: _getCookie,
        delCookie: _delCookie,
        getQueryString: _getQueryString,
        getHashString: _getHashString,
        base64Decoder: _base64Decoder,
        base64Encoder: _base64Encoder,
        showModal: _showModal,
        hideModal: _hideModal
    };
});