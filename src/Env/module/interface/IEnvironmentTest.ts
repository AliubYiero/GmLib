/**
 * 输出脚本安装环境
 *
 * @warn 需要授权函数 `GM_info`
 */
declare const environmentTest: () => IEnvironment;

export type IEnvironment = 'ScriptCat' | 'Tampermonkey';
