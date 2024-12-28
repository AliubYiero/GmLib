import { IEnvironment } from './interface/IEnvironmentTest.ts';

/**
 * 输出脚本的安装环境
 */
export const environmentTest = (): IEnvironment => {
	return GM_info.scriptHandler as IEnvironment;
};
