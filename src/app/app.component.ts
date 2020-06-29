import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  NzTableSortFn,
  NzTableSortOrder,
  NzTableFilterList,
  NzTableFilterFn,
} from "ng-zorro-antd/table";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { NzMessageService } from "ng-zorro-antd/message";

export type GenericObject = { [key: string]: any };

interface DataItem {
  name: string;
  age: number;
  address: string;
}

interface ColumnItem {
  name: string;
  sortOrder?: NzTableSortOrder;
  sortFn?: NzTableSortFn;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn;
  filterMultiple?: boolean;
  sortDirections?: NzTableSortOrder[];
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  listOfColumns: ColumnItem[] = [
    {
      name: "Name",
    },
    {
      name: "Description",
    },
    {
      name: "Price",
    },
    {
      name: "Quantity",
    },
    {
      name: "Operations",
    },
  ];

  obj: GenericObject = {
    name: "",
    description: "",
    price: 0,
    quantity: 0,
  };
  isVisible: boolean = false;
  listOfData: GenericObject[] = [];

  destroy$: Subject<void> = new Subject<void>();

  constructor(public http: HttpClient, private message: NzMessageService) {}

  ngOnInit(): void {
    this.searchAll();
  }

  searchAll(
    url: string = "http://localhost:5000/api/v1/products/",
    options: any = {}
  ): void {
    this.http.get<any>(url, options).subscribe((observer: any) => {
      if (!observer.success)
        this.message.create("error", "Sorry :( an error has ocurred");

      this.listOfData = observer.data;
    });
  }

  save(url: string = "http://localhost:5000/api/v1/products/"): void {
    if (this.obj._id) {
      this.http
        .put(`${url}${this.obj._id}`, this.obj)
        .subscribe((observer: any) => {
          if (observer.success)
            this.message.create("success", "Succesfully updated data");
          else this.message.create("error", "Sorry :( an error has ocurred");

          this.clearObj();
          this.searchAll();
        });
    } else {
      this.http.post(url, this.obj).subscribe((observer: any) => {
        if (observer.success)
          this.message.create("success", "Succesfully created data");
        else this.message.create("error", "Sorry :( an error has ocurred");

        this.clearObj();
        this.searchAll();
      });
    }
  }

  openCrudModal(): void {
    this.isVisible = true;
  }

  clearObj(): void {
    this.obj = {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
    };
  }

  handleOk(): void {
    this.isVisible = false;
    this.save();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  editObj(data): void {
    this.isVisible = true;
    this.obj = data;
  }

  deleteObj(
    data,
    url: string = "http://localhost:5000/api/v1/products/"
  ): void {
    this.http.delete(`${url}${data._id}`).subscribe((observer: any) => {
      if (observer.success)
        this.message.create("success", "Succesfully removed data");
      else this.message.create("error", "Sorry :( an error has ocurred");

      this.searchAll();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  formatterDollar = (value: number) => `$ ${value}`;

  parserDollar = (value: string) => value.replace("$ ", "");
}
