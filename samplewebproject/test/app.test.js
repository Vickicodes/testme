const assert = require('assert');

it('has a text input', async () => {
	const dom = await render('index.html');

	const input = dom.window.document.querySelector('input');

	assert(input);
});

it('shows a success message with a valid email', async () => {
	const dom = await render('index.html');

	const input = dom.window.document.querySelector('input');

	input.value = 'hello@hello.com';

	dom.window.document.querySelector('form').dispatchEvent(new dom.window.Event('submit'));

	const p = dom.window.document.querySelector('p');

	assert.strictEqual(p.innerHTML, 'Looks Good!');
});

it('shows a fail message with an invalid email', async () => {
	const dom = await render('index.html');

	const input = dom.window.document.querySelector('input');

	input.value = 'hello.com';

	dom.window.document.querySelector('form').dispatchEvent(new dom.window.Event('submit'));

	const p = dom.window.document.querySelector('p');

	assert.strictEqual(p.innerHTML, 'Invalid Email');
});
