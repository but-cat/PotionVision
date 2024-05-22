export default class appReady extends Event {

    app: any;

    router: any;

    store: any;

    constructor(appConfig: any) {
        super('app-ready');


        this.app = appConfig.app;
        this.router = appConfig.router;
        this.store = appConfig.store;
    }
}