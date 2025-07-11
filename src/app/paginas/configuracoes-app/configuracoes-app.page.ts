import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-configuracoes-app',
  templateUrl: './configuracoes-app.page.html',
  styleUrls: ['./configuracoes-app.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ConfiguracoesAppPage implements OnInit {

  settings = {
    darkMode: false,
    notifications: true,
    sounds: true,
    vibration: true,
    autoBackup: true,
    language: 'pt-BR',
    currency: 'BRL',
    dateFormat: 'DD/MM/YYYY'
  };

  languages = [
    { code: 'pt-BR', name: 'Português (Brasil)' },
    { code: 'en-US', name: 'English (US)' },
    { code: 'es-ES', name: 'Español' }
  ];

  currencies = [
    { code: 'BRL', name: 'Real (R$)', symbol: 'R$' },
    { code: 'USD', name: 'Dólar ($)', symbol: '$' },
    { code: 'EUR', name: 'Euro (€)', symbol: '€' }
  ];

  dateFormats = [
    { code: 'DD/MM/YYYY', name: 'DD/MM/AAAA' },
    { code: 'MM/DD/YYYY', name: 'MM/DD/AAAA' },
    { code: 'YYYY-MM-DD', name: 'AAAA-MM-DD' }
  ];

  constructor() { }

  ngOnInit() {
  }

  salvarConfiguracoes() {
    console.log('Configurações salvas:', this.settings);
    // Aqui implementaria a lógica para salvar as configurações
  }

  resetarConfiguracoes() {
    console.log('Resetar configurações');
    // Aqui implementaria a lógica para resetar as configurações
  }

  exportarBackup() {
    console.log('Exportar backup');
    // Aqui implementaria a lógica para exportar backup
  }

  importarBackup() {
    console.log('Importar backup');
    // Aqui implementaria a lógica para importar backup
  }

}
