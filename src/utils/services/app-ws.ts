import WebSocket from 'ws';

class SocketFactory {
    public wss: any;

    public static instance: SocketFactory;

    constructor(server: any) {
        if (!!SocketFactory.instance) {
            return SocketFactory.instance;
        }
        SocketFactory.instance = this;
        this.wss = new WebSocket.Server({ server: server });
        return this;
    }

    public onError(ws: any, err: any): void {
        console.error(`onError: ${err.message}`);
    }

    public onMessage(ws: any, data: any): void {
        console.log(`onMessage: ${data}`);
        ws.send(`recebido!`);
    }

    public onConnection(): void {
        SocketFactory.instance.wss.on('connection', (ws: any, req: any) => {
            ws.send(
                `Welcome New Client! IP: ${req.socket.remoteAddress}`,
                req.socket.remoteAddress,
            );

            ws.on('message', (message: any) => {
                const clients = SocketFactory.instance.wss.clients;
                clients.forEach(function each(client: any) {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(
                            req.socket.remoteAddress +
                                '=>' +
                                message.toString('utf8'),
                        );
                    }
                });
            });
        });
    }
}

export default SocketFactory;
