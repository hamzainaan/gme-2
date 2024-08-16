import { MyUserData } from "../api/routes/Users.js";

export const HasConfirmPerms =
async () =>
{
    const data = await MyUserData(false).data.privileges;
    return [data.includes(146), data.includes(147)];
}