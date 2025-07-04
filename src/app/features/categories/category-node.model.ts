export interface CategoryNode {
  _id: string;
  name: string;
  parent: string | null;
  children?: CategoryNode[];
}
