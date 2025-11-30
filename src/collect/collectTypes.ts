import { CollectStatusDto } from './dtos/collectDTO';

export type CollectMaterialReturn = {
  id: number;
  quantity: number | null;
  material: {
    id: number;
    name: string;
  };
};

export type CollectReturn = {
  id: number;
  scheduledAt: string;
  estimatedWeight: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';
  user: {
    id: number;
    name: string;
  };
  ecoPoint: {
    id: number;
    name: string;
  };
  materials: CollectMaterialReturn[];
};

export type CollectStatusType = keyof typeof CollectStatusDto;
