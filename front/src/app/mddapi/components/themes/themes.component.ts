import { Component, OnInit } from '@angular/core';
import { themeEntity } from 'src/app/core/models/themeEntity';
import { ThemeService } from '../../services/themeService';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {

  themes: themeEntity[] = [];

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.fetch().subscribe((response: themeEntity[]) => {
      this.themes = response;
    });
  }

}
