/*
	Copyright 2018-2021 ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE,
	Miniature Mobile Robots group, Switzerland
	Author: Yves Piguet

	Licensed under the 3-Clause BSD License;
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at
	https://opensource.org/licenses/BSD-3-Clause
*/

/** @fileoverview

Support for file input: VPL3 program files (aesl or json), and image
files for the simulator (native image format handled by the browser,
or SVG for the obstacle map).

*/

/** Load a json program file
	@param {string} json program file content
	@param {A3a.vpl.Program.ImportOptions=} options
	@return {void}
*/
A3a.vpl.Application.prototype.loadProgramJSON = function (json, options) {
	try {
		this.program.importFromJSON(json, function (view) {
			if (this.views.indexOf(view) < 0) {
				if (this.views.length === 1) {
					this.setView([view]);
				} else {
					// switch vpl to src or src to vpl
					var views = this.views.slice();
					views[views.indexOf("vpl") >= 0 ? views.indexOf("vpl")
						: views.indexOf("src") >= 0 ? views.indexOf("src")
						: 0] = view;
					this.setView(views);
				}
			}
			this.programNotUploadedToServerYet = true;
			this.setHelpForCurrentAppState();
			if (this.views.indexOf("vpl") >= 0) {
				this.vplCanvas.onUpdate();
			}
		}, options);
	} catch (e) {}
};

/** Get the suffix (without dot) of a filename
	@param {string} filename
	@return {string}
*/
A3a.vpl.Application.getFileSuffix = function (filename) {
	return /(\.[^.]*|)$/.exec(filename)[0].slice(1).toLowerCase();
};

/** Load a program file (aesl, vpl3 (json) or zip bundle)
	@param {File} file
	@return {boolean} true if file suffix was recognized as a program
*/
A3a.vpl.Application.prototype.loadProgramFile = function (file) {
	var app = this;
		var data = JSON.stringify(file);
		var filename = 'test';
		var dontChangeProgram = false;
		if (data.trim()[0] === "<") {
			// aesl (xml)
			app.program.importFromAESLFile(data);
		} else {
			// json
			app.loadProgramJSON(data, {dontChangeProgram: false});
		}
		if (!dontChangeProgram) {
			app.program.filename = filename;
		}
		app.vplCanvas.onUpdate();
		app.program.saveStateAfterChange();
	return true;
};

/** Load an image file (svg, png, jpg or gif) into the simulator
	@param {File} file
	@return {boolean} true if file suffix was recognized as an image
*/
A3a.vpl.Application.prototype.loadImageFile = function (file) {
	var r = /^[^.]+\.(.*)$/.exec(file.name);
	var ext = r ? r[1] : "";
	var reader = new window.FileReader();
	switch (ext.toLowerCase()) {
	case "svg":
	case "png":
	case "jpg":
	case "gif":
		var app = this;
		if (this.sim2d) {
			if (this.sim2d.wantsSVG()) {
				reader.onload = function (event) {
					var data = event.target.result;
					app.setSVG(data);
				};
				reader["readAsText"](file);
			} else {
				reader.onload = function (event) {
					var data = event.target.result;
					var img = new Image();
					img.addEventListener("load", function () {
						app.setImage(img);
					});
					img.src = data;
				};
				reader["readAsDataURL"](file);
			}
		}
		return true;
	}

	return false;
};

/** Load an audio file (wav) into the simulator
	@param {File} file
	@return {boolean} true if file suffix was recognized as an audio file
*/
A3a.vpl.Application.prototype.loadAudioFile = function (file) {
	var r = /^[^.]+\.(.*)$/.exec(file.name);
	var ext = r ? r[1] : "";
	var reader = new window.FileReader();
	switch (ext.toLowerCase()) {
	case "wav":
		var app = this;
		if (this.sim2d) {
			reader.onload = function (event) {
				var data = event.target.result;
				app.setAudio(file.name, data);
			};
			reader["readAsArrayBuffer"](file);
		}
		return true;
	}

	return false;
};
