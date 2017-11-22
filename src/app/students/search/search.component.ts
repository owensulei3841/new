import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() searchTerm = new EventEmitter<string>();
  term:string;
  constructor() { }

  ngOnInit() {
  }

  search(value:string){
    this.term = value;
    this.searchTerm.emit(this.term);
  }
}
