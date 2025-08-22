import { UserRoundCheck } from 'lucide-react';
import { Button } from "@/Components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
//import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Link } from 'react-router-dom';
import { uContext } from "../Reducers/user/uContext";
import { logout } from "../api/accountServices";
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  //const { username,logout } = useContext(UserContext);
  const { user,userDispatch } = useContext(uContext)
  //console.log(username)
  const navigate = useNavigate()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          size="icon" 
          variant="outline" 
          aria-label="Open account menu"
          className="border border-gray-300 p-2 rounded-full active:scale-110 transition-transform duration-100">
          <UserRoundCheck   />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 border border-gray-300">
        <DropdownMenuLabel className="flex flex-col">
          <span>Signed in as</span>
          <span className="text-foreground text-xs font-normal">
            {
              user.user ? (
                <p>{user.user.username}</p>
              ) : (
                <></>
              )
            }
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
            userDispatch({
              type:"user/clear",
            })
            //navigate("/");
            window.location.href = window.location.href;
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
