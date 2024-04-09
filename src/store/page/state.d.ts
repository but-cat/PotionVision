// import WebView from "./webView";
import { CoreView, WebView } from "./webView/index";

type PageView = CoreView | WebView;

export default interface PageState {

	
	tabSet: Map<string, PageView>,
	tabList: string[],
	activeTab: string,
}