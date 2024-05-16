import { Component, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  private hubConnection: HubConnection;
  public mensagens: string[] = [];
  public novaMensagem: string = "";

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
        .withUrl('http://localhost:7277/chat') // URL do seu hub
        .build();

    this.hubConnection.start()
        .then(() => console.log('Conectado ao hub'))
        .catch(err => console.error('Erro ao conectar ao hub', err));

    this.hubConnection.on('ReceberMensagem', (mensagem: string) => {
        console.log('Mensagem recebida do hub:', mensagem);
        this.mensagens.push(mensagem);
    });
}

enviarMensagem() {
    this.hubConnection.invoke('EnviarMensagem', this.novaMensagem)
        .catch(err => console.error('Erro ao enviar mensagem', err));
    this.novaMensagem = ""; // Limpa a caixa de texto após enviar a mensagem
}
}
