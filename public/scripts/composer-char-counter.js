$(document).ready(function() {
  let maxChar = 140;
  $('textarea').keyup(function() {
    let lengthInput = $(this).val().length;
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
        .addClass('negative');
    }
    if (lengthLeft >= 0) {
      $(this)
        .parent()
        .children('.counter')
        .removeClass('negative');
    }
  });
});
