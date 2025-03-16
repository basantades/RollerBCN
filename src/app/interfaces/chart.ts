export interface Chart {
    _id?: string;
  name: string;
  data: ChartData[];
  createdAt?: string; 
  updatedAt?: string;
}

export interface ChartData {
  label: string;
  value: number;

}
