export function typeColor(stage: string) {
	return {
		vec2: 'bg-purple-100 text-purple-500',													// 功能不完整的版本
		vec3: 'bg-blue-100 text-blue-500',												// 发布候选版本
		vec4: 'bg-green-100 text-green-500',														// 稳定版本
		number: 'bg-yellow-100 text-yellow-500',														// 公开测试
		boolean: 'bg-red-100 text-red-500',															// 内部测试
		Inactive: 'bg-gray-100 text-gray-500',														// 不再维护
	}[stage];
}