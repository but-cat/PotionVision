import TabItem from "./tabItem";

export default interface PageState {

	
	tabList: Map<string, TabItem>,
	activeTab: string,
}