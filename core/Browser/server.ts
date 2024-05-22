import EventTarget from 'events';
import finalhandler from "finalhandler";
import serveStatic from 'serve-static';
import http from 'http';

export default class GameServer extends EventTarget {


    server: http.Server;

	constructor({ rootPath, port, cors }) {
		super();

		const serve = serveStatic(rootPath, { index: ['index.html', 'index.htm'] });

		// Create server
		const server = http.createServer(function onRequest(req, res) {
			serve(req, res, finalhandler(req, res));
		});


        server.listen(port);

        this.server = server;

        console.log(`Server running at http://localhost:${port}/`, rootPath);

        setTimeout(() => {
            console.log(`Server running at http://localhost:${port}/`);
            this.emit('ready');
        });
        
	}




    close() {
        this.server.close();
    }
}
