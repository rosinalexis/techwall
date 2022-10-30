import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {CvEntity} from "./entities/cv.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {AddCvDto} from "./dto/add-cv.dto";
import {UpdateCvDto} from "./dto/update-cv.dto";
import {UserRolesEnum} from "../enums/user-roles.enum";
import {UserEntity} from "../user/entites/user.entity";

@Injectable()
export class CvService {

    constructor(
        @InjectRepository(CvEntity)
        private cvRepository: Repository<CvEntity>
    ) {
    }

    async findCvById(id: number, user): Promise<CvEntity> {

        const cv = await this.cvRepository.findOneBy({id});

        if (!cv) {
            throw new NotFoundException(`Le cv d'id ${id} n'existe pas`);
        }

        if (user.role === UserRolesEnum.ADMIN || user.id === cv.user.id) {
            return cv;
        }

        throw new UnauthorizedException(`Vous ne pouvez pas accéder à ce cv.`)

    }

    async getCvs(user): Promise<CvEntity[]> {
        let userLst;
        if (user.role === UserRolesEnum.ADMIN) {
            userLst = await this.cvRepository.find();
        } else {
            userLst = await this.cvRepository.find({
                    where: {
                        user: user.id
                    }
                }
            );
        }
        return userLst;
    }

    async addCv(cv: AddCvDto, user): Promise<CvEntity> {

        const newCv = await this.cvRepository.create(cv);
        newCv.user = user;
        return await this.cvRepository.save(newCv);
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

    async removeCv(id: number, user: UserEntity): Promise<CvEntity> {
        const cvToRemove = await this.findCvById(id, user);
        return await this.cvRepository.remove(cvToRemove);
    }

    async softRemoveCv(id: number, user: UserEntity): Promise<CvEntity> {
        const cvToRemove = await this.findCvById(id, user);
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
