var fs = require('fs'),
	path = require('path'),
	$ = require('jquery'),
	File = Object.freeze({
		FILE: 0,
		DIRECTORY: 1
	})

$(function(){
	var get = $.get
	$.get = function(url, data, callback, type){
		if(/^file:\/\/|^fs:|^[a-z~/]/i.test(url)) {
			if (callback = data instanceof Function ? data : callback) {
				var path = /^fs:/i.test(url) ? url.slice(3) : /^file:\/\//i.test(url) ? url.slice(7) : url
				return fs.access(path, function(err) {
					if (err) {
						console.log(err)
					} else {
						fs.stat(path, function(err, stats) {
							if (stats.isDirectory()) {
								fs.readdir(path, callback)
							} else {
								fs.readFile(path, callback)
							}
						})
					}
				})
			}
		} else {
			return get.apply(this, arguments)
		}
	}
	var post = $.post
	$.post = function(url, data, callback, type){
		if(/^file:\/\/|^fs:/i.test(url)) {
			return fs.access(path, fs.R_OK, function(err) {
				if (err) {
					console.log(err)
				} else {
					fs.writeFile(
						/^fs:/i.test(url) ? url.slice(3) : 
						/^file:\/\//i.test(url) ? url.slice(7) :
						url,
						data || '', data instanceof Function ? data : callback || $.noop
					)
				}
			})
		} else {
			return post.apply(this, arguments)
		}
	}
time = new Date();
$.get('fs:/home/somebody/node/Desktop.js', function(err, data){
	if (data instanceof Array) {
		console.log(data)
		console.log((new Date() - time)/1000);
	} else {
		console.log(data.toString())
	}
})
//TODO: expand paths
})
$.fn.extend({
	findUnescaped: function(string, char) {
		var indices = []
		for (var i = 0; i < string.length; i++)
			if (i === '\\')
				escaped = true
			else if (i === char) {
				indices.push(i)
				escaped = false
			} else
				escaped = false
		return indices
	},
	splitUnescaped: function(string, char) {
		var indices = findUnescaped(string, char),
			oldIndex = 0
		words = []
		for (var index in indices) {
			words.push(string.slice(oldIndex, index))
			oldIndex = ++index
		}
	},
	parseCmd: function(cmd) {
		var command = {},
		    words = $.findUnescaped(cmd, ' '),
		    currentOption = ''
		for(var word in words)
			//TODO: parse args
			if (arg[0] === arg[1] === '-') {
				var argument = word.slice(2)
				currentOption = argument
				returns[argument] = []
			} else if (arg[0] === '-') {
				var options = arg.slice(1)
				if (options.length == 1) {
					var argument = options[0].toString()
					currentOption = argument
					returns[argument] = []
				} else for(var option in options)
					returns[option] = true
			} else
				returns[currentOption].push(arg)
	},
	jsh: function(cmd) {
		var command = parseCmd(cmd)
	},
	install: function(cmd) {
		var command = parseCmd(cmd)
	},
	remove: function(cmd) {
		var command = parseCmd(cmd)
	}
})