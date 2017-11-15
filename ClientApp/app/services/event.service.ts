import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EventService {
    private emitters: Emitter[] = [];

    on(key: string, func: Function) {
        let emitter = this.getEmitter(key);
        if (!emitter) {
            emitter = new Emitter(key);
        }

        emitter.subscribe(func);
        this.emitters.push(emitter);
    }

    emit(key: string, object: any) {
        const emitter = this.getEmitter(key);
        if (emitter) {
            emitter.emit(object);
        }
    }

    private getEmitter(key: string): any {
        if (!this.emitters) return false;
        const emitters = this.emitters.filter((e) => {
            return e.getKey() === key;
        });

        if (emitters.length === 0) {
            return false;
        }

        return emitters[0];
    }
}

export class Emitter {
    private key: string;
    private emitter: EventEmitter<any>;

    constructor(key: string) {
        this.key = key;
        this.emitter = new EventEmitter();
    }

    public subscribe(func: Function) {
        this.emitter.subscribe(func);
    }

    public unsubscribe() {
        this.emitter.unsubscribe();
    }

    public emit(object: any) {
        this.emitter.emit(object);
    }

    public getKey(): string {
        return this.key;
    }
}