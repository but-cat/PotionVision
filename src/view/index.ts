
import NPlayer from "@/view/player/index.vue";

const components = {
	NPlayer
}

export default {
	install: (app: any) => {
		Object.entries(components).forEach(([key, component]) => {
			app.component(component.name ?? key, component);
		});
	}
};