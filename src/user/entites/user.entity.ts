import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TimestampEntity} from "../../generics/timestamp.entity";
import {CvEntity} from "../../cv/entities/cv.entity";
import {UserRolesEnum} from "../../enums/user-roles.enum";

@Entity('user')
export class UserEntity extends TimestampEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
        unique: true
    })
    username: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column({
            type: 'enum',
            enum: UserRolesEnum,
            default: UserRolesEnum.USER
        }
    )
    role: string;

    @OneToMany(
        type => CvEntity,
        (cv) => cv.user,
        {
            nullable: true,
            cascade: true
        }
    )
    cvs: CvEntity[]
}
