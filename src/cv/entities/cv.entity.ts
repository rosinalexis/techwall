import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TimestampEntity} from "../../generics/timestamp.entity";
import {UserEntity} from "../../user/entites/user.entity";

@Entity('cv')
export class CvEntity extends TimestampEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'name',
        length: 50,
    })
    name: string;

    @Column({
            length: 50
        }
    )
    firstname: string;

    @Column()
    age: number;

    @Column()
    cin: number;

    @Column()
    job: string;

    @Column({nullable: true})
    path: string;

    @ManyToOne(
        type => UserEntity,
        (user) => user.cvs,
        {
            cascade: ['insert', 'update'],
            nullable: true,
            eager: true
        }
    )
    user: UserEntity;
}
