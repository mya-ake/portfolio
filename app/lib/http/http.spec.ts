import ky from 'ky-universal';
import { Http } from './http';

type Ky = typeof ky;

const requestMock = jest.fn();
const createKyInstanceMock = (): Ky => {
  return (requestMock as any) as Ky;
};

const createResponse = ({
  status = 200,
  ok = true,
  data = {},
}: {
  status?: number | undefined;
  ok?: boolean;
  data?: unknown;
} = {}) => ({
  ok,
  status,
  json: async () => data,
});

const createAbortController = (): AbortController => {
  return {
    signal: {} as AbortSignal,
    abort: jest.fn(),
  };
};

afterEach(() => {
  requestMock.mockClear();
});

describe('lib/http', () => {
  describe('request', () => {
    let http: Http<undefined>;
    beforeEach(() => {
      http = new Http(createKyInstanceMock());
    });

    it('requestable', async () => {
      requestMock.mockReturnValueOnce(createResponse());
      const { ok, noResponse, canceled } = await http.request({
        url: '/',
        method: 'get',
      });
      expect(ok).toBe(true);
      expect(noResponse).toBe(false);
      expect(canceled).toBe(false);
      expect(requestMock).toBeCalledWith('/', { method: 'get' });
    });

    it('when error', async () => {
      requestMock.mockReturnValueOnce(
        createResponse({ ok: false, status: 404 }),
      );
      const { ok, noResponse, canceled } = await http.request({
        url: '/',
        method: 'get',
      });
      expect(ok).toBe(false);
      expect(noResponse).toBe(false);
      expect(canceled).toBe(false);
      expect(requestMock).toBeCalledWith('/', { method: 'get' });
    });

    it('when no response', async () => {
      requestMock.mockReturnValueOnce(undefined);
      const { ok, noResponse, canceled } = await http.request({
        url: '/',
        method: 'get',
      });
      expect(ok).toBe(false);
      expect(noResponse).toBe(true);
      expect(canceled).toBe(false);
      expect(requestMock).toBeCalledWith('/', { method: 'get' });
    });

    it('when cancel', async () => {
      const request = http.request(
        {
          url: '/',
          method: 'get',
        },
        { cancelable: true },
      );
      http.cancel('/');
      const { ok, noResponse, canceled } = await request;
      expect(ok).toBe(false);
      expect(noResponse).toBe(true);
      expect(canceled).toBe(true);
      expect(requestMock).toBeCalledWith(
        '/',
        expect.objectContaining({ method: 'get' }),
      );
    });
  });

  describe('cancel', () => {
    let http: Http<undefined>;
    beforeEach(() => {
      http = new Http(createKyInstanceMock());
    });

    describe('cancel method', () => {
      it('has abort controller', () => {
        const abortController = createAbortController();
        const spyDelete = jest.spyOn(http as any, 'deleteCancelController');

        http['abortControllers'].set('/', abortController);

        http.cancel('/');

        expect(abortController.abort).toBeCalledTimes(1);
        expect(spyDelete).toBeCalledWith('/');
      });

      it('has no abort controller', () => {
        const abortController = createAbortController();
        const spyDelete = jest.spyOn(http as any, 'deleteCancelController');

        http['abortControllers'].set('/', abortController);

        http.cancel('/no');

        expect(abortController.abort).not.toBeCalled();
        expect(spyDelete).not.toBeCalled();
      });
    });

    describe('csncelAll method', () => {
      it('called all abort', () => {
        const abortController1 = createAbortController();
        const abortController2 = createAbortController();
        const spyCancel = jest.spyOn(http, 'cancel');

        http['abortControllers'].set('/1', abortController1);
        http['abortControllers'].set('/2', abortController2);

        http.cancelAll();

        expect(abortController1.abort).toBeCalledTimes(1);
        expect(abortController2.abort).toBeCalledTimes(1);
        expect(spyCancel).toBeCalledTimes(2);
      });
    });
  });
});
