import { ref, reactive, toRefs, computed, watch, onMounted, getCurrentInstance } from 'vue';
import PrototypeView from './prototype';





export default class ToolsView extends PrototypeView {


	public readonly type = "tools"

	// constructor(readonly url: string) {
	// 	super();
	// }

	init() {
		super.init();
	}

	
	
}

customElements.define('tools-view', ToolsView);
