$('body').on('window', function(e, opts) {
	$('<div/>').attr({
		class: 'frame'
	}).css({
		height: opts.flex ? opts.height || 800 : undefined,
		width: opts.flex ? opts.width || 600 : undefined,
		flex: opts.fullscreen ? opts.flex : undefined,
		top: opts.fullscreen ? 0 : opts.top,
		left: opts.fullscreen ? 0 : opts.left
	}).appendTo('body')
})

//TODO

$('body').on('dragstart', function(e) {
	console.log('ds')
	$('#drag').attr({
		top: e.mouseTop,
		left: e.mouseLeft,
		height: 0,
		width: 0
	})
	$('#drag').show()
})

$('body').on('dragmove', function(e) {
	console.log('dm')
	$drag = $('#drag')
	$drag.attr({
		height: e.mouseTop - $drag.attr('top'),
		width: e.mouseLeft - $drag.attr('left'),
	})
})

$('body').on('dragstop', function(e) {
	console.log('de')
	$('#drag').hide()
})