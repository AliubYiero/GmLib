/**
 * environmentTest.js
 * created by 2024/12/28
 * @file 示例
 * */
import { environmentTest } from '@yiero/gmlib';

// 脚本猫 (ScriptCat) 环境
environmentTest();      // -> 'ScriptCat'
// 篡改猴 (TamperMonkey) 环境
environmentTest();      // -> 'TamperMonkey'

/**
 * TamperMonkey 环境执行函数
 */
const handleForTampermonkey = () => {};
/**
 * ScriptCat 环境执行函数
 */
const handleForScriptcat = () => {};
/**
 * 环境判断映射
 */
const handleMapper = {
	'ScriptCat': handleForScriptcat,
	'TamperMonkey': handleForTampermonkey,
};
// 获取脚本安装环境
const environment = environmentTest();
// 运行对应函数
handleMapper[environment]();
