

export interface TellActiveItem {

	bittorrent: {												// Struct，其中包含从.torrent检索到的信息 （文件）。仅限 BitTorrent。它包含以下键。
		announceList: string[];									// 服务器列表
		creationDate: number;									// 创建时间
		verifiedLength: number;									// 文件正在验证的字节数 哈希检查。仅当正在下载此密钥时，此密钥才存在 哈希检查。
		verifyIntegrityPending: boolean;						// 是否正在验证文件
		info: {
			name: string;
		},


	};
	infoHash: string;											// 文件的哈希值 - 仅限 BitTorrent。
	
	status: 'active' | 'waiting' | 'paused' | 'error' | 'complete' | 'removed';// 状态
	dir: string;												// 保存到的文件夹
	numPieces: number;											// 文件的数量

	completedLength: number;									// 已完成大小
	totalLength: number;										// 总大小
	downloadSpeed: number;										// 下载速度
	uploadSpeed: number;										// 上传速度

	connections: number;										// 连接数
	numSeeders: number;											// 种子数
	seeder: boolean;											// 是否是种子


	files: {
		index: number;											// 文件索引
		path: string;											// 文件路径
		length: number;											// 文件大小
		completedLength: number;								// 已完成大小 此文件的完整长度（以字节为单位）。
		selected: boolean;										// 是否选择此文件
		uris: {
			uri: string;										// URI
			status: string;										// 状态
		}[];
	}[];
}