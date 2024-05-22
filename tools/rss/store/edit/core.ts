import { defineComponent, reactive, ref, getCurrentInstance, onMounted } from 'vue';

interface NodeItem {
	identifier: string; // 唯一标识
	name: string; // 名称
	description: string; // 描述
	element: Element;
}

export class XMLDoc extends MutationObserver {
	xmlString = ref('233');

	static parser = new DOMParser();

	document = ref<Document>();


	activeItem = ref<NodeItem>();
	activeElement = ref<Element>();

	constructor(readonly store: any) {
		super((mutationList: MutationRecord[], observer) => {
            mutationList.forEach((mutation) => {
                type MutationType = 'childList' | 'attributes' | 'subtree' | 'attributeOldValue' | 'characterDataOldValue';
                this[mutation.type as MutationType](mutation);
            });

			this.store.commit('edit/updateDocument');
        });
	}

	callback(mutationList: MutationRecord[], observer: MutationObserver) {
		mutationList.forEach((mutation) => {
			type MutationType = 'childList' | 'attributes' | 'subtree' | 'attributeOldValue' | 'characterDataOldValue';
			this[mutation.type as MutationType](mutation);
		});
	}

	parser(xmlString: string) {
		this.xmlString.value = xmlString;
		this.document.value = XMLDoc.parser.parseFromString(xmlString, 'text/xml');
		// this.nodeList.value = Array.from(this.document.value.querySelectorAll('*'));

		this.observe(this.document.value.documentElement, {
			childList: true,
			attributes: true,
			subtree: true,
			attributeOldValue: true,
			characterDataOldValue: true,
			// attributeFilter: ['style'],
		});

		return this.document.value;
	}

	setActiveItem(item: NodeItem) {
		this.activeElement.value = item.element;
		this.activeItem.value = item;
	}
	setActiveElement(item: Element) {
		this.activeElement.value = item;
	}

	/* 从树上添加或移除一个或更多的子节点；参见 mutation.addedNodes 与 mutation.removedNodes */
	childList(mutation: MutationRecord) {}

	/* mutation.target 中某节点的一个属性值被更改；该属性名称在 mutation.attributeName 中， 该属性之前的值为 mutation.oldValue */
	attributes(mutation: MutationRecord) {}

	subtree(mutation: MutationRecord) {}

	attributeOldValue(mutation: MutationRecord) {}

	characterDataOldValue(mutation: MutationRecord) {}

	attributeFilter(mutation: MutationRecord) {}
}
