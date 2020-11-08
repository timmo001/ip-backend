import { Body, Injectable } from '@nestjs/common';

import { ConfigService } from '../config/config.service';
import Config from '../types/Config';
import Generic from '../types/Generic';
import Params from '../types/Params';

@Injectable()
export class ApiService {
  config: Config;

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.getConfig();
  }

  apiDelete(params: Params): Generic {
    return params;
  }

  apiGet(params: Params): Generic {
    return params;
  }

  apiPatch(params: Params, body: Body): Generic {
    return body;
  }

  apiPost(params: Params, body: Body): Generic {
    return body;
  }

  apiPut(params: Params, body: Body): Generic {
    return body;
  }
}
