function uploadButtonClick(){
    var password_input = document.getElementById('password');
	var password = password_input.value;

    password_input.value = sha256.hex(password);
	document.uploadForm.submit();
}