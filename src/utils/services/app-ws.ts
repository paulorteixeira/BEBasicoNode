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
            ws.id = Math.floor(Math.random() * Date.now() * 100000); //

            function welcome(ip: string, id: string): string {
                let m = {
                    message: 'Welcome New Client!',
                    id: id,
                    ip: ip,
                };
                return JSON.stringify(m);
            }
            ws.send(
                welcome(req.socket.remoteAddress, ws.id),
                req.socket.remoteAddress,
            );

            ws.on('message', (message: any) => {
                const clients = SocketFactory.instance.wss.clients;
                clients.forEach(function each(client: any) {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        let dat = JSON.parse(message);
                        let op = {
                            sender_id: dat.sender_id,
                            reciver_id: dat.reciver_id,
                            message: dat.message,
                        };
                        // console.log(client.id, op, dat);
                        if (client.id == op.reciver_id) {
                            client.send(JSON.stringify(op));
                            // client.send(
                            //     req.socket.remoteAddress +
                            //         '=>' +
                            //         message.toString('utf8'),
                            // );
                        }
                    }
                });
            });
        });
    }
}

export default SocketFactory;
