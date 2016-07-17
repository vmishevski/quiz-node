import * as express from 'express';

export interface SwaggerRequest extends express.Request {
  swagger: any;
}
