import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://192.168.1.14:3000');
    this.socket.on('connect', () => {
      console.log('Conectado ao servidor de WebSocket');
    });
    this.socket.on('disconnect', () => {
      console.log('Desconectado do servidor de WebSocket');
    });
  }

  onMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message', (message) => {
        console.log('Mensagem recebida do servidor:', message);
        observer.next(message);
      });
    });
  }

  sendMessage(message: { text: string, sender: string }) {
    console.log('Enviando mensagem para o servidor:', message);
    this.socket.emit('send message', message);
  }

  requestName(): Observable<void> {
    return new Observable(observer => {
      this.socket.emit('request name');
      observer.next();
    });
  }

  sendName(name: string) {
    console.log('Enviando nome para o servidor:', name);
    this.socket.emit('name', name);
  }

  onUserCount(): Observable<{ count: number, users: string[] }> {
    return new Observable(observer => {
      this.socket.on('userCount', (data: { count: number, users: string[] }) => {
        observer.next(data);
      });
    });
  }

  disconnect() {
    console.log('Desconectando do servidor de WebSocket');
    this.socket.disconnect();
  }
}
