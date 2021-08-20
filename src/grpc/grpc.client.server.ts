import { Injectable } from '@nestjs/common';
import { ClientGrpc, Client } from '@nestjs/microservices';

import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: process.env.GRPC_SEVICE_URL,
    package: 'news',
    protoPath: join(__dirname, '../protos/news.proto'),
  },
};

@Injectable()
export class ClentServe {
  @Client(grpcClientOptions) public readonly client: ClientGrpc;
}
