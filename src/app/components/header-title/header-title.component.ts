import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.css'],
})
export class HeaderTitleComponent implements OnInit {
  public vertical?: string;
  public horizontal?: string;
  public slot?: string;
  public addStyles?: {};
  public size?: string;
  public displayCards: boolean = true;
  @Input() title!: string;
  //Questa variabile verra' valorizzata nella products-list e visualizzera il bottone per cambiare da card a list
  @Input() allowDisplayChange?: boolean;
  @Output() displayTypeChange$: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    this.vertical = 'top';
    this.horizontal = 'end';
    this.slot = 'end';
    this.size = 'small';
  }

  ngOnInit(): void {}

  public handleFabButtonClick() {
    this.displayCards = !this.displayCards;
    this.displayTypeChange$.emit();
  }
}
