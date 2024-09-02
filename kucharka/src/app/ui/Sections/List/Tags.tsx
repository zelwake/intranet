import { RecipeCardProps } from "./RecipeCard";
import Tag from "./Tag";

export type TagsProps = Pick<RecipeCardProps, "TagToRecipe">;

export default function Tags({ TagToRecipe }: TagsProps) {
  return (
    <section className="">
      <h4 className="font-light underline underline-offset-2 text-lime-400">
        Tagy:
      </h4>
      <p className="space-x-2">
        {TagToRecipe.map(({ tag }) => (
          <Tag key={tag.id} tag={tag} />
        ))}
      </p>
    </section>
  );
}
