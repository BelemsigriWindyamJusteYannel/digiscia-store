import { CircleUserRoundIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { logout } from "../auth/logout";
import { Link } from 'react-router-dom';

export default function Profile() {
  const { username } = useContext(UserContext);
  console.log(username)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          size="icon" 
          variant="outline" 
          aria-label="Open account menu"
          className="border border-gray-300 p-2 rounded-full">
          <CircleUserRoundIcon size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 border border-gray-300">
        <DropdownMenuLabel className="flex flex-col">
          <span>Signed in as</span>
          <span className="text-foreground text-xs font-normal">
            {username}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/Compte">
            <DropdownMenuItem>Compte</DropdownMenuItem>
          </Link>
          <Link to="/Commandes">
            <DropdownMenuItem>Commandes</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={()=>{
            logout();
            //window.location.href = window.location.href;
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
