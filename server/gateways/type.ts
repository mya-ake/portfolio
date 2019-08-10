export type GatewayOkResponse<D> = {
  ok: true;
  status: number;
  data: D;
};

export type GatewayErrorResponse<D> = {
  ok: false;
  status: number;
  data: D;
};

type GatewayResponse<D, E> = GatewayOkResponse<D> | GatewayErrorResponse<E>;

export type Gateway<P, D, E> = (
  payload: P,
) => GatewayResponse<D, E> | Promise<GatewayResponse<D, E>>;
