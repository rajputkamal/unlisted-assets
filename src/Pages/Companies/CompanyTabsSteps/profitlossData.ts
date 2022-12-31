export class DataItem {
  public constructor(init: Partial<DataItem>) {
      Object.assign(this, init);
  }
  
  public franchise: string;
  public totalRevenue: number;
  public highestGrossing: number;

}
export class Data extends Array<DataItem> {
  public constructor() {
      super();
      this.push(new DataItem(
      {
          franchise: `Marvel Universe`,
          totalRevenue: 22.55,
          highestGrossing: 2.8
      }));
      this.push(new DataItem(
      {
          franchise: `Star Wars`,
          totalRevenue: 10.32,
          highestGrossing: 2.07
      }));
      this.push(new DataItem(
      {
          franchise: `Harry Potter`,
          totalRevenue: 9.19,
          highestGrossing: 1.34
      }));
      this.push(new DataItem(
      {
          franchise: `Avengers`,
          totalRevenue: 7.76,
          highestGrossing: 2.8
      }));
      this.push(new DataItem(
      {
          franchise: `Spider Man`,
          totalRevenue: 7.22,
          highestGrossing: 1.28
      }));
      this.push(new DataItem(
      {
          franchise: `James Bond`,
          totalRevenue: 7.12,
          highestGrossing: 1.11
      }));
  }
}
