import { Component, OnInit } from '@angular/core';
import { UtilService } from '../service/service-util.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

  constructor(utilService: UtilService) {
    utilService.loading$.subscribe(data => {
      this.loading = data;
    })
  }

  loading: boolean = false;

  ngOnInit(): void {

  }

}
