export type DownloadRequest =
	Omit<Tampermonkey.DownloadRequest, 'url' | 'name' | 'onerror' | 'onprogress'>
	& {
	onerror?: ( error: Tampermonkey.DownloadErrorResponse ) => void;
	onprogress?: ( response: Tampermonkey.DownloadProgressResponse, abortHandle: Tampermonkey.AbortHandle<boolean> ) => void;
}

/**
 * 下载文件
 *
 * @param url 下载地址
 * @param filename 文件名
 * @param details GM_download details 配置对象参数
 *
 * @returns Promise
 */
const gmDownload = (
	url: string,
	filename: string,
	details: DownloadRequest = {},
): Promise<boolean> => {
	return new Promise( ( resolve, reject ) => {
		const abortHandle = GM_download( {
			url: url,
			name: filename,
			...details,
			onload() {
				details.onload && details.onload();
				resolve( true );
			},
			onerror( err ) {
				details.onerror && details.onerror( err );
				reject( err.error );
			},
			ontimeout() {
				details.ontimeout && details.ontimeout();
				reject( 'time_out' );
			},
			onprogress( response ) {
				details.onprogress && details.onprogress( response, abortHandle );
			},
		} );
	} );
};

/**
 * 下载 Blob 文件
 *
 * @param blob 文件
 * @param filename 文件名
 * @param details GM_download details 配置对象参数
 *
 * @returns Promise
 */
gmDownload.blob = async (
	blob: Blob | File,
	filename: string,
	details: DownloadRequest = {},
): Promise<boolean> => {
	const url = URL.createObjectURL( blob );
	return gmDownload( url, filename, details ).then( res => {
		URL.revokeObjectURL( url );
		return res;
	} );
};

/**
 * 下载文本文件
 *
 * @param content 文件内容
 * @param filename 文件名
 * @param [mimeType = 'text/plain'] 文件类型
 * @param details GM_download details 配置对象参数
 *
 * @returns Promise
 */
gmDownload.text = (
	content: string,
	filename: string,
	mimeType: string = 'text/plain',
	details: DownloadRequest = {},
): Promise<boolean> => {
	const blob = new Blob( [ content ], { type: mimeType } );
	return gmDownload.blob( blob, filename, details );
};

export {
	gmDownload,
};
