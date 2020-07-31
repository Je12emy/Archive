import { Resolver, Mutation, Arg, Int, Query, InputType, Field } from "type-graphql";
import { Movie } from "../entity/Movie";

@InputType()
class MovieInput{
  @Field()
  title: string

  @Field(() => Int)
  minutes: number
}

@InputType()
class MovieUpdateInput{
  @Field(() => String, {nullable: true})
  title?: string

  @Field(() => Int, {nullable: true})
  minutes?: number
}

@Resolver()
export class MovieResolver {
  // Sets this as a Mutation, set Movie as a return value
  @Mutation(() => Movie)
  async createMoview(
    // Use the Input Type as an argument
    @Arg("options", () => MovieInput) options: MovieInput
  ) {
    // Insert and Select the movie then return it
    const movie = await Movie.create(options).save()
    return movie;
  }

  @Mutation(() => Boolean)
  async updateMovie(@Arg('id', () => Int) id: number,
  @Arg("input", () => MovieUpdateInput) options: MovieUpdateInput){
    await Movie.update({id}, options)
    return true
  }

  @Mutation(() => Boolean)
  async deleteMovie(@Arg('id', () => Int) id: number){
    await Movie.delete({id})
    return true
  }

  @Query(() => [Movie])
  movies(){
    return Movie.find();
  }
}
