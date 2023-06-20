import {Controller, Post, Req} from '@nestjs/common';
import {PzService} from "./pz.service";

@Controller()
export class PzController {
    constructor(private pzService: PzService,) {
    }
}
