import { User } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const UserAvatar = ({ url, alt }: { url: string; alt: string }) => {
  return (
    <div className="w-32 h-32 rounded-full flex items-center justify-center">
      <Avatar className="h-full w-full">
        <AvatarImage
          src={url}
          alt={alt}
          className="rounded-full object-cover"
        />
        <AvatarFallback className="bg-transparent">
          <User className="w-32 h-32 text-current" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserAvatar;
