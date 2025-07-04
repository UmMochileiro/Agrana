import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, MenuController } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [RouterLink, IonContent, IonButton, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InicioPage implements OnInit {

  slideOpts = {
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      clickable: true,
    },
  };

  constructor(private menuController: MenuController) { }

  ngOnInit() {
    // Desabilita o menu na tela de início
    this.menuController.enable(false);
  }

  ionViewWillLeave() {
    // Reabilita o menu ao sair da tela
    this.menuController.enable(true);
  }

}
