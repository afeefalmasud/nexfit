import { requireRole } from "@/lib/actions/role";

const TrainerLayout = async({children}) => {
    await requireRole('trainer')
  return children;
}

export default TrainerLayout