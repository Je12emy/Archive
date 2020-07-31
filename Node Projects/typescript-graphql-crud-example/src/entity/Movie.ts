import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm"
import { Field, Int, ObjectType } from "type-graphql"

@ObjectType()
@Entity()
export class Movie extends BaseEntity{
    // Auto Incremental Key
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number
    // Title column, TypeORM can infer the time on its own
    // We can define it by passing a type into the column decorator
    // @Column("text")
    @Field()
    @Column()
    title:string
    // There is not number type so we specify it and add a default
    @Field(() => Int)
    @Column('int', {default: 60})
    minutes: number
}