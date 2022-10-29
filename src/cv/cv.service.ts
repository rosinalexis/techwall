import {Injectable, NotFoundException} from '@nestjs/common';
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {CvEntity} from "./entities/cv.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {AddCvDto} from "./dto/add-cv.dto";
import {UpdateCvDto} from "./dto/update-cv.dto";

@Injectable()
export class CvService {

    constructor(
        @InjectRepository(CvEntity)
        private cvRepository: Repository<CvEntity>
    ) {
    }

    async findCvById(id: number): Promise<CvEntity> {
        const cv = await this.cvRepository.findOneBy({id});

        if (!cv) {
            throw new NotFoundException(`Le cv d'id ${id} n'existe pas`);
        }

        return cv;
    }

    async getCvs(): Promise<CvEntity[]> {
        return await this.cvRepository.find();
    }

    async addCv(cv: AddCvDto): Promise<CvEntity> {
        return await this.cvRepository.save(cv);
    }

    async updateCv(id: number, cv: UpdateCvDto): Promise<CvEntity> {

        const newCv = await this.cvRepository.preload({
            id,
            ...cv
        });

        if (!newCv) {
            throw new NotFoundException(`Le cv d'id ${id} n'existe pas`);
        }
        return await this.cvRepository.save(newCv);
    }

    async removeCv(id: number): Promise<CvEntity> {
        const cvToRemove = await this.findCvById(id);
        return await this.cvRepository.remove(cvToRemove);
    }

    async softRemoveCv(id: number): Promise<CvEntity> {
        const cvToRemove = await this.findCvById(id);
        return await this.cvRepository.softRemove(cvToRemove);
    }

    async recoverCv(id: number): Promise<CvEntity> {
        const cvToRecover = await this.cvRepository.findOneBy({id});
        return await this.cvRepository.recover(cvToRecover);
    }

    async deleteCv(id: number): Promise<DeleteResult> {
        return await this.cvRepository.delete(id);
    }

    async softDeleteCv(id: number): Promise<UpdateResult> {
        return await this.cvRepository.softDelete(id);
    }

    async restoreCv(id: number): Promise<UpdateResult> {
        return await this.cvRepository.restore(id);
    }

    async getCvNumberByAge(maxAge, minAge = 0): Promise<CvEntity[]> {
        const qb = this.cvRepository.createQueryBuilder("cv");
        qb.select("cv.age, count(cv.id) as nombreDeCv")
            .where("cv.age > :ageMin and cv.age < :ageMax")
            .setParameters({ageMin: minAge, ageMax: maxAge})
            .groupBy("cv.age");
        console.log(qb.getSql());
        return await qb.getRawMany();
    }

}
