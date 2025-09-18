import { axiosInstance } from "@/app/lib/axios-instance";
import { AccountType, User } from "@/app/types";
import { PaintRollerIcon } from "lucide-react";
import LogoutButton from "./logout-button";
import { getToken } from "@/app/lib/sessions";

interface AvatarProps {
  accountType: AccountType;
}

const AvatarCard = async ({ accountType }: AvatarProps) => {
  const token = await getToken();

  const user = await axiosInstance.get<User>(
    `/auth/me?account-type=${accountType}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const name = `${user.data.first_name} ${user.data.last_name}`;

  return (
    <div className="flex items-center space-x-4">
      <div className="flex flex-row items-center space-x-3 py-4">
        <div className="p-2 w-fit bg-amber-100 rounded-full group-hover:bg-amber-200 transition-colors">
          <PaintRollerIcon className="w-6 h-6 text-amber-600" />
        </div>
        <p className="font-serif font-bold text-gray-900">{name}</p>
      </div>
      <LogoutButton accountType={accountType} />
    </div>
  );
};

export default AvatarCard;
