import {v4 as uuidv4} from 'uuid';

interface Callback<T> {
    (res: T): void;
}

interface Packet<T> {
    id: string
    cmd: string
    arg: T
    error?: string
}

interface Context {
    request: Packet<any>
    cb: Callback<any>
    onerror?: Callback<Error>
}

class Socket {
    ws: WebSocket;
    handlers: Map<string, Context>
    onOpen?: () => void
    onClose?: () => void

    constructor(url: string) {
        this.handlers = new Map<string, Context>();
        this.ws = this.newWebSocket(url);
    }

    newWebSocket(url: string) {
        let ws = new WebSocket(url)
        ws.onopen = () => {
            console.log('[WebSocket] Open');
            if (this.onOpen !== undefined) {
                this.onOpen();
            }
        };
        ws.onclose = () => {
            console.log('[WebSocket] Closed');
            setTimeout(() => {
                this.ws = this.newWebSocket(url);
            }, 1000);
            if (this.onClose !== undefined) {
                this.onClose();
            }
        };
        ws.onerror = (e) => {
            console.log('[WebSocket] Error', e);
        };

        ws.onmessage = (message: any) => {
            let packet: Packet<any> = JSON.parse(message.data);
            let ctx = this.handlers.get(packet.id);
            if (ctx !== undefined) {
                if (packet.error === undefined) {
                    ctx.cb(packet.arg);
                    this.handlers.delete(packet.id);
                } else {
                    console.log('[WebSocket] Request Error:', packet)
                    if (ctx.onerror !== undefined) {
                        ctx.onerror(new Error(packet.error))
                    }
                }
            }
        };
        return ws
    }

    sendAsync<Req, Res>(cmd: string, req: Req, cb: Callback<Res>, onerror?: Callback<Error>) {
        if (this.ws.readyState !== WebSocket.OPEN) {
            setTimeout(() => {
                this.sendAsync(cmd, req, cb, onerror)
            }, this.ws.readyState === WebSocket.CONNECTING ? 10 : 1000);
            return
        }

        let packet: Packet<Req> = {
            id: uuidv4(),
            cmd: cmd,
            arg: req,
        }
        this.handlers.set(packet.id, {
            request: packet,
            cb: cb,
            onerror: onerror,
        });
        this.ws.send(JSON.stringify(packet));
    }
}

export default Socket