document.querySelector('form').addEventListener('submit', (event) => {
	event.preventDefault();

	const { value } = document.querySelector('input');

	const para = document.querySelector('p');
	if (value.includes('@')) {
		para.innerHTML = 'Looks Good!';
	} else {
		para.innerHTML = 'Invalid Email';
	}
});
