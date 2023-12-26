import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.css'],
})
export class FabButtonComponent implements OnInit {
  @Input() vertical?: string;
  @Input() horizontal?: string;
  @Input() slot?: string;
  @Input() size?: string;
  @Input() customStyles: { [klass: string]: any } = {};

  @Input() iconName: string = 'add';
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() displayTypeChange$ = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  handleClick(): void {
    this.buttonClick.emit();
    this.displayTypeChange$.emit();
  }
}
