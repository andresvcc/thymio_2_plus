import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 23.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 1024 1024" style="enable-background:new 0 0 1024 1024;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F0841F;}
	.st1{fill:#D1721B;}
	.st2{fill:#2292D1;}
</style>
<rect x="251.6" y="2" class="st0" fill="#F0841F" width="772.06" height="764.03"/>
<rect x="251.6" y="212.3" class="st1" fill="#D1721B" width="571.3" height="553.73"/>
<rect x="0.52" y="258.97" class="st2" fill="#2292D1" width="772.06" height="764.03"/>
</svg>
`;

export default () => <SvgXml xml={xml} width={40} height={40} />;
