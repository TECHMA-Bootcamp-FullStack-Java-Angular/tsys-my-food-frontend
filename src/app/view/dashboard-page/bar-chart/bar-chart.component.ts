import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { SlotsDbService } from '../../../services/slots-db.service';
import { Slot } from '../../../models/slots';
import { MenusDbService } from '../../../services/menus-db.service';
import { UserDbService } from '../../../services/user-db.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent {
  @ViewChild('slotChart') Chart: ElementRef | undefined;

  slotsDbService = inject(SlotsDbService);
  menusDbService = inject(MenusDbService);
  userDbService = inject(UserDbService);


  slots: Slot[] = [];

  timeArray: string[] = [];
  limitSlotArray: number[] = [];
  actualArray: number[] = [];

  numUsers: number = 0;
  numDihses: number = 0;
  numMenus: number = 0;


  ngOnInit(): void {

    this.menusDbService.getMenus().subscribe({
      next: (data) => {
        this.numMenus = data.length;
      },
    });

    this.slotsDbService.getSlots().subscribe({
      next: (data) => {
        this.numDihses = data.length;
      },
    });

    this.userDbService.getUsersAll().subscribe({
      next: (ApiResponse) => {

        console.log(ApiResponse);
        this.numUsers = ApiResponse.totalElements;
      },
    });

    this.loadSlots();



    const data = {
      labels: this.timeArray,

      datasets: [
        {
          label: 'Limit Slot',
          data: this.limitSlotArray,
          backgroundColor: '#d21ec346',
        },
        {
          label: 'Atual Slot',
          data: this.actualArray,
          backgroundColor: '#1ed22d4f',
        },
      ],
    };

    setTimeout(() => {

      new Chart('slotChart', {
        type: 'bar' as ChartType,
        data: data,
        options: {
          plugins: {
            title: {
              display: true,
              text: ``,
            },
          },
          aspectRatio: 2.5,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }, 800);

  }

  loadSlots(): void {
    this.slotsDbService.getSlots().subscribe({
      next: (data) => {
        this.slots = data;
        this.slots.forEach((slot: Slot) => {
          this.timeArray.push(slot.time);
          this.limitSlotArray.push(slot.limitSlot);
          this.actualArray.push(slot.actual);
        });
      },
    });
  }



  numTotalSlotsActual(slots: Slot[]) {
    let total = 0;
    slots.forEach((slot: Slot) => {
      total += slot.actual;
    });
    return total;
  }
}
