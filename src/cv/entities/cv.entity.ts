import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {TimestampEntity} from "../../generics/timestamp.entity";

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
    
}
