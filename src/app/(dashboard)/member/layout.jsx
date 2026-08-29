import { requireRole } from "@/lib/actions/role";

const MemberLayout = async({children}) => {
    await requireRole('member')
  return children;
}

export default MemberLayout