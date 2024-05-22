export function fileTypeColor(stage: string) {
	return {
		png: 'bg-purple-100 text-purple-500',													// 功能不完整的版本
		lua: 'bg-blue-100 text-blue-500',												// 发布候选版本
		xml: 'bg-green-100 text-green-500',														// 稳定版本
		ogg: 'bg-yellow-100 text-yellow-500',														// 公开测试
		sub: 'bg-red-100 text-red-500',															// 内部测试
		// Inactive: 'bg-gray-100 text-gray-500',														// 不再维护
	}[stage];
}