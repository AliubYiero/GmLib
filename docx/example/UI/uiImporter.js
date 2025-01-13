/**
 * uiImporter.js
 * created by 2025/1/13
 * @file 示例
 * */
import { uiImporter } from '@yiero/gmlib';
// @ts-ignore
import ui from './ui.html?raw';
// @ts-ignore
import css from './style.css?raw';

/* ./ui.html */
const htmlContent = `
<!doctype html>
<html lang="zh-cn">
<head>
	<meta charset="UTF-8">
	<title>Title</title>
	<link rel="stylesheet" href="./style.css">
</head>
<body>
<dialog open class="dialog-container">
	<span class="dialog-content">Show Command</span>
</dialog>
<script src="./script.js"></script>
</body>
</html>
`;
// 等同于
const htmlClearContent = `
<dialog open class="dialog-container">
	<span class="dialog-content">Show Command</span>
</dialog>
`;

/* ./style.css */
const cssContent = `
.dialog-container {
	background-color: #ccc;
	border-radius: 10px;
}

.dialog-content {
	color: #444;
}
`;
const { appendNodeList, styleNode } = uiImporter( htmlContent, cssContent );
console.log( 'html元素列表:', appendNodeList );
console.log( 'css元素:', styleNode );

uiImporter( ui, css );
