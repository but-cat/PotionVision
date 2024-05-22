<template>
	<div class="w-full h-full bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 flex overflow-hidden text-sm">
		
		
		<div class="flex-1 overflow-hidden">
			<!-- <Nodelist/> -->
			<NodeViews class="flex-1"/>
		</div>
		
		<NodeEditor ref="NodeView" class="flex-1"/>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, computed, getCurrentInstance, onMounted } from 'vue';
// import { MyButton } from '@libs/butui/index';

import { useRouter, useRoute } from "vue-router";
import { useStore } from 'vuex';
// import md from "md";
import { XMLDoc } from "../store/edit/core";


import Nodelist from './Nodelist/index.vue';
import NodeEditor from './NodeEditor/index.vue';
import NodeViews from './NodeView/index.vue';

const route = useRoute();
const router = useRouter();
const store = useStore();

onMounted(async () => {
	// console.log("xmlDoc: ", xmlDoc.value);
 

	// const rssLink = (new URLSearchParams(location.search)).get('url');
	const rssLink = location.search.replace(/\?url=/, '');
	if (!rssLink) return;

	const res = await fetch(rssLink);
	const xmlStringRow = await res.text();

	console.log("xmlDoc: ", xmlStringRow);

	store.commit(`edit/initXmlDoc`, new XMLDoc(store));

	store.commit(`edit/parser`, xmlStringRow);
	
})
</script>


<style lang="less" scoped>


.btn {
	display: inline-block;
	width: 24px;
	height: 24px;
	color: #fff;
	cursor: pointer;
	-webkit-app-region: no-drag;
	transition: color 0.2s;
	margin-left: -5px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	fill: currentColor;
	padding: 5px;

	// opacity: 0;
	// position: absolute;
	// top: -15px;
	// right: -15px;

	color: rgb(235, 84, 84);
	background-color: #fff;

	&.home:hover {
		color: rgb(84, 235, 223);
		// background-color: rgba(255, 255, 255, 0.3);
	}

	&[disabled='disabled'] {
		color: #ccc;
		cursor: not-allowed;

		&:hover {
			color: #ccc;
			background-color: transparent;
		}
	}
}
</style>