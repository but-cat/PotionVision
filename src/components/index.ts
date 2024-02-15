
import oInput from "@/components/form/o_input.vue";
import oTextarea from "@/components/form/o_textarea.vue";
import oNumber from "@/components/form/o_number.vue";
import oRange from "@/components/form/o_range.vue";
import oColor from "@/components/form/o_color/index.vue";
import oSwitch from "@/components/form/o_switch.vue";
import oSelect from "@/components/form/o_select/select.vue";
import selectCard from "@/components/form/o_select/selectCard.vue";
import oSelectOption from "@/components/form/o_select/option.vue";
import oUpImage from "@/components/form/o_upImage.vue";
import oCheckbox from "@/components/form/o_checkbox.vue";


import oModal from "@/components/modal/index.vue";
import oModalBlock from "@/components/modal/modal.vue";
import oModalPopup from "@/components/modal/popup.vue";
import oContextMenu from "@/components/modal/contextmenu.vue";



// 控件类
import oPagination from "@/components/pagination/index.vue";
import oSteps from "@/components/steps/index.vue";

import oSashX from "./sash/sashX.vue";
import oSashY from "./sash/sashY.vue";


// 动画特效类
import eCollapse from "@/components/effects/e_collapse.vue";


import getCode from "@/components/getCode/index.vue";





import oBreadcrumbs from "@/components/Breadcrumbs/index.vue";
import oYamlForm from "@/components/yamlForm/index.vue";																// yaml表单

import HighlightJs from "@/components/code/index.vue";
// import monaco from "@/components/monaco/index.vue";



import FileIcon from "@/components/icoBar/file_ico.vue";
import FolderIcon from "@/components/icoBar/folder_ico.vue";
import oFolder from "@/components/icoBar/folder.vue";

const components = {
	oInput,
	oTextarea,
	oNumber,
	oRange,
	oColor,
	oSwitch,


	oSelect,
	selectCard,
	oSelectOption,
	oCheckbox,

	eCollapse,

	oModal,
	oModalBlock,
	oModalPopup,
	oContextMenu,
	// oUpImage,



	oPagination,
	oSteps,
	oSashX,
	oSashY,

	oFolder,
	oBreadcrumbs,
	oYamlForm,


	getCode,

	// 代码
	HighlightJs,
	// monaco,


	FileIcon,
	FolderIcon,
}

export default {
	install: (app: any) => {
		Object.entries(components).forEach(([key, component]) => {
			app.component(component.name ?? key, component);
		});
	}
};