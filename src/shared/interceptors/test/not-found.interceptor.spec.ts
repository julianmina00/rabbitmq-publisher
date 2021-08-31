import { ExecutionContext, NotFoundException } from '@nestjs/common';
import { Observable, of } from 'rxjs';

import { NotFoundInterceptor } from '../not-found.interceptor';

function mockExecutionContext(req: any) {
  return {
    switchToHttp: () => ({
      getRequest: () => req
    })
  };
}

function mockCallHandler(val: any) {
  return {
    handle: jest.fn(() => of(val))
  };
}

function getResponseInterceptor(
  papams: any,
  response: any,
  modelName: string,
  messageOverride?: string
): Observable<any> {
  const interceptor = new NotFoundInterceptor(modelName, messageOverride);
  const context = mockExecutionContext(papams) as ExecutionContext;
  const next = mockCallHandler(response);
  return interceptor.intercept(context, next);
}

const modelName = 'TestModel';

describe('NotFoundInterceptor', () => {
  describe('When response is null', () => {
    describe(`When there is not 'id' in request params`, () => {
      it(`Throws 'NotFoundException' exception with a default message`, (done: any) => {
        const responseInterceptor = getResponseInterceptor({}, null, modelName);

        responseInterceptor.subscribe({
          error: (error) => {
            expect(error).toEqual(
              new NotFoundException({ message: `Cannot find ${modelName}` })
            );
            done();
          }
        });
      });
    });

    describe(`When there is an 'id' in request params`, () => {
      it(`Throws 'NotFoundException' exception with ID in the message`, (done: any) => {
        const responseInterceptor = getResponseInterceptor({}, null, modelName);

        responseInterceptor.subscribe({
          error: (error) => {
            expect(error).toEqual(
              new NotFoundException({ message: `Cannot find ${modelName}` })
            );
            done();
          }
        });
      });

      describe(`When override message is specified`, () => {
        it(`Throws 'NotFoundException' exception with an override message`, (done: any) => {
          const overrideMessage = 'Not found';
          const id = 1;
          const responseInterceptor = getResponseInterceptor(
            { params: { id } },
            null,
            modelName,
            overrideMessage
          );

          responseInterceptor.subscribe({
            error: (error) => {
              expect(error).toEqual(
                new NotFoundException({
                  message: overrideMessage
                })
              );
              done();
            }
          });
        });
      });
    });
  });

  describe('When response is not null', () => {
    it(`Doesn't throw 'NotFoundException' exception`, (done: any) => {
      const responseInterceptor = getResponseInterceptor({}, {}, modelName);

      responseInterceptor.subscribe({
        next: (value) => {
          expect(value).not.toBeNull;
          done();
        }
      });
    });
  });
});
