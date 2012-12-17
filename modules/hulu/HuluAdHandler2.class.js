// ======================================================================
// HuluAdHandler.class.js
// The logic which encapsulates the ad replacement for flv files
// ======================================================================

var EXPORTED_SYMBOLS = ["HuluAdHandler2"];

Components.utils.import("resource://adblock-hulu-modules/alert.js");
Components.utils.import("resource://adblock-hulu-modules/common.js");
Components.utils.import("resource://adblock-hulu-modules/listeners/ReplaceListener.class.js");
Components.utils.import("resource://adblock-hulu-modules/listeners/PassthroughListener.class.js");
Components.utils.import("resource://adblock-hulu-modules/listeners/ModifyingListener.class.js");
Components.utils.import("resource://adblock-hulu-modules/listeners/CompleteListener.class.js");

function read(file){
    var ioService = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
    var scriptableStream = Cc["@mozilla.org/scriptableinputstream;1"].getService(Ci.nsIScriptableInputStream);
    var channel = ioService.newChannel(file,null,null);
    var input = channel.open();
    scriptableStream.init(input);
    var result = scriptableStream.readBytes(input.available());
    scriptableStream.close();
    input.close();
    return result;
}

function HuluAdHandler2(){
    this.strategy = new ReplaceListener('');
}

HuluAdHandler2.match = function(subject){
    var url = subject.URI.spec;
    var isMatch = /^http:\/\/p\.hulu\.com\/getPlaylist/.test(url);
    return isMatch;
};

HuluAdHandler2.getHandler = function(){
    return new HuluAdHandler2();
};

HuluAdHandler2.prototype = {
    strategy: null,
    response: function(data, code, request){
        // an ad has been blocked!
    }
};
