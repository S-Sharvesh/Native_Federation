import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home-shell',
  templateUrl: './home-shell.component.html',
  styleUrl: './home-shell.component.css',
})
export class HomeShellComponent implements OnInit, OnDestroy {
  shellLoadTime: number = 0;
  isLoaded: boolean = false;
  currentTime: string = '';
  private startTime: number;
  private timeInterval: any;

  constructor() {
    // Record start time when component is instantiated
    this.startTime = performance.now();
    this.updateCurrentTime();
  }

  ngOnInit() {
    // Calculate load time when component is fully initialized
    setTimeout(() => {
      this.shellLoadTime = Math.round(performance.now() - this.startTime);
      this.isLoaded = true;
    }, 0);

    // Update time every second
    this.timeInterval = setInterval(() => {
      this.updateCurrentTime();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  private updateCurrentTime(): void {
    this.currentTime = new Date().toLocaleTimeString();
  }

  getCurrentTime(): string {
    return this.currentTime;
  }

  getFormattedLoadTime(): string {
    return `${this.shellLoadTime}ms`;
  }
}
