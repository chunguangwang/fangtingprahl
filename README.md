# fangtingprahl
Calulator challenge of Kaufman Rossin
User Guide


0 To use the calculator, please use this link http://algebra.chunguangpenisula.com/calculator.html.

  Or download the calculator.html, jquery.cookie.js, Math.min.js to the same forder.
  Then open calculator.html in Chrome(Cookie may not work in Chrome on local folder), or Internet Explorer(Cookie works 
  on local folder)

1 Math expressions can be typed in by keyboard, or by clicking graphical buttons on the calculator，
  by clicking enter button, if the expression is mathematically meaningfull, the calculator will evaluate
  the result, and display it in the input text box.
  
2 For package built in functions like exp(), log(), sqrt(), pow(), user should put the arguments between  
  "(" and ")", since the user may input any expression and number with any length, I didn't complete the right bracket ')', leaving when to 
  complete the brackets to the user.
  
3 Most of the functions are straightforward to use, here are a few examples:
  
  sqrt(16)=>4  
  pow(2,3)=>8
  log(8,2)=>3

4 User can set the number of precision digits: type in integer in the input bolx after the button "Set Precison digits",
  then click the button, the number of precision digits will be set.
  
5 The most recently successfully executed 10 math expression will be recorded by a LRU data structure, 
  and the 10 expression will be displayed to the right of the calculator, ordered by execution timestamp
  the most recently one will be on the top.
  
6 By clicking the recorded expressions on the right, the expression will be typed in the display box again,
  user can modify the expression, and do the calculation again
  
7 Cookie is used to keep the recorded expressions for up to an hour after the browser is closed. So when user refresh
 the calculator or restart the browser,  the recorded expression won't be lost.
  
  
All the above features have been tested on Chrome and Internet Explorer, for other browsers, the above features have been fully
tested yet.
  
