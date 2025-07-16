import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressModel } from '../model';
import { DataService } from '../service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  addresses$: Observable<AddressModel[]>;
  btnValue: string = '';
  remoteLoadTime: number = 0;
  isLoaded: boolean = false;
  currentTime: string = '';
  private startTime: number;
  private timeInterval: any;

  constructor(private dataService: DataService) {
    // Record start time when component is instantiated
    this.startTime = performance.now();
    this.addresses$ = this.dataService.getAddressModel();
    this.updateCurrentTime();
  }

  ngOnInit() {
    // Calculate load time when component is fully initialized
    setTimeout(() => {
      this.remoteLoadTime = Math.round(performance.now() - this.startTime);
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

  printValue(): void {
    this.btnValue = 'Printed text by button v1.0';
  }

  getCurrentTime(): string {
    return this.currentTime;
  }

  getFormattedLoadTime(): string {
    return `${this.remoteLoadTime}ms`;
  }
}
