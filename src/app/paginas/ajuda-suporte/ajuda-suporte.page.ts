import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-ajuda-suporte',
  templateUrl: './ajuda-suporte.page.html',
  styleUrls: ['./ajuda-suporte.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AjudaSuportePage implements OnInit {

  faqs = [
    {
      question: 'Como adicionar uma nova transação?',
      answer: 'Para adicionar uma nova transação, clique no botão "+" no centro do menu inferior e escolha "Entrada" ou "Saída". Preencha os campos necessários e clique em "Salvar".',
      expanded: false
    },
    {
      question: 'Como criar uma meta financeira?',
      answer: 'Vá para a aba "Metas" no menu inferior, clique em "Nova Meta", defina o valor objetivo, prazo e categoria. O app irá acompanhar seu progresso automaticamente.',
      expanded: false
    },
    {
      question: 'Como exportar meus dados?',
      answer: 'Acesse "Configurações da Conta" > "Meus Dados" > "Exportar Dados". Você receberá um arquivo com todas suas informações financeiras.',
      expanded: false
    },
    {
      question: 'Como alterar a moeda padrão?',
      answer: 'Vá em "Configurações do App" > "Moeda e Formato" > "Moeda" e selecione a moeda desejada.',
      expanded: false
    },
    {
      question: 'Como ativar o backup automático?',
      answer: 'Em "Configurações do App" > "Backup e Sincronização", ative a opção "Backup Automático". Seus dados serão salvos na nuvem automaticamente.',
      expanded: false
    }
  ];

  supportMessage = {
    type: 'feedback',
    subject: '',
    message: '',
    email: ''
  };

  constructor() { }

  ngOnInit() {
  }

  toggleFaq(index: number) {
    this.faqs[index].expanded = !this.faqs[index].expanded;
  }

  enviarSuporte() {
    console.log('Mensagem de suporte enviada:', this.supportMessage);
    // Aqui implementaria a lógica para enviar a mensagem
    
    // Reset form
    this.supportMessage = {
      type: 'feedback',
      subject: '',
      message: '',
      email: ''
    };
  }

  abrirWhatsapp() {
    const phoneNumber = '5511999999999'; // Substitua pelo número real
    const message = 'Olá! Preciso de ajuda com o app Agrana.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  abrirEmail() {
    const email = 'suporte@agrana.com'; // Substitua pelo email real
    const subject = 'Suporte - App Agrana';
    const body = 'Olá, preciso de ajuda com...';
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank');
  }

  abrirTutorial() {
    console.log('Abrir tutorial');
    // Aqui implementaria a navegação para um tutorial
  }

}
