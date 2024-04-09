<template>
	<div class="loading-container">
		<div class="loading"></div>
	</div>
</template>

<style lang="less" scoped>
.loading-container {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	.loading {
		width: 80%;
		height: 80%;
		border: 2px solid var(--info);
		border-top-color: transparent;
		border-radius: 100%;

		animation: circle infinite 0.75s linear;
	}

	// 转转转动画
	@keyframes circle {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}
}
</style>