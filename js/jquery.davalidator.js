 /*!
 * Davalidator v0.1.2
 *
 * @name     davalidator
 * @author   David Noguera Gutierrez
 * @date 	 2013-4-28
 * @license	 Released under the MIT license
 */
(function(global,undefined) {
	daValidator = function(form,msg,jQuery){
		//private properties
		var formObj = document.forms[form],
			validatonSet = new Array();
		//public properties and methods
		this.numValidations = 0;
		this.addValidation = function(validationType,validationField,validationMsg,args){
			if (args==undefined){args=null}
			validatonSet.push(new Array (validationType,validationField,validationMsg,args,false));
			this.numValidations ++;
		}
		//submit event: runs validations and shows alerts messages
		formObj.onsubmit = function(){
			var i, len, validationValue, validationState = true, validationStateItem = true;
			daValidator.prototype.dialogMsg = "";
			//remove all form alerts: append type
			validationMsgItems = this.getElementsByClassName("davalidator-msg");
			if (validationMsgItems.length>0) {$(validationMsgItems).remove();}
			//loop through validations and get the final state (validationState).
			//It shows the indiudal alert messages ("append", "alert")
			for(i=0, len = validatonSet.length;i<len;i++) {
				validationValue = document.getElementById(validatonSet[i][1]).value;
				validationStateItem = daValidator.prototype[validatonSet[i][0]].apply(this, [validationValue,validatonSet[i][3]]);
				if (validationStateItem==false){	
					daValidator.prototype[msg['msgType']].apply(this, [validatonSet[i],msg['msgEffect']]);	
					validationState =  false;}
				else{
					//remove all form alerts: tootip type
					if (msg['msgType']=="showToolTip"){$("#" + validatonSet[i][1]).attr("title","");}
				}
			}
			//show jQueryUI-dialog if msgType=showDialog
			if (msg['msgType']=="showDialog" && validationState===false){ 
				daValidator.prototype.showDialogUI(formObj,msg);
			}
			return validationState;
		}		
	}

	daValidator.prototype = {
		showAppend : function(itemAlert,effectType){
	      	 var elem = "#" + itemAlert[1],
	      	 	 elem_alert = itemAlert[1] + "_msg",
	      	 	 elem_msg = "";
	      	 if (document.getElementById(elem_alert)==undefined){
	      	 	jQuery(elem).after("<span class='davalidator-msg' id='" + elem_alert + "'>" + itemAlert[2] + "</span>");}
	      	 else{
	      	 	elem_msg = document.getElementById(elem_alert).innerHTML + itemAlert[2];
	      	 	jQuery("#" + elem_alert).html(elem_msg);}
	      	 if (effectType=='fade'){
	      	 	jQuery("#" + elem_alert).hide().fadeIn("slow");}
	      	 else{
	      	 	jQuery("#" + elem_alert).show().hide().slideDown();}},
		showToolTip : function(itemAlert,effectType){
	      	 var elem = "#" + itemAlert[1],
	      	 	 elem_msg = "";
	      	 $(elem).attr("title",itemAlert[2]).tooltip({
	      	 	position: { of: elem, my: 'left center', at: 'right-10 top' }
	      	 }).tooltip("open");},	      	 	
		showDialog : function(itemAlert){
	      	 daValidator.prototype.dialogMsg += itemAlert[2]},
	    showDialogUI : function(formObj,msg){
				var msgHTML = "<div id='daValidator-dialog'><p>" + daValidator.prototype.dialogMsg + "</p></div>",
					msgHTMLbtn = msg['msgButton']!=undefined ? msg['msgButton'] : "close",
					msgHTMLtitle = msg['msgTitle']!=undefined ? msg['msgTitle'] : "form errors",
					msgHTMLshow = msg['msgShow']!=undefined ? msg['msgShow'] : "fold",
					msgHTMLhide = msg['msgHide']!=undefined ? msg['msgHide'] : "scale";
				jQuery(formObj).after(msgHTML);
				$("#daValidator-dialog:ui-dialog" ).dialog( "destroy" );      
			    $("#daValidator-dialog" ).dialog({
			      modal: true,
			      show: msgHTMLshow,
			   	  hide: msgHTMLhide,
			   	  resizable: false,
			   	  title: msgHTMLtitle,
			   	  dialogClass: "daValidator-dialog-info",
			   	  buttons: [{ text: msgHTMLbtn, click: function(){$(this ).dialog( "close" );}}]
			    });
	    	},
	    showAlert : function(itemAlert){
	      	 alert(itemAlert[2]);},
		reqValue : function(){
			return (arguments[0].replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g,"").length==0) ? false : true;},
		intValue : function(){
			var RegExPattern = /^(?:\+|-)?\d+$/;
			return (arguments[0].match(RegExPattern) && (arguments[0]!='')) ? true : false;},
		urlValue : function(){
			var RegExPattern = /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)( [a-zA-Z0-9\-\.\?\,\'\/\\\+&%\$#_]*)?$/;
			return (arguments[0].match(RegExPattern) && (arguments[0]!='')) ? true : false;},
		minLength : function(){
			return (arguments[0].replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g,"").length<arguments[1]) ? false : true;},
		maxLenght : function(){
			return (arguments[0].replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g,"").length>arguments[1]) ? false : true;},
		emailValue : function(){
		    if(arguments[0].length <= 0){
			  return false;}
		    var splitted = arguments[0].match('^(.+)@(.+)$');
		    if(splitted == null) return false;
		    if(splitted[1] != null ){
		      var regexp_user=/^\'?[\w-_\.]*\'?$/;
		      if(splitted[1].match(regexp_user) == null) return false;}
		    if(splitted[2] != null){
		      var regexp_domain=/^[\w-\.]*\.[A-Za-z]{2,4}$/;
		      if(splitted[2].match(regexp_domain) == null) {
			    var regexp_ip =/^\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]$/;
			    if(splitted[2].match(regexp_ip) == null) return false;}
		      return true;}
			return false;},
		regExprValue : function(){
			return arguments[0].match(arguments[1]) ? true : false;
		}
	}
  	global.daValidator = daValidator;
})(this);