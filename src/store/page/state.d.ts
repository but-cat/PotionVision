// import WebView from "./webView";
// import { CoreView, WebView } from "./webView/index";
import { CoreView, WebView, ToolsView, PageView } from "./webView/index";


export default interface PageState {

	
	tabSet: Map<string, PageView>,
	tabList: string[],
	activeTab: string,
}