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
export const gmDownload = (
	url: string,
	filename: string,
	details: DownloadRequest = {},
) => {
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
