import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../../models/dish-chef';
import { TokenStorageService } from '../../services/token-storage.service';
import { Order } from '../../models/orders-admin';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersDbService } from '../../services/orders-db.service';
import { JsonPipe } from '@angular/common';
import { NgClass } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { HistorialUserService } from '../../services/historial-user.service';
@Component({
  selector: 'app-chef-page',
  standalone: true,
  imports: [JsonPipe,NgClass,MatButtonModule],
  templateUrl: './chef-page.component.html',
  styleUrl: './chef-page.component.css'
})
export class ChefPageComponent implements OnInit{
  orders: Order[] = [];

  selectedOrderId: number | null = null;
  displayedColumns: string[] = ['id', 'maked', 'slot', 'price', 'datetime', 'dishes', 'actions'];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>([]);
  totalEntities: number = 0;
  public selectedPageSize: number = 10;
  servToker = inject(TokenStorageService)
  currentTime: string = '';
  currentPage: number = 1;
  totalPages: number = 1;

  OdersById: Order[] = [];

  servOrder = inject(HistorialUserService)

  constructor(private router: Router,public ordersDbService: OrdersDbService,private snackBar: MatSnackBar) {}

  loadOrders(): void {
    const startIndex = this.currentPage - 1;
    const endIndex = this.selectedPageSize;
    this.ordersDbService.getOrdersDateApi(startIndex, endIndex, 2024, 0, 0).subscribe((orders: any) => {

      console.log(orders);

      const { totalElements, totalPages, content, size } = orders;
      this.totalPages = totalPages;
      this.totalEntities = totalElements;
      this.selectedPageSize = size;

      this.orders = content.sort((a: Order, b: Order) => {
        const timeA = a.slot?.time ? a.slot?.time.split(':').map(Number) : [0, 0];
        const timeB = b.slot?.time ? b.slot?.time.split(':').map(Number) : [0, 0];

        if (timeA[0] !== timeB[0]) {
          return timeA[0] - timeB[0];
        } else {
          return timeA[1] - timeB[1];

        }

      });
      this.dataSource = new MatTableDataSource<Order>(this.orders);
      console.log(this.dataSource.data);


    // this.ordersDbService.getOrdersApiChef(startIndex, endIndex).subscribe((orders: any) => {
    //   console.log(orders);
    //   const {totalElements,totalPages,content,size}=orders;
    //   this.totalPages = totalPages;
    //   this.totalEntities=totalElements;
    //   this.selectedPageSize=size
    //   this.orders = content.sort((a: Order, b: Order) => {
    //     const timeA = a.slot?.time ? a.slot?.time.split(':').map(Number) : [0, 0];
    //     const timeB = b.slot?.time ? b.slot?.time.split(':').map(Number) : [0, 0];

    //     if (timeA[0] !== timeB[0]) {
    //       return timeA[0] - timeB[0];
    //     } else {
    //       return timeA[1] - timeB[1];
    //     }
    //   });
     });
  }

  deleteOrder(orderId: number): void {
    Swal.fire({
      title: 'Delete order?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // this.ordersDbService.removeOrderChef(orderId).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Option locked in for the demo version',
            // 'The order with ID ' + orderId + ' has been deleted.',
            'success'
          )
        //     .then(() => {
        //     this.loadOrders();
        //     this.totalPages = Math.ceil(this.totalEntities / this.selectedPageSize);
        //   });
        // });
      }
    });
  }

  ngOnInit() {
    this.loadOrders();
    this.updateCurrentTime();

    setInterval(() => {
      this.updateCurrentTime();
    }, 1000);  }

    updateCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      this.currentTime = `${hours}:${minutes}`;
    }

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadOrders();
      }
    }

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.loadOrders();
      }
    }

    reloadPage() {
      this.snackBar.open('Reloading orders', 'Close', {
        duration: 2000,
        panelClass: ['copied-snackbar'],
      });
      this.loadOrders();
    }

    closePage() {
      this.servToker.singOut();
      this.router.navigateByUrl('/');
    }

    alertDelete(orderId : number):void {
      this.snackBar.open('Order maked '+orderId, 'Close', {
        duration: 1500,
        panelClass: ['copied-snackbar'],
      });
    }

    isPastTime(time?:string): boolean {
      if (!time) {
        return false;
      }
      const orderTime = new Date(time);
      const currentTime = new Date();
      const currentHours: number = currentTime.getHours();
      const currentMinutes: number = currentTime.getMinutes();
      const [hours, minutes]: number[] = time.split(':').map(Number);
      orderTime.setHours(currentHours, currentMinutes, 0, 0);
      if (currentHours < hours) {
          return false;
      } else if (currentHours === hours && currentMinutes < minutes) {
          return false;
      } else {
          return true;
      }
    }

}
