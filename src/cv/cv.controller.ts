import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards} from '@nestjs/common';
import {CvService} from "./cv.service";
import {CvEntity} from "./entities/cv.entity";
import {AddCvDto} from "./dto/add-cv.dto";
import {UpdateCvDto} from "./dto/update-cv.dto";
import {DeleteResult, UpdateResult} from "typeorm";
import {JwtAuthGuard} from "../user/guards/jwt-auth-guard";

@Controller('cv')
export class CvController {


    constructor(
        private cvService: CvService
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllCvs(): Promise<CvEntity[]> {
        return await this.cvService.getCvs();
    }

    @Get('stats')
    async getCvNumberByAge(): Promise<CvEntity[]> {
        return await this.cvService.getCvNumberByAge(18, 5);
    }

    @Get(':id')
    async getCvById(
        @Param('id', ParseIntPipe) id: number
    ): Promise<CvEntity> {
        return await this.cvService.findCvById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addCv(
        @Body() newCv: AddCvDto
    ): Promise<CvEntity> {
        return await this.cvService.addCv(newCv);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateCv(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCvValue: UpdateCvDto
    ): Promise<CvEntity> {

        console.log(updateCvValue);
        return await this.cvService.updateCv(id, updateCvValue);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removeCv(
        @Param('id', ParseIntPipe) id: number
    ): Promise<CvEntity | DeleteResult> {
        return await this.cvService.softDeleteCv(id);
    }

    @Get('recover/:id')
    async recoverCv(
        @Param('id', ParseIntPipe) id: number
    ): Promise<CvEntity> {
        return await this.cvService.recoverCv(id);
    }

    @Get('restore/:id')
    async restoreCv(
        @Param('id', ParseIntPipe) id: number
    ): Promise<UpdateResult> {
        return await this.cvService.restoreCv(id);
    }


}
