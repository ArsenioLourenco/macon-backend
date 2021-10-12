export interface AppResponse<Data> {
  success: boolean;
  message?: string | boolean;
  data?: object;
}

export type TypeProfileUser = 'Administrador' | 'Normal';

