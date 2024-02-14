<template>
	<div class="folder text-primary-600">
		<div class="container">
			<div class="wrap">
				<div class="base"></div>
				<div class="cover text-primary-400"></div>
				<div class="file one"></div>
				<div class="file two"></div>
				<div class="file three"></div>
			</div>
		</div>
	</div>
</template>
	
<script setup lang="ts">
import { defineComponent, getCurrentInstance, computed } from 'vue';


</script>
	
<style lang="less" scoped>
.folder {
	// --theme: #46d690;
	// --theme2: #35ad73;

	width: 100px;
	position: relative;
	transition: transform .4s, box-shadow .4s;
	transform: translateY(0);
	box-shadow: 0 12px 5px -5px rgba(0, 0, 0, .1);
	border-radius: 7px;

	&:before {
		content: "";
		width: 32.5%;
		height: .375rem;
		background-color: currentColor;
		display: block;
		border-radius: 7px 0 0;
	}

	&:after {
		content: "";
		height: 0;
		width: 0;
		position: absolute;
		left: 32.5%;
		top: 0;
		border-style: solid;
		border-color: transparent transparent currentColor currentColor;
		border-width: 0.25rem;
	}

	.container {
		width: 100%;
		height: 0;
		padding-bottom: 72.5%;
		position: relative;

		.wrap {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			width: 100%;
			height: 100%;

			.base {
				background-color: currentColor;
				border-radius: 0 7px 7px 7px;
				height: 100%;
				width: 100%;
			}

			.cover {
				width: 100%;
				height: 90%;
				background-color: currentColor;
				position: absolute;
				z-index: 5;
				bottom: -2px;
				left: 0;
				right: 0;
				border-radius: 7px;
				transform-origin: bottom;
				transform: perspective(40em) rotateX(0);
				transition: transform .4s ease;
			}

			.file {
				width: 90%;
				height: 60%;
				margin: 0 auto;
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				background-color: #fff;
				border-radius: 3px;
				transform: translateY(0);

				&.one {
					background-color: #e5e5e5;
					width: 80%;
					transition: transform .3s ease .2s;
					transform: translateY(-55%);
				}

				&.two {
					width: 85%;
					background-color: #f1f1f1;
					transition: transform .3s ease .3s;
				}

				&.three {
					background-color: #fff;
					transition: transform .3s ease .4s;
				}
			}
		}
	}

	&:hover {
		transform: translateY(-10px);
		box-shadow: 0 18px 30px -5px rgba(0, 0, 0, .25);

		.wrap {
			.cover {
				transform: perspective(40em) rotateX(-50deg);
			}

			.file {
				&.one {
					transform: translateY(-50%);
				}

				&.two {
					transform: translateY(-35%);
				}

				&.three {
					transform: translateY(-20%);
				}
			}
		}
	}
}
</style>