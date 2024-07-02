import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../core/socket.service';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, InputTextModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: any[] = [];
  name: string = '';
  message: string = '';
  esconderLogin: boolean = false;
  userCount: number = 0;
  connectedUsers: string[] = [];

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.onMessage().subscribe((message) => {
      this.messages.push(message);
    });

    this.socketService.onUserCount().subscribe((data) => {
      this.userCount = data.count;
      this.connectedUsers = data.users;
    });
  }

  entrar() {
    console.log('Função entrar() chamada');
    console.log('Nome:', this.name);

    this.socketService.requestName().subscribe(() => {
      console.log('Solicitação de nome concluída');
      if (this.name) {
        this.socketService.sendName(this.name);
        this.esconderLogin = true;
      } else {
        console.log('Nome não definido');
      }
    });
  }

  sendMessage() {
    if (this.message.trim()) {
      this.socketService.sendMessage({ text: this.message, sender: this.name });
      this.message = '';
    }
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }


  criaIcone(elemento: string) {
    if (elemento) {
      const primeiraLetra = elemento.charAt(0).toUpperCase();
      let segundaLetra = '';
      if (elemento.indexOf(' ') !== -1) {
        segundaLetra = elemento.split(' ')[1].charAt(0);
      } else {
        segundaLetra = elemento.charAt(1);
      }

      return `${primeiraLetra}${segundaLetra.toUpperCase()}`;
    } else {
      return '';
    }
  }
}
