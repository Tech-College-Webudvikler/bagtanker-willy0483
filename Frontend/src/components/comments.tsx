import type { T_Reviews } from "@/lib/types";
import UserAvatar from "./UserAvatar";

const Comments = ({ title, user, comment, createdAt }: T_Reviews) => {
  return (
    <figure className="flex gap-4 py-4 my-4 border-b-2 border-#B1B1B1">
      <UserAvatar url={user.image} alt={title} />
      <figcaption className="flex flex-col justify-center">
        <h4 className="text-xl font-extrabold">{user.name}</h4>
        {/* make so user can read the time */}
        {(() => {
          const date = new Date(createdAt);
          const dateStr = date.toLocaleDateString("da-DK", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          const timeStr = date.toLocaleTimeString("da-DK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
          return `${dateStr} kl. ${timeStr}`;
        })()}

        <article>{comment}</article>
      </figcaption>
      <hr />
    </figure>
  );
};
export default Comments;
