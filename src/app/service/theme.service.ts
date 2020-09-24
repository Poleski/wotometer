import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private theme: string;
  private themePrefix = 'theme-';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null,null);
  }

  init() {
      this.getTheme();
      this.renderer.addClass(document.body, this.themePrefix + this.theme);
  }

  setTheme(theme) {
    this.theme = theme;
    localStorage.setItem('theme', theme);
  }

  getTheme() {
    this.theme = localStorage.getItem('theme') || ThemeService.setDefaultTheme();
  }

  getOppositeTheme(): string {
    return this.theme === 'dark' ? 'light' : 'dark';
  }

  switchTheme() {
    this.update(this.getOppositeTheme());
  }

  update(theme) {
    this.setTheme(theme);
    this.renderer.removeClass(document.body, this.themePrefix + this.getOppositeTheme());
    this.renderer.addClass(document.body, this.themePrefix + theme);
  }

  static setDefaultTheme(): string {
      if (window.matchMedia('(prefers-color-scheme').media !== 'not all') {
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
          return 'dark';
      }
  }
}
