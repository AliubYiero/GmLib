const { readdirSync, writeFileSync } = require( 'fs' );
const { join } = require( 'path' );

const descMapper = {
	// API
	getCookie: '获取对应网站 Cookie',
	gmRequest: '通过 `GM_xmlhttpRequest` 发送网络请求 (Promise).',
	hookXhr: '用于劫持 xhr 请求, 获取其返回内容, 并篡改返回内容',
	gmDownload: '下载文件到本地',
	// Element
	scroll: '页面滚动到指定位置',
	elementWaiter: '等待元素加载完成',
	uiImporter: '传入 `html` 文本和 `css` 文本, 自动解析并载入页面',
	Message: '消息通知',
	// Env
	isIframe: '判断当前页面是否在 iframe 中',
	environmentTest: '输出当前脚本的安装环境 (`ScriptCat` / `TamperMonkey`)',
	// Storage
	GmStorage: '管理油猴存储',
	GmArrayStorage: '管理油猴数组存储, `GmStorage` 的子类',
};

/**
 * 创建文档树结构
 */
const createDocxTree = () => {
	const dirList = readdirSync( join( __dirname, '../docx' ) ).filter( ( dirname ) => ![ 'UpdateLog.md', 'example' ].includes( dirname ) );
	
	const tree = dirList.map( dirname => {
		const fileList = readdirSync( join( __dirname, '../docx', dirname ) );
		const desc = fileList.map( ( filename ) => {
			const path = join( './docx', dirname, filename ).replace( /\\/g, '/' );
			const filenameWithoutExt = filename.replace( '.md', '' );
			return `\t- [\`${ filenameWithoutExt }\`](${ path }): ${ descMapper[filenameWithoutExt] || '' }`;
		} ).join( '\n' );
		
		return `- **${ dirname }**\n${ desc }`;
	} ).join( '\n' );
	
	return `# 油猴辅助函数库

> 一系列辅助油猴脚本开发的函数.

## 函数库

${ tree }`;
};

/**
 * 更新 README.md 文件
 */
const updateReadme = () => {
	const readme = createDocxTree();
	
	writeFileSync( join( __dirname, '../README.md' ), readme );
	
	console.log( 'README.md 更新成功' );
};

updateReadme();
