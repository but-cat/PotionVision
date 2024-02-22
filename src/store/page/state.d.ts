import TabItem from "./tabItem";

export default interface PageState {

	
	tabSet: Map<string, TabItem>,
	tabList: string[],
	activeTab: string,
}