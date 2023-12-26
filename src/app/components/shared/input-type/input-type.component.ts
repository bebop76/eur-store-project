import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-type',
  templateUrl: './input-type.component.html',
  styleUrls: ['./input-type.component.css']
})
export class InputTypeComponent implements OnInit {

  @Input() controlName!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
