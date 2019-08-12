import { Content } from './../../types/content.type';
import { GatewayOkResponse, GatewayErrorResponse } from './../gateways/type';

export const buildContent = (data: string): Content => {
  return JSON.parse(data) as Content;
};

export function createOkResponse<D>(data: D): GatewayOkResponse<D> {
  return {
    ok: true,
    status: 200,
    data,
  };
}

export function createErrorResponse<D>(
  data: D,
  status: number,
): GatewayErrorResponse<D> {
  return {
    ok: false,
    status,
    data,
  };
}
