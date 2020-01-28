$(document).ready(function() {
  let maxChar = 140;
  $('textarea').keypress(function() {
    let lengthInput = $(this).val().length + 1;
    let lengthLeft = maxChar - lengthInput;

    //traverses the DOM from 'this' up to this' parent, then searches the children for
    //a child with class '.counter', then inputs the value of lengthLeft into the text field.
    $(this)
      .parent()
      .children('.counter')
      .text(lengthLeft);

    if (lengthLeft < 0) {
      $(this)
        .parent()
        .children('.counter')
        .removeClass('counter')
        .addClass('negative');
      // .css('color', 'red'); //we don't want css in our js files.
    }
  });
});
