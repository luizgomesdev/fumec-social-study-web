import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() menuActiveEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  changeMenuActive(value: string) {
    this.menuActiveEvent.emit(value);
  }
}
