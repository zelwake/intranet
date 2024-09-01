import { MDXRemote } from "next-mdx-remote/rsc";
import { RecipeInfoProps } from "../RecipeInfo";
import styles from "./Content.module.css";

export default function Content({
  content,
}: Pick<RecipeInfoProps["recipeData"], "content">) {
  return (
    <>
      <h2 className="mt-10 text-2xl">Postup</h2>
      <div className={styles.contentWrapper}>
        <MDXRemote source={content} />
      </div>
    </>
  );
}
