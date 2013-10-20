var testMsg = "Passed finished!. Test return: ";
intValue = function(validationValue){
	  var RegExPattern = /^(?:\+|-)?\d+$/;
    return (arguments[0].match(RegExPattern) && (arguments[0]!='')) ? true : false;
}
reqValue = function(validationValue){
	  return (arguments[0].replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g,"").length==0) ? false : true;
}
minLength = function(validationValue,minLength){
	  return (arguments[0].replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g,"").length<arguments[1]) ? false : true;
}
maxLenght = function(validationValue,maxLength){
	  return (arguments[0].replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g,"").length>arguments[1]) ? false : true;
}
urlValue = function(validationValue){
	  var RegExPattern = /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)( [a-zA-Z0-9\-\.\?\,\'\/\\\+&%\$#_]*)?$/;
	  return (arguments[0].match(RegExPattern) && (arguments[0]!='')) ? true : false;
}
emailValue = function(){
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
return false;}

regExprValue = function(){
    return arguments[0].match(arguments[1]) ? true : false;
}

//tests for intValue Validation
module( "Function intValue" );
test( "intValue('a') --> must returns false", function() {
    var validation = intValue('a');
    ok( validation==false, testMsg + validation );
});
test( "intValue('6') --> must returns true", function() {
    var validation = intValue('6');
    ok( validation==true, testMsg + validation );
});
test( "intValue('') --> must returns false", function() {
    var validation = intValue('');
    ok( validation==false, testMsg + validation );
});
test( "intValue(' ') --> must returns false", function() {
    var validation = intValue(' ');
    ok( validation==false, testMsg + validation );
});

//tests for reqValue Validation
module( "Function reqValue" );
test( "reqValue('') --> must returns false", function() {
    var validation = reqValue('');
    ok( validation==false, testMsg + validation );
});
test( "reqValue(' ') --> must returns false", function() {
    var validation = reqValue(' ');
    ok( validation==false, testMsg + validation );
});
test( "reqValue('a') --> must returns true", function() {
    var validation = reqValue('a');
    ok( validation==true, testMsg + validation );
});
test( "reqValue('23') --> must returns true", function() {
    var validation = reqValue('23');
    ok( validation==true, testMsg + validation );
});

//tests for minLength Validation
module( "Function minLength" );
test( "minLength('123',4) --> must returns false", function() {
    var validation = minLength('123',4);
    ok( validation==false, testMsg + validation );
});
test( "minLength('   4',4) --> must returns false", function() {
    var validation = minLength('   4',4);
    ok( validation==false, testMsg + validation );
});
test( "minLength('1234',4) --> must returns true", function() {
    var validation = minLength('1234',4);
    ok( validation==true, testMsg + validation );
});
test( "minLength('1234567',4) --> must returns true", function() {
    var validation = minLength('1234567',4);
    ok( validation==true, testMsg + validation );
});

//tests for maxLenght Validation
module( "Function maxLenght" );
test( "maxLenght('12345',4) --> must returns false", function() {
    var validation = maxLenght('12345',4);
    ok( validation==false, testMsg + validation );
});
test( "maxLenght('1234',4) --> must returns true", function() {
    var validation = maxLenght('1234',4);
    ok( validation==true, testMsg + validation );
});
test( "maxLenght('12',4) --> must returns true", function() {
    var validation = maxLenght('12',4);
    ok( validation==true, testMsg + validation );
});
test( "maxLenght('    56',4) --> must returns true", function() {
    var validation = maxLenght('    56',4);
    ok( validation==true, testMsg + validation );
});

//tests for urlValue Validation
module( "Function urlValue" );
test( "urlValue('http://www.google.es') --> must returns true", function() {
    var validation = urlValue('http://www.google.es');
    ok( validation==true, testMsg + validation );
});
test( "urlValue('http://google.es') --> must returns true", function() {
    var validation = urlValue('http://google.es');
    ok( validation==true, testMsg + validation );
});
test( "urlValue('http://.google.es') --> must returns false", function() {
    var validation = urlValue('http://.google.es');
    ok( validation==false, testMsg + validation );
});
test( "urlValue('http:/google.es') --> must returns false", function() {
    var validation = urlValue('http:/google.es');
    ok( validation==false, testMsg + validation );
});
test( "urlValue('http:google.es') --> must returns false", function() {
    var validation = urlValue('http:google.es');
    ok( validation==false, testMsg + validation );
});
test( "urlValue('google.es') --> must returns false", function() {
    var validation = urlValue('google.es');
    ok( validation==false, testMsg + validation );
});
test( "urlValue('google') --> must returns false", function() {
    var validation = urlValue('google');
    ok( validation==false, testMsg + validation );
});

//tests for emailValue Validation
module( "Function emailValue" );
test( "emailValue('nogueradavid1@gmail.com') --> must returns true", function() {
    var validation = emailValue('nogueradavid1@gmail.com');
    ok( validation==true, testMsg + validation );
});
test( "emailValue('nogueradavid1@gmail') --> must returns false", function() {
    var validation = emailValue('nogueradavid1@gmail');
    ok( validation==false, testMsg + validation );
});
test( "emailValue('nogueradavid1') --> must returns false", function() {
    var validation = emailValue('nogueradavid1');
    ok( validation==false, testMsg + validation );
});
test( "emailValue('nogueradavid1gmail.com') --> must returns false", function() {
    var validation = emailValue('nogueradavid1gmail.com');
    ok( validation==false, testMsg + validation );
});
test( "emailValue('nogueradavid1@gmail.c') --> must returns false", function() {
    var validation = emailValue('nogueradavid1@gmail.c');
    ok( validation==false, testMsg + validation );
});
test( "emailValue('nogueradavid1@gmail.co') --> must returns true", function() {
    var validation = emailValue('nogueradavid1@gmail.co');
    ok( validation==true, testMsg + validation );
});

//tests for regExprValue Validation
module( "Function regExprValue" );
test( "regExprValue('zzz','[a-z]') --> must returns true", function() {
    var validation = regExprValue('zzz','[a-z]');
    ok( validation==true, testMsg + validation );
});
module( "Function regExprValue" );
test( "regExprValue('444','[a-z]') --> must returns false", function() {
    var validation = regExprValue('444','[a-z]');
    ok( validation==false, testMsg + validation );
});
module( "Function regExprValue" );
test( "regExprValue('99z','[a-z]') --> must returns true", function() {
    var validation = regExprValue('99z','[a-z]');
    ok( validation==true, testMsg + validation );
});