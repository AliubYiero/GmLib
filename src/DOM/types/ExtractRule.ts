/**
 * 支持提取的数据类型
 */
export type ExtractType = 'string' | 'number' | 'boolean' | 'url' | 'element';

/**
 * 提取规则配置项
 */
export interface ExtractRule {
    /**
     * 返回数据对象的键名
     */
    key: string;

    /**
     * CSS 选择器
     */
    selector: string;

    /**
     * 预期转换的数据类型
     *
     * @default 'string'
     */
    type?: ExtractType;

    /**
     * 属性获取策略（优先级高于自动推断）
     *
     * - 传入字符串：获取指定属性
     * - 传入数组：按顺序查找，返回第一个非 null 的属性值（Fallback 兼容机制）
     */
    attribute?: string | string[];

    /**
     * 提取失败时的兜底值
     *
     * @default null
     */
    defaultValue?: any;
}

/**
 * 提取结果类型
 */
export type ExtractedResult<T extends ExtractRule> = {
    [K in T['key']]: any;
};
